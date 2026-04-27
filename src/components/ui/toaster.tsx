"use client"

import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle } from "lucide-react"

export function Toaster() {
    const { toasts, dismiss } = useToast()

    return (
        <div className="fixed bottom-0 right-0 z-[100] flex flex-col p-4 gap-2 w-full max-w-[420px] pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className={`pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-2xl border p-5 shadow-2xl transition-all ${
                            toast.variant === "destructive"
                                ? "bg-red-50 border-red-100 text-red-900"
                                : "bg-white border-gray-100 text-[#0d4a28]"
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            {toast.variant === "destructive" ? (
                                <AlertCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                            ) : (
                                <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                            )}
                            <div className="grid gap-1">
                                {toast.title && (
                                    <div className="text-base font-extrabold tracking-tight">
                                        {toast.title}
                                    </div>
                                )}
                                {toast.description && (
                                    <div className="text-sm font-medium opacity-90 leading-relaxed">
                                        {toast.description}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => dismiss(toast.id)}
                            className="absolute right-3 top-3 rounded-lg p-1 text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
