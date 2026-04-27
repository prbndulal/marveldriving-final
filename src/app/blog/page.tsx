"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    readTime: string;
    image: string;
    featured: boolean;
    createdAt: string;
}

const categories = ["All", "Sydney Driving", "NDIS Services", "Road Safety", "Test Preparation", "Driving Tips"];

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blog").then(r => r.json()).then(data => { setPosts(data); setLoading(false); });
    }, []);

    const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory);
    const featuredPost = filtered.find(p => p.featured) || filtered[0];
    const regularPosts = filtered.filter(p => p.id !== featuredPost?.id);

    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                badge="Our Blog"
                titleStart="Marvel Driving"
                titleAccent="Insights & News"
                description="Driving tips, road safety updates, NDIS information, and news from Marvel Driving School."
                bannerImage="/slider-2.jpg"
            />

            <section className="py-6 bg-[#f8fafc] border-b border-gray-100">
                <div className="container px-4 md:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "bg-[#1B7640] text-white" : "bg-white text-gray-700 border border-gray-200 hover:bg-[#1B7640] hover:text-white"}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {loading ? (
                <div className="flex items-center justify-center py-32">
                    <div className="w-10 h-10 border-4 border-[#1B7640] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <>
                    {featuredPost && (
                        <section className="py-16">
                            <div className="container px-4 md:px-8">
                                <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                                        <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-[#fbbf24] text-[#1B7640] text-sm font-semibold rounded-full">Featured</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="inline-flex items-center gap-2 text-[#1B7640] font-medium mb-4"><Tag className="h-4 w-4" />{featuredPost.category}</span>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0d4a28]">{featuredPost.title}</h2>
                                        <p className="text-gray-500 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                                            <span className="flex items-center gap-1"><User className="h-4 w-4" />{featuredPost.author}</span>
                                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(featuredPost.createdAt)}</span>
                                            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{featuredPost.readTime}</span>
                                        </div>
                                        <Button className="bg-[#1B7640] hover:bg-[#155c30] text-white font-bold" asChild>
                                            <Link href={`/blog/${featuredPost.slug}`}>Read Article <ChevronRight className="h-5 w-5 ml-1" /></Link>
                                        </Button>
                                    </div>
                                </motion.article>
                            </div>
                        </section>
                    )}

                    {regularPosts.length > 0 && (
                        <section className="py-16 bg-[#f8fafc]">
                            <div className="container px-4 md:px-8">
                                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold text-[#0d4a28] mb-12">Latest Articles</motion.h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {regularPosts.map((post, index) => (
                                        <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-xl transition-shadow duration-300">
                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-[#1B7640]/90 text-white text-xs font-medium rounded-full">{post.category}</span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-[#1B7640] transition-colors">
                                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{post.excerpt}</p>
                                                <div className="flex items-center justify-between text-xs text-gray-400">
                                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(post.createdAt)}</span>
                                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}

            <section className="py-20 bg-[#1B7640]">
                <div className="container px-4 md:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
                        <p className="text-lg text-white/90 mb-8">Get the latest driving tips, road safety updates, and Marvel Driving news delivered to your inbox.</p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#fbbf24]" />
                            <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-[#1B7640] font-bold px-6">Subscribe</Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
