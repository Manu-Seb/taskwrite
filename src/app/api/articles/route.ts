import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed

// GET /api/articles
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const source = searchParams.get("source");
    const tags = searchParams.get("tags")?.split(",") ?? [];
    const limit = parseInt(searchParams.get("limit") || "20");
    const after = searchParams.get("after") ? new Date(searchParams.get("after")!) : undefined;

    const articles = await prisma.article.findMany({
      where: {
        ...(source && { source: { name: source } }),
        ...(after && { publishedAt: { gte: after } }),
        ...(tags.length > 0 && {
          tags: {
            hasSome: tags,
          },
        }),
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: limit,
      include: {
        source: true,
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("[GET /api/articles]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
