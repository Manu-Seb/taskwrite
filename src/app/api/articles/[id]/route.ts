import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: { source: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("[GET /api/articles/:id]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
