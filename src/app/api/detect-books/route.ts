import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { image, mediaType } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image manquante" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType || "image/jpeg",
                data: image,
              },
            },
            {
              type: "text",
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
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

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
