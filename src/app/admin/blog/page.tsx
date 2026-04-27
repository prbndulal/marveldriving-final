"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
    id: string; slug: string; title: string; excerpt: string;
    category: string; author: string; image: string; readTime: string;
    featured: boolean; published: boolean; createdAt: string;
}

const CATEGORIES = ["Sydney Driving", "NDIS Services", "Road Safety", "Test Preparation", "Driving Tips", "General"];
const BLANK = { slug: "", title: "", excerpt: "", content: "", category: "General", author: "Marvel Driving", image: "/slider-1.jpg", readTime: "5 min read", featured: false, published: true };

export default function AdminBlogPage() {
    const { toast } = useToast();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<"list" | "form">("list");
    const [editSlug, setEditSlug] = useState<string | null>(null);
    const [form, setForm] = useState<any>(BLANK);
    const [saving, setSaving] = useState(false);

    const fetchPosts = async () => {
        const res = await fetch("/api/blog?all=true");
        setPosts(await res.json());
        setLoading(false);
    };
    useEffect(() => { fetchPosts(); }, []);

    const openNew = () => { setForm(BLANK); setEditSlug(null); setView("form"); };

    const openEdit = async (slug: string) => {
        const res = await fetch(`/api/blog/${slug}`);
        const data = await res.json();
        setForm(data);
        setEditSlug(slug);
        setView("form");
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const method = editSlug ? "PUT" : "POST";
            const url = editSlug ? `/api/blog/${editSlug}` : "/api/blog";
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
            if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
            toast({ title: editSlug ? "Post updated" : "Post created" });
            setView("list");
            fetchPosts();
        } catch (err: any) {
            toast({ title: err.message || "Failed to save", variant: "destructive" });
        } finally { setSaving(false); }
    };

    const handleDelete = async (slug: string, title: string) => {
        if (!confirm(`Delete "${title}"?`)) return;
        await fetch(`/api/blog/${slug}`, { method: "DELETE" });
        toast({ title: "Post deleted" });
        setPosts(prev => prev.filter(p => p.slug !== slug));
    };

    const togglePublish = async (post: BlogPost) => {
        await fetch(`/api/blog/${post.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: !post.published }) });
        setPosts(prev => prev.map(p => p.slug === post.slug ? { ...p, published: !p.published } : p));
    };

    if (view === "form") return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#0d4a28]">{editSlug ? "Edit Post" : "New Post"}</h1>
                <Button variant="outline" onClick={() => setView("list")}>← Back to Posts</Button>
            </div>
            <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <Label>Title *</Label>
                        <Input value={form.title} onChange={e => setForm((p: any) => ({ ...p, title: e.target.value }))} required />
                    </div>
                    <div className="space-y-1.5">
                        <Label>Slug * <span className="text-xs text-gray-400">(URL-friendly, e.g. my-post-title)</span></Label>
                        <Input value={form.slug} onChange={e => setForm((p: any) => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))} required disabled={!!editSlug} />
                    </div>
                    <div className="space-y-1.5">
                        <Label>Category</Label>
                        <Select value={form.category} onValueChange={v => setForm((p: any) => ({ ...p, category: v }))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-white">{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label>Author</Label>
                        <Input value={form.author} onChange={e => setForm((p: any) => ({ ...p, author: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                        <Label>Cover Image URL</Label>
                        <Input value={form.image} onChange={e => setForm((p: any) => ({ ...p, image: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                        <Label>Read Time</Label>
                        <Input value={form.readTime} onChange={e => setForm((p: any) => ({ ...p, readTime: e.target.value }))} placeholder="5 min read" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <Label>Excerpt *</Label>
                    <Textarea value={form.excerpt} onChange={e => setForm((p: any) => ({ ...p, excerpt: e.target.value }))} rows={3} required />
                </div>
                <div className="space-y-1.5">
                    <Label>Content (HTML) *</Label>
                    <Textarea value={form.content} onChange={e => setForm((p: any) => ({ ...p, content: e.target.value }))} rows={16} required className="font-mono text-sm" placeholder="<p>Write your post content in HTML...</p>" />
                    <p className="text-xs text-gray-400">Supports HTML tags: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;hr/&gt;</p>
                </div>
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.featured} onChange={e => setForm((p: any) => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 accent-[#1B7640]" />
                        <span className="text-sm font-medium">Featured post</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.published} onChange={e => setForm((p: any) => ({ ...p, published: e.target.checked }))} className="w-4 h-4 accent-[#1B7640]" />
                        <span className="text-sm font-medium">Published</span>
                    </label>
                </div>
                <div className="flex gap-3 pt-2">
                    <Button type="submit" className="bg-[#1B7640] hover:bg-[#155c30] text-white font-bold" disabled={saving}>
                        {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}{editSlug ? "Update Post" : "Create Post"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setView("list")}>Cancel</Button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0d4a28]">Blog Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Create and manage blog posts.</p>
                </div>
                <Button onClick={openNew} className="bg-[#1B7640] hover:bg-[#155c30] text-white font-bold">
                    <Plus className="h-4 w-4 mr-2" /> New Post
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-[#1B7640]" /></div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">No posts yet. Create your first post.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                                <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {posts.map(post => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            {post.featured && <Star className="h-3.5 w-3.5 text-[#fbbf24] fill-[#fbbf24] shrink-0" />}
                                            <span className="font-medium text-gray-800 line-clamp-1">{post.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <span className="px-2 py-0.5 bg-[#1B7640]/10 text-[#1B7640] rounded-full text-xs font-medium">{post.category}</span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{new Date(post.createdAt).toLocaleDateString("en-AU")}</td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => togglePublish(post)} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                            {post.published ? <><Eye className="h-3 w-3" /> Published</> : <><EyeOff className="h-3 w-3" /> Draft</>}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => openEdit(post.slug)}>
                                                <Pencil className="h-3 w-3 mr-1" /> Edit
                                            </Button>
                                            <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleDelete(post.slug, post.title)}>
                                                <Trash2 className="h-3 w-3 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
