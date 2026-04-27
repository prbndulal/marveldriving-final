import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const posts = await prisma.blogPost.findMany({
        where: all ? {} : { published: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        select: {
            id: true, slug: true, title: true, excerpt: true,
            category: true, author: true, image: true,
            readTime: true, featured: true, published: true, createdAt: true,
        },
    });
    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await req.json();
    if (!data.slug || !data.title || !data.content) {
        return NextResponse.json({ error: "slug, title and content are required" }, { status: 400 });
    }
    const post = await prisma.blogPost.create({ data });
    return NextResponse.json(post);
}
