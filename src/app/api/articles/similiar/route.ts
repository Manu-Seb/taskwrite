import prisma from "@/lib/prisma";
import { getEmbedding } from "@/lib/embeddings"; // Use OpenAI, HuggingFace, or local model
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content, topK = 5 } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Missing content" }, { status: 400 });
    }

    const embedding = await getEmbedding(content); // returns number[]

    const similarArticles = await prisma.$queryRawUnsafe(
      `
      SELECT *, embedding <#> $1 AS distance
      FROM "Article"
      WHERE embedding IS NOT NULL
      ORDER BY embedding <#> $1 ASC
      LIMIT $2;
    `,
      embedding,
      topK
    );

    return NextResponse.json(similarArticles);
  } catch (error) {
    console.error("[POST /api/articles/similar]", error);
    return NextResponse.json({ error: "Failed to find similar articles" }, { status: 500 });
  }
}
