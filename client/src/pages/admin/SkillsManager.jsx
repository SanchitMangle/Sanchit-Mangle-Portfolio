import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Plus, Edit, Trash2, Search, X, ChevronLeft, ChevronRight, Cpu, Globe, Database, PenTool, Layout, Server, Terminal, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ConfirmationModal from "../../components/admin/ConfirmationModal";

const SkillsManager = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const { toast } = useToast();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [formData, setFormData] = useState({
        name: "",
        level: 50,
        category: "frontend",
        icon: "",
        displayOrder: 0
    });

    const fetchSkills = async () => {
        try {
            const { data } = await api.get("/skills");
            setSkills(data.sort((a, b) => a.displayOrder - b.displayOrder));
        } catch (error) {
            toast({ title: "Error", description: "Failed to fetch skills", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/skills/${deleteId}`);
            setSkills(skills.filter(s => s._id !== deleteId));
            toast({ title: "Success", description: "Skill deleted" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete skill", variant: "destructive" });
        } finally {
            setDeleteId(null);
        }
    };

    const handleEdit = (skill) => {
        setCurrentItem(skill);
        setFormData({
            name: skill.name,
            level: skill.level,
            category: skill.category,
            icon: skill.icon || "",
            displayOrder: skill.displayOrder
        });
        setIsModalOpen(true);
    };

    const openNewModal = () => {
        setCurrentItem(null);
        setFormData({ name: "", level: 50, category: "frontend", icon: "", displayOrder: 0 });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentItem) {
                const { data } = await api.put(`/skills/${currentItem._id}`, formData);
                setSkills(skills.map(s => s._id === currentItem._id ? data : s));
                toast({ title: "Success", description: "Skill updated" });
            } else {
                const { data } = await api.post("/skills", formData);
                setSkills([...skills, data]);
                toast({ title: "Success", description: "Skill created" });
            }
            setIsModalOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Operation failed", variant: "destructive" });
        }
    };

    // Filter & Pagination Logic
    const filteredSkills = skills.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
    const paginatedSkills = filteredSkills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header Section (Fixed) */}
            <div className="flex-none space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
                        <p className="text-muted-foreground">Manage your technical expertise</p>
                    </div>
                    <button
                        onClick={openNewModal}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        <Plus size={18} /> Add Skill
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search skills..."
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
                                <th className="px-6 py-4 font-medium text-muted-foreground bg-muted/50">Name</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground bg-muted/50">Category</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground bg-muted/50">Level</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground text-center bg-muted/50">Order</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground text-right bg-muted/50">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {paginatedSkills.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">No skills found.</td></tr>
                            ) : (
                                paginatedSkills.map((skill) => (
                                    <tr key={skill._id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-semibold">{skill.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wide font-medium">
                                                {skill.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full max-w-[100px] h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${skill.level}%` }} />
                                            </div>
                                            <span className="text-xs text-muted-foreground mt-1 inline-block">{skill.level}%</span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-muted-foreground font-mono">
                                            {skill.displayOrder}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEdit(skill)} className="p-2 hover:bg-blue-500/10 rounded-lg text-muted-foreground hover:text-blue-500 transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteClick(skill._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500 transition-colors">
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
                            className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center px-6 py-4 border-b border-border">
                                <h3 className="text-lg font-semibold">{currentItem ? "Edit Skill" : "New Skill"}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Name</label>
                                        <input
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Level (0-100)</label>
                                        <input
                                            type="number"
                                            value={formData.level}
                                            onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                            min="0" max="100"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                    >
                                        <option value="frontend">Frontend</option>
                                        <option value="backend">Backend</option>
                                        <option value="tools">Tools</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Icon (Lucide Name)</label>
                                        <input
                                            value={formData.icon}
                                            onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                        />
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

                                <div className="flex gap-2 justify-end mt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-muted rounded-lg transition-colors">Cancel</button>
                                    <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all">
                                        {currentItem ? "Save Changes" : "Create Skill"}
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
                title="Delete Skill"
                message="Are you sure you want to delete this skill? It can be restored by an admin if needed."
                confirmText="Delete Skill"
                isDestructive={true}
            />
        </div>
    );
};

export default SkillsManager;
