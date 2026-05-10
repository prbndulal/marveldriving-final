"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, GripVertical, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Vacancy {
    id: string;
    title: string;
    type: string;
    location: string;
    description: string;
    requirements: string[];
    active: boolean;
    order: number;
}

const emptyForm = {
    title: "",
    type: "",
    location: "Sydney",
    description: "",
    requirements: [""],
    active: true,
    order: 0,
};

export default function AdminVacanciesPage() {
    const { toast } = useToast();
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Vacancy | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    async function fetchVacancies() {
        const res = await fetch("/api/vacancies");
        const data = await res.json();
        setVacancies(data);
        setLoading(false);
    }

    useEffect(() => { fetchVacancies(); }, []);

    function openCreate() {
        setEditing(null);
        setForm({ ...emptyForm, order: vacancies.length });
        setShowForm(true);
    }

    function openEdit(v: Vacancy) {
        setEditing(v);
        setForm({
            title: v.title,
            type: v.type,
            location: v.location,
            description: v.description,
            requirements: v.requirements.length ? v.requirements : [""],
            active: v.active,
            order: v.order,
        });
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditing(null);
        setForm(emptyForm);
    }

    function updateReq(index: number, value: string) {
        const reqs = [...form.requirements];
        reqs[index] = value;
        setForm({ ...form, requirements: reqs });
    }

    function addReq() {
        setForm({ ...form, requirements: [...form.requirements, ""] });
    }

    function removeReq(index: number) {
        setForm({ ...form, requirements: form.requirements.filter((_, i) => i !== index) });
    }

    async function handleSave() {
        if (!form.title || !form.type || !form.description) {
            toast({ title: "Missing fields", description: "Title, type, and description are required.", variant: "destructive" });
            return;
        }
        setSaving(true);
        const payload = {
            ...form,
            requirements: form.requirements.filter(r => r.trim() !== ""),
        };
        try {
            if (editing) {
                await fetch(`/api/vacancies/${editing.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                toast({ title: "Vacancy updated" });
            } else {
                await fetch("/api/vacancies", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                toast({ title: "Vacancy created" });
            }
            closeForm();
            fetchVacancies();
        } catch {
            toast({ title: "Error saving vacancy", variant: "destructive" });
        } finally {
            setSaving(false);
        }
    }

    async function handleToggleActive(v: Vacancy) {
        await fetch(`/api/vacancies/${v.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ active: !v.active }),
        });
        fetchVacancies();
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this vacancy?")) return;
        await fetch(`/api/vacancies/${id}`, { method: "DELETE" });
        toast({ title: "Vacancy deleted" });
        fetchVacancies();
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#0d4a28]">Job Vacancies</h1>
                    <p className="text-gray-500 mt-1">Manage open positions shown on the Careers page.</p>
                </div>
                <Button className="bg-[#1B7640] hover:bg-[#0d4a28] text-white font-bold" onClick={openCreate}>
                    <Plus className="h-4 w-4 mr-2" /> Add Vacancy
                </Button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-[#0d4a28]">{editing ? "Edit Vacancy" : "New Vacancy"}</h2>
                            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Job Title *</Label>
                                    <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Driving Instructor" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Employment Type *</Label>
                                    <Input value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} placeholder="e.g. Full-time / Part-time" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Sydney" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Display Order</Label>
                                    <Input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Description *</Label>
                                <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description of the role..." rows={3} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>Requirements</Label>
                                    <button onClick={addReq} className="text-xs text-[#1B7640] hover:underline font-semibold">+ Add requirement</button>
                                </div>
                                <div className="space-y-2">
                                    {form.requirements.map((req, i) => (
                                        <div key={i} className="flex gap-2">
                                            <Input
                                                value={req}
                                                onChange={e => updateReq(i, e.target.value)}
                                                placeholder={`Requirement ${i + 1}`}
                                            />
                                            {form.requirements.length > 1 && (
                                                <button onClick={() => removeReq(i)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setForm({ ...form, active: !form.active })}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${form.active ? "bg-[#1B7640]/10 text-[#1B7640]" : "bg-gray-100 text-gray-500"}`}
                                >
                                    {form.active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                                    {form.active ? "Active (shown on site)" : "Inactive (hidden)"}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 p-6 border-t border-gray-100">
                            <Button onClick={handleSave} disabled={saving} className="bg-[#1B7640] hover:bg-[#0d4a28] text-white font-bold flex-1">
                                {saving ? "Saving..." : editing ? "Save Changes" : "Create Vacancy"}
                            </Button>
                            <Button variant="outline" onClick={closeForm}>Cancel</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Vacancy List */}
            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading vacancies...</div>
            ) : vacancies.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-lg font-semibold mb-2">No vacancies yet</p>
                    <p className="text-sm">Click "Add Vacancy" to create your first job listing.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {vacancies.map(v => (
                        <div key={v.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-[#0d4a28]">{v.title}</h3>
                                        {!v.active && (
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-full font-semibold">Hidden</span>
                                        )}
                                        {v.active && (
                                            <span className="px-2 py-0.5 bg-[#1B7640]/10 text-[#1B7640] text-xs rounded-full font-semibold">Active</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">{v.type} · {v.location}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2">{v.description}</p>
                                    {v.requirements.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {v.requirements.slice(0, 3).map((r, i) => (
                                                <span key={i} className="flex items-center gap-1 text-xs bg-[#f8fafc] text-gray-600 px-2 py-1 rounded-md">
                                                    <Check className="h-3 w-3 text-[#1B7640]" /> {r}
                                                </span>
                                            ))}
                                            {v.requirements.length > 3 && (
                                                <span className="text-xs text-gray-400 px-2 py-1">+{v.requirements.length - 3} more</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleToggleActive(v)}
                                        title={v.active ? "Deactivate" : "Activate"}
                                        className="p-2 rounded-lg text-gray-400 hover:text-[#1B7640] hover:bg-[#1B7640]/10 transition-colors"
                                    >
                                        {v.active ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                                    </button>
                                    <button
                                        onClick={() => openEdit(v)}
                                        className="p-2 rounded-lg text-gray-400 hover:text-[#1B7640] hover:bg-[#1B7640]/10 transition-colors"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(v.id)}
                                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
