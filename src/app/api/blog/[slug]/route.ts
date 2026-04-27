import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { slug } = await params;
    const data = await req.json();
    const post = await prisma.blogPost.update({ where: { slug }, data });
    return NextResponse.json(post);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { slug } = await params;
    await prisma.blogPost.delete({ where: { slug } });
    return NextResponse.json({ success: true });
}
