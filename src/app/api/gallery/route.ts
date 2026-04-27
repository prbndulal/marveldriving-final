import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    const images = await prisma.galleryImage.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(images);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url, alt, category, order } = await req.json();
    if (!url || !alt) {
        return NextResponse.json({ error: "URL and alt text are required" }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
        data: { url, alt, category: category || "general", order: order ?? 0 },
    });
    return NextResponse.json(image);
}
