import { NextRequest, NextResponse } from "next/server";

const OPENAI_MODEL = "gpt-5.5";

export async function POST(req: NextRequest) {
  try {
    const { image, mediaType } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image manquante" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Clé OpenAI manquante" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        max_output_tokens: 1024,
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_image",
                image_url: `data:${mediaType || "image/jpeg"};base64,${image}`,
              },
              {
                type: "input_text",
                text: `Analyse cette photo d'une bibliothèque et identifie tous les livres visibles à partir de l'écriture sur la tranche (le dos) des livres.

Pour chaque livre détecté, extrais :
- Le titre
- L'auteur (si visible)
- L'éditeur (si visible)

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, dans ce format exact :
{
  "livres": [
    {
      "titre": "Titre du livre",
      "auteur": "Nom de l'auteur ou null",
      "editeur": "Nom de l'éditeur ou null"
    }
  ],
  "total": nombre_de_livres_détectés,
  "note": "commentaire optionnel sur la qualité de la détection"
}

Si aucun livre n'est visible ou si l'image n'est pas une bibliothèque, réponds avec livres: [] et une note explicative.`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur OpenAI:", errorText);
      return NextResponse.json(
        { error: "Erreur lors de l'appel OpenAI" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.output_text || "";

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        result = JSON.parse(match[0]);
      } else {
        result = { livres: [], total: 0, note: "Impossible d'analyser la réponse" };
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur détection livres:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse de l'image" },
      { status: 500 }
    );
  }
}
