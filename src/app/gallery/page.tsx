"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Car, Users, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";

interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    category: string;
    order: number;
}

const categories = [
    { id: "all", label: "All" },
    { id: "lessons", label: "Driving Lessons" },
    { id: "vehicles", label: "Our Vehicles" },
    { id: "ndis", label: "NDIS Services" },
    { id: "team", label: "Our Team" },
];

export default function Gallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetch("/api/gallery").then(r => r.json()).then(setImages);
    }, []);

    const filteredImages = selectedCategory === "all"
        ? images
        : images.filter(img => img.category === selectedCategory);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "auto";
    };

    const nextImage = () => setCurrentImageIndex(p => (p + 1) % filteredImages.length);
    const prevImage = () => setCurrentImageIndex(p => (p - 1 + filteredImages.length) % filteredImages.length);

    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                badge="Gallery"
                titleStart="Moments From"
                titleAccent="Marvel Driving"
                description="Take a look at our automatic driving lessons, modern vehicle fleet, NDIS transport services, and our dedicated team in action."
                bannerImage="/slider-1.jpg"
            />

            {/* Filter Tabs */}
            <section className="py-8 bg-[#f8fafc] sticky top-[73px] z-40 border-b border-gray-100">
                <div className="container px-4 md:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                                    selectedCategory === cat.id
                                        ? "bg-[#1B7640] text-white"
                                        : "bg-white text-gray-700 border border-gray-200 hover:bg-[#1B7640]/10"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="container px-4 md:px-8">
                    {filteredImages.length === 0 && images.length > 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No images in this category.</p>
                        </div>
                    )}
                    {images.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">Gallery coming soon.</p>
                        </div>
                    )}
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group cursor-pointer"
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                                        <img
                                            src={image.url}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B7640]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="font-medium text-sm">{image.alt}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-20 bg-[#f8fafc]">
                <div className="container px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0d4a28]">Watch Us in Action</h2>
                        <p className="text-lg text-gray-500">See what it's like to learn with Marvel Driving School.</p>
                    </motion.div>
                    <div className="max-w-4xl mx-auto">
                        <div className="aspect-video bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center border border-gray-100">
                            <div className="text-center p-8">
                                <Car className="h-20 w-20 text-[#1B7640]/20 mx-auto mb-4" />
                                <p className="text-gray-500 font-medium">Video content coming soon</p>
                                <p className="text-sm text-gray-400 mt-2">We're working on creating exciting video content to showcase our services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && filteredImages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-10">
                            <X className="h-8 w-8" />
                        </button>
                        {filteredImages.length > 1 && (
                            <>
                                <button onClick={e => { e.stopPropagation(); prevImage(); }} className="absolute left-4 p-2 text-white/70 hover:text-white">
                                    <ChevronLeft className="h-10 w-10" />
                                </button>
                                <button onClick={e => { e.stopPropagation(); nextImage(); }} className="absolute right-4 p-2 text-white/70 hover:text-white">
                                    <ChevronRight className="h-10 w-10" />
                                </button>
                            </>
                        )}
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-5xl max-h-[85vh] p-4"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={filteredImages[currentImageIndex].url}
                                alt={filteredImages[currentImageIndex].alt}
                                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                            />
                            <p className="text-white/80 text-center mt-4">{filteredImages[currentImageIndex].alt}</p>
                            <p className="text-white/50 text-center text-sm mt-1">{currentImageIndex + 1} / {filteredImages.length}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
