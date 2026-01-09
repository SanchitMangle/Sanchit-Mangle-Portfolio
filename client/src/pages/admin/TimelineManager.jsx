import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Plus, Edit, Trash2, Search, X, ChevronLeft, ChevronRight, Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ConfirmationModal from "../../components/admin/ConfirmationModal";

const TimelineManager = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const { toast } = useToast();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [formData, setFormData] = useState({
        type: "experience",
        title: "",
        organization: "",
        period: "",
        location: "",
        description: "",
        displayOrder: 0
    });

    const fetchItems = async () => {
        try {
            const { data } = await api.get("/timeline");
            setItems(data.sort((a, b) => a.displayOrder - b.displayOrder));
        } catch (error) {
            toast({ title: "Error", description: "Failed to fetch timeline", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/timeline/${deleteId}`);
            setItems(items.filter(i => i._id !== deleteId));
            toast({ title: "Success", description: "Entry deleted" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete entry", variant: "destructive" });
        } finally {
            setDeleteId(null);
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setFormData({
            type: item.type,
            title: item.title,
            organization: item.organization,
            period: item.period,
            location: item.location,
            description: item.description.join("\n"),
            displayOrder: item.displayOrder
        });
        setIsModalOpen(true);
    };

    const openNewModal = () => {
        setCurrentItem(null);
        setFormData({ type: "experience", title: "", organization: "", period: "", location: "", description: "", displayOrder: 0 });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            description: formData.description.split("\n").filter(line => line.trim() !== "")
        };

        try {
            if (currentItem) {
                const { data } = await api.put(`/timeline/${currentItem._id}`, payload);
                setItems(items.map(i => i._id === currentItem._id ? data : i));
                toast({ title: "Success", description: "Entry updated" });
            } else {
                const { data } = await api.post("/timeline", payload);
                setItems([...items, data]);
                toast({ title: "Success", description: "Entry created" });
            }
            setIsModalOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Operation failed", variant: "destructive" });
        }
    };

    // Filter & Pagination Logic
    const filteredItems = items.filter(i =>
        i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.description.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header Section (Fixed) */}
            <div className="flex-none space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
                        <p className="text-muted-foreground">Manage your experience and education history</p>
                    </div>
                    <button
                        onClick={openNewModal}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        <Plus size={18} /> Add Entry
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search timeline..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Table View (Flex-grow and Scrollable) */}
            <div className="flex-1 bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-0">
                <div className="flex-1 overflow-auto scrollbar-hide">
                    <table className="w-full text-left text-sm relative">
                        <thead className="bg-muted border-b border-border/50 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 font-medium text-muted-foreground w-32 bg-muted/50">Type</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground bg-muted/50">Role / Degree</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground bg-muted/50">Organization</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground w-40 bg-muted/50">Period</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground text-center bg-muted/50">Order</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground text-right w-32 bg-muted/50">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {paginatedItems.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">No entries found.</td></tr>
                            ) : (
                                paginatedItems.map((item) => (
                                    <tr key={item._id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${item.type === 'experience'
                                                ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                                : 'bg-purple-500/10 text-purple-500 border border-purple-500/20'
                                                }`}>
                                                {item.type === 'experience' ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-foreground">
                                            {item.title}
                                            <div className="text-xs text-muted-foreground font-normal mt-0.5 flex items-center gap-1">
                                                <MapPin size={10} /> {item.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground font-medium">
                                            {item.organization}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                {item.period}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-muted-foreground font-mono">
                                            {item.displayOrder}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEdit(item)} className="p-2 hover:bg-blue-500/10 rounded-lg text-muted-foreground hover:text-blue-500 transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteClick(item._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Fixed at bottom of card) */}
                {totalPages > 1 && (
                    <div className="flex-none flex items-center justify-between px-6 py-4 border-t border-border/50 bg-card z-10">
                        <span className="text-xs text-muted-foreground">Page {currentPage} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 hover:bg-muted rounded-lg disabled:opacity-50 transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 hover:bg-muted rounded-lg disabled:opacity-50 transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center px-6 py-4 border-b border-border">
                                <h3 className="text-lg font-semibold">{currentItem ? "Edit Entry" : "New Entry"}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                        >
                                            <option value="experience">Experience</option>
                                            <option value="education">Education</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Order</label>
                                        <input
                                            type="number"
                                            value={formData.displayOrder}
                                            onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Title / Degree</label>
                                        <input
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Organization / University</label>
                                        <input
                                            value={formData.organization}
                                            onChange={e => setFormData({ ...formData, organization: e.target.value })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Period</label>
                                        <input
                                            placeholder="e.g. 2023 - Present"
                                            value={formData.period}
                                            onChange={e => setFormData({ ...formData, period: e.target.value })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Location</label>
                                        <input
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground">Description (Enter each point on a new line)</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-muted/50 border border-input rounded-lg p-3 min-h-[120px] focus:ring-1 focus:ring-primary outline-none font-mono text-sm leading-relaxed"
                                        placeholder="- Lead developer for project X&#10;- Optimized database queries&#10;- Mentored junior developers"
                                    />
                                </div>

                                <div className="flex gap-2 justify-end mt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-muted rounded-lg transition-colors">Cancel</button>
                                    <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all">
                                        {currentItem ? "Save Changes" : "Create Entry"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Entry"
                message="Are you sure you want to remove this timeline entry? This action is reversible by an admin."
                confirmText="Delete Entry"
                isDestructive={true}
            />
        </div>
    );
};

export default TimelineManager;
