import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Plus, Edit, Trash2, ExternalLink, Search, X, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "../../components/admin/ImageUpload";
import ConfirmationModal from "../../components/admin/ConfirmationModal";

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const { toast } = useToast();
    const [deleteId, setDeleteId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        tags: "",
        demoUrl: "",
        githubUrl: "",
        displayOrder: 0
    });

    const fetchProjects = async () => {
        try {
            const { data } = await api.get("/projects");
            setProjects(data.sort((a, b) => a.displayOrder - b.displayOrder));
        } catch (error) {
            toast({ title: "Error", description: "Failed to fetch projects", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/projects/${deleteId}`);
            setProjects(projects.filter(p => p._id !== deleteId));
            toast({ title: "Success", description: "Project deleted successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
        } finally {
            setDeleteId(null);
        }
    };

    // ... handleEdit, openNewModal ...

    const handleEdit = (project) => {
        setCurrentItem(project);
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            tags: project.tags.join(", "),
            demoUrl: project.demoUrl,
            githubUrl: project.githubUrl,
            displayOrder: project.displayOrder
        });
        setIsModalOpen(true);
    };

    const openNewModal = () => {
        setCurrentItem(null);
        setFormData({ title: "", description: "", image: "", tags: "", demoUrl: "", githubUrl: "", displayOrder: 0 });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            tags: formData.tags.split(",").map(t => t.trim()).filter(t => t)
        };

        try {
            if (currentItem) {
                const { data } = await api.put(`/projects/${currentItem._id}`, payload);
                setProjects(projects.map(p => p._id === currentItem._id ? data : p));
                toast({ title: "Success", description: "Project updated" });
            } else {
                const { data } = await api.post("/projects", payload);
                setProjects([...projects, data]);
                toast({ title: "Success", description: "Project created" });
            }
            setIsModalOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Operation failed", variant: "destructive" });
        }
    };

    // Filter & Pagination Logic
    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (

        <div className="h-full flex flex-col gap-6">
            {/* Header Section (Fixed) */}
            <div className="flex-none space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground">Manage your portfolio projects</p>
                    </div>
                    <button
                        onClick={openNewModal}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        <Plus size={18} /> Add Project
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects..."
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
                                <th className="px-6 py-4 font-medium text-muted-foreground w-16 bg-muted/50">Image</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground bg-muted/50">Details</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground w-48 bg-muted/50">Tags</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground w-24 text-center bg-muted/50">Order</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground text-right bg-muted/50">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {paginatedProjects.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">No projects found.</td></tr>
                            ) : (
                                paginatedProjects.map((project) => (
                                    <tr key={project._id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <img src={project.image} alt="thumbnail" className="w-10 h-10 rounded-lg object-cover bg-muted" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-foreground">{project.title}</div>
                                            <div className="text-muted-foreground line-clamp-1 text-xs mt-0.5">{project.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {project.tags.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] whitespace-nowrap">{t}</span>
                                                ))}
                                                {project.tags.length > 3 && <span className="text-xs text-muted-foreground">+{project.tags.length - 3}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-muted-foreground font-mono">
                                            {project.displayOrder}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {project.demoUrl && (
                                                    <a href={project.demoUrl} target="_blank" className="p-2 hover:bg-primary/10 rounded-lg text-muted-foreground hover:text-primary transition-colors">
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                                <button onClick={() => handleEdit(project)} className="p-2 hover:bg-blue-500/10 rounded-lg text-muted-foreground hover:text-blue-500 transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteClick(project._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500 transition-colors">
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

            {/* Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
                                <h3 className="text-lg font-semibold">{currentItem ? "Edit Project" : "New Project"}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-muted-foreground">Title</label>
                                            <input
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-muted-foreground">Description</label>
                                            <textarea
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full bg-muted/50 border border-input rounded-lg p-3 min-h-[120px] focus:ring-1 focus:ring-primary outline-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Image Upload Column */}
                                    <div>
                                        <ImageUpload
                                            value={formData.image}
                                            onChange={(url) => setFormData({ ...formData, image: url })}
                                            label="Project Thumbnail"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground">Tags (comma separated)</label>
                                    <input
                                        value={formData.tags}
                                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">Demo URL</label>
                                        <input
                                            value={formData.demoUrl}
                                            onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                                            className="w-full bg-muted/50 border border-input rounded-lg p-3 focus:ring-1 focus:ring-primary outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground">GitHub URL</label>
                                        <input
                                            value={formData.githubUrl}
                                            onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
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

                                <div className="flex justify-end gap-3 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-muted rounded-lg transition-colors">Cancel</button>
                                    <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all">
                                        {currentItem ? "Save Changes" : "Create Project"}
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
                title="Delete Project"
                message="Are you sure you want to move this project to the trash? This action can be undone by an admin later."
                confirmText="Move to Trash"
                isDestructive={true}
            />
        </div>
    );
};

export default ProjectsManager;
