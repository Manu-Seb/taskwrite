import prisma from "@/lib/prisma";
import { scrapeArticle } from "@/lib/scraper"; // implement this logic
import { summarizeArticle } from "@/lib/summarizer"; // implement this too
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const scraped = await scrapeArticle(article.url); // returns { content, author?, publishedAt? }
    const summary = await summarizeArticle(scraped.content);

    const updated = await prisma.article.update({
      where: { id },
      data: {
        content: scraped.content,
        summary,
        author: scraped.author ?? article.author,
        publishedAt: scraped.publishedAt ?? article.publishedAt,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[POST /api/articles/refresh/:id]", error);
    return NextResponse.json({ error: "Failed to refresh article" }, { status: 500 });
  }
}
