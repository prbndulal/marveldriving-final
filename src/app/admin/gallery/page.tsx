"use client";
import { useEffect, useState } from "react";
import { Trash2, Plus, Loader2, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    category: string;
    order: number;
    createdAt: string;
}

const CATEGORIES = [
    { value: "lessons", label: "Driving Lessons" },
    { value: "vehicles", label: "Our Vehicles" },
    { value: "ndis", label: "NDIS Services" },
    { value: "team", label: "Our Team" },
    { value: "general", label: "General" },
];

export default function AdminGalleryPage() {
    const { toast } = useToast();
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ url: "", alt: "", category: "general", order: "0" });

    const fetchImages = async () => {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setImages(data);
        setLoading(false);
    };

    useEffect(() => { fetchImages(); }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.url || !form.alt) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, order: parseInt(form.order) || 0 }),
            });
            if (!res.ok) throw new Error();
            toast({ title: "Image added successfully" });
            setForm({ url: "", alt: "", category: "general", order: "0" });
            fetchImages();
        } catch {
            toast({ title: "Failed to add image", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this image?")) return;
        try {
            await fetch(`/api/gallery/${id}`, { method: "DELETE" });
            toast({ title: "Image deleted" });
            setImages(prev => prev.filter(img => img.id !== id));
        } catch {
            toast({ title: "Failed to delete", variant: "destructive" });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-[#0d4a28]">Gallery Management</h1>
                <p className="text-gray-500 text-sm mt-1">Add and manage images shown in the public gallery.</p>
            </div>

            {/* Add Image Form */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-[#0d4a28] mb-4">Add New Image</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                        <Label htmlFor="url">Image URL <span className="text-red-500">*</span></Label>
                        <Input
                            id="url"
                            placeholder="https://example.com/image.jpg"
                            value={form.url}
                            onChange={e => setForm(p => ({ ...p, url: e.target.value }))}
                            required
                        />
                        <p className="text-xs text-gray-400">Use Imgur, Cloudinary, or any direct image URL.</p>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="alt">Alt Text / Caption <span className="text-red-500">*</span></Label>
                        <Input
                            id="alt"
                            placeholder="e.g. Professional driving lesson in progress"
                            value={form.alt}
                            onChange={e => setForm(p => ({ ...p, alt: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label>Category</Label>
                        <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-white">
                                {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="order">Display Order</Label>
                        <Input
                            id="order"
                            type="number"
                            placeholder="0"
                            value={form.order}
                            onChange={e => setForm(p => ({ ...p, order: e.target.value }))}
                        />
                        <p className="text-xs text-gray-400">Lower numbers appear first.</p>
                    </div>

                    {/* Preview */}
                    {form.url && (
                        <div className="md:col-span-2">
                            <Label>Preview</Label>
                            <div className="mt-1.5 w-48 h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                <img src={form.url} alt="preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
                            </div>
                        </div>
                    )}

                    <div className="md:col-span-2">
                        <Button type="submit" className="bg-[#1B7640] hover:bg-[#155c30] text-white font-bold" disabled={submitting}>
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                            Add Image
                        </Button>
                    </div>
                </form>
            </div>

            {/* Image Grid */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-[#0d4a28] mb-4">
                    All Images <span className="text-gray-400 font-normal text-sm">({images.length})</span>
                </h2>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-8 w-8 animate-spin text-[#1B7640]" />
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <ImageOff className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p>No images yet. Add your first image above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map(img => (
                            <div key={img.id} className="group relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 aspect-[4/3]">
                                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                    <p className="text-white text-xs text-center font-medium leading-tight">{img.alt}</p>
                                    <span className="px-2 py-0.5 bg-[#fbbf24] text-[#1B7640] rounded-full text-xs font-bold">
                                        {CATEGORIES.find(c => c.value === img.category)?.label || img.category}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="h-7 text-xs mt-1"
                                        onClick={() => handleDelete(img.id)}
                                    >
                                        <Trash2 className="h-3 w-3 mr-1" /> Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
