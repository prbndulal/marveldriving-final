"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    readTime: string;
    image: string;
    content: string;
    createdAt: string;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        fetch(`/api/blog/${slug}`)
            .then(r => { if (!r.ok) { setNotFound(true); setLoading(false); return null; } return r.json(); })
            .then(data => { if (data) { setPost(data); setLoading(false); } });
    }, [slug]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-[#1B7640] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (notFound || !post) return (
        <div className="py-20 text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-[#0d4a28]">Article Not Found</h1>
            <p className="text-gray-500 mb-8">This blog post doesn't exist or is coming soon.</p>
            <Button className="bg-[#1B7640] text-white" asChild><Link href="/blog">Back to Blog</Link></Button>
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="relative">
                <div className="aspect-[21/9] md:aspect-[3/1] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-end">
                    <div className="container px-4 md:px-8 pb-8 md:pb-12">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4">
                                <ChevronLeft className="h-4 w-4" /> Back to Blog
                            </Link>
                            <span className="inline-flex items-center gap-2 text-[#fbbf24] font-medium mb-3 block">
                                <Tag className="h-4 w-4" /> {post.category}
                            </span>
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                                <span className="flex items-center gap-1"><User className="h-4 w-4" />{post.author}</span>
                                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(post.createdAt)}</span>
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Article */}
            <article className="py-12 md:py-16">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto blog-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>

            {/* CTA */}
            <section className="py-16 bg-[#1B7640]">
                <div className="container px-4 md:px-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Want More Driving Tips?</h2>
                    <p className="text-white/80 mb-8 max-w-lg mx-auto">Browse all our articles for expert advice on driving in Sydney, test preparation, and NDIS services.</p>
                    <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1B7640] font-bold h-12 px-8" asChild>
                        <Link href="/blog">View All Articles</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
