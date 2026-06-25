import path from "node:path";
import sharp from "sharp";
import { createWorker, PSM } from "tesseract.js";
import { NextRequest, NextResponse } from "next/server";

interface Book {
  titre: string;
  auteur: string | null;
  editeur: string | null;
}

interface SpineCandidate {
  left: number;
  width: number;
  score: number;
}

const MAX_IMAGE_WIDTH = 1200;
const OCR_HEIGHT = 480;
const MAX_SPINES = 6;
const MIN_SPINE_WIDTH = 18;
const MAX_SPINE_WIDTH_RATIO = 0.22;
const EDGE_THRESHOLD = 28;
const MIN_EDGE_DISTANCE = 14;
const LANG_PATH = path.join(
  process.cwd(),
  "node_modules",
  "@tesseract.js-data",
  "fra",
  "4.0.0"
);
const TESSERACT_WORKER_PATH = path.join(
  process.cwd(),
  "node_modules",
  "tesseract.js",
  "src",
  "worker-script",
  "node",
  "index.js"
);

function getVariance(values: number[]) {
  if (!values.length) return 0;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

function normalizeOcrText(text: string) {
  return text
    .replace(/[|_[\]{}<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function looksLikeTitle(text: string) {
  const letters = text.match(/\p{L}/gu)?.length ?? 0;
  return text.length >= 3 && letters >= 3;
}

function mergeCloseCandidates(candidates: SpineCandidate[]) {
  const merged: SpineCandidate[] = [];

  for (const candidate of candidates) {
    const previous = merged.at(-1);
    if (!previous || candidate.left - (previous.left + previous.width) > 8) {
      merged.push(candidate);
      continue;
    }

    const right = Math.max(previous.left + previous.width, candidate.left + candidate.width);
    previous.score = Math.max(previous.score, candidate.score);
    previous.width = right - previous.left;
  }

  return merged;
}

function findVerticalEdgePeaks(edges: number[]) {
  const mean = edges.reduce((sum, edge) => sum + edge, 0) / edges.length;
  const variance = getVariance(edges);
  const threshold = Math.max(EDGE_THRESHOLD, mean + Math.sqrt(variance) * 0.9);
  const peaks: number[] = [];

  for (let x = 2; x < edges.length - 2; x += 1) {
    const value = edges[x];
    const isLocalPeak =
      value >= threshold &&
      value >= edges[x - 1] &&
      value >= edges[x - 2] &&
      value >= edges[x + 1] &&
      value >= edges[x + 2];

    if (!isLocalPeak) continue;

    const previous = peaks.at(-1);
    if (previous === undefined || x - previous >= MIN_EDGE_DISTANCE) {
      peaks.push(x);
      continue;
    }

    if (value > edges[previous]) {
      peaks[peaks.length - 1] = x;
    }
  }

  return peaks;
}

async function detectSpineCandidates(image: Buffer) {
  const {
    data,
    info: { width, height },
  } = await sharp(image)
    .resize({
      width: MAX_IMAGE_WIDTH,
      withoutEnlargement: true,
    })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const maxSpineWidth = Math.floor(width * MAX_SPINE_WIDTH_RATIO);
  const verticalEdges: number[] = new Array(width).fill(0);

  for (let x = 1; x < width; x += 1) {
    let columnScore = 0;
    for (let y = 0; y < height; y += 1) {
      const index = y * width + x;
      columnScore += Math.abs(data[index] - data[index - 1]);
    }
    verticalEdges[x] = columnScore / height;
  }

  const peaks = findVerticalEdgePeaks(verticalEdges);
  const candidateRanges = peaks.flatMap((peak, index) => {
    const nextPeak = peaks[index + 1];
    if (nextPeak === undefined) return [];

    const candidateWidth = nextPeak - peak;
    if (candidateWidth < MIN_SPINE_WIDTH || candidateWidth > maxSpineWidth) {
      return [];
    }

    return [
      {
        left: peak,
        width: candidateWidth,
        score: verticalEdges[peak] + verticalEdges[nextPeak],
      },
    ];
  });

  const merged = mergeCloseCandidates(candidateRanges);
  const scored = merged
    .map((candidate) => {
      const left = Math.max(0, candidate.left - 4);
      const right = Math.min(width, candidate.left + candidate.width + 4);
      const sample: number[] = [];

      for (let x = left; x < right; x += 1) {
        for (let y = 0; y < height; y += Math.max(1, Math.floor(height / 80))) {
          sample.push(data[y * width + x]);
        }
      }

      return {
        ...candidate,
        left,
        width: right - left,
        score: candidate.score + Math.sqrt(getVariance(sample)),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SPINES)
    .sort((a, b) => a.left - b.left);

  return {
    candidates: scored,
    width,
    height,
  };
}

async function cropSpine(image: Buffer, candidate: SpineCandidate, sourceWidth: number) {
  const metadata = await sharp(image).metadata();
  const originalWidth = metadata.width ?? sourceWidth;
  const originalHeight = metadata.height ?? 1;
  const scaleX = originalWidth / sourceWidth;
  const left = Math.min(originalWidth - 1, Math.max(0, Math.floor(candidate.left * scaleX)));
  const cropWidth = Math.min(originalWidth - left, Math.ceil(candidate.width * scaleX));

  if (cropWidth < 1 || originalHeight < 1) {
    return null;
  }

  try {
    return await sharp(image)
      .extract({
        left,
        top: 0,
        width: cropWidth,
        height: originalHeight,
      })
      .rotate(90)
      .resize({
        height: OCR_HEIGHT,
        withoutEnlargement: true,
      })
      .greyscale()
      .normalize()
      .sharpen()
      .png()
      .toBuffer();
  } catch {
    return null;
  }
}

async function recognizeBooks(image: Buffer) {
  const detection = await detectSpineCandidates(image);

  if (!detection.candidates.length) {
    return {
      livres: [],
      total: 0,
      note: "Aucune tranche distincte détectée. Essayez une photo plus nette, prise bien en face de la bibliothèque.",
    };
  }

  const worker = await createWorker("fra", undefined, {
    langPath: LANG_PATH,
    workerPath: TESSERACT_WORKER_PATH,
    gzip: true,
  });

  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    preserve_interword_spaces: "1",
    user_defined_dpi: "300",
  });

  const books: Book[] = [];

  try {
    for (const candidate of detection.candidates) {
      const crop = await cropSpine(image, candidate, detection.width);
      if (!crop) continue;

      const { data } = await worker.recognize(crop);
      const title = normalizeOcrText(data.text);

      if (looksLikeTitle(title)) {
        books.push({
          titre: title,
          auteur: null,
          editeur: null,
        });
      }
    }
  } finally {
    await worker.terminate();
  }

  return {
    livres: books,
    total: books.length,
    note:
      books.length > 0
        ? "Détection locale open source: les tranches sont isolées par analyse d'image, puis lues avec Tesseract OCR. Les auteurs et éditeurs ne sont pas distingués automatiquement dans cette version."
        : `${detection.candidates.length} tranche${detection.candidates.length > 1 ? "s" : ""} possible${detection.candidates.length > 1 ? "s" : ""} détectée${detection.candidates.length > 1 ? "s" : ""}, mais aucun texte exploitable n'a été lu. Essayez une image plus nette ou mieux éclairée.`,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image manquante" }, { status: 400 });
    }

    const result = await recognizeBooks(Buffer.from(image, "base64"));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur détection livres:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse locale de l'image" },
      { status: 500 }
    );
  }
}
