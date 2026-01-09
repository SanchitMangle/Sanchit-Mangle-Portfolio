import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Search, RotateCcw, Activity } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const AuditLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { toast } = useToast();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/audit-logs");
            setLogs(data);
        } catch (error) {
            toast({ title: "Error", description: "Failed to fetch audit logs", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    // Filter & Pagination Logic
    const filteredLogs = logs.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.user && log.user.email && log.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="h-full flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex-none space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
                        <p className="text-muted-foreground">Track system activity and changes</p>
                    </div>
                    <button
                        onClick={fetchLogs}
                        className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                        <RotateCcw size={18} /> Refresh
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search logs by action, resource, or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                    />
                </div>
            </div>

            {/* Table View */}
            <div className="flex-1 bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm flex flex-col min-h-0">
                <div className="flex-1 overflow-auto scrollbar-hide">
                    <table className="w-full text-left text-sm relative">
                        <thead className="bg-muted border-b border-border/50 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 font-medium text-muted-foreground w-40 bg-muted/50">Timestamp</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground w-32 bg-muted/50">Action</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground w-32 bg-muted/50">Resource</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground bg-muted/50">User</th>
                                <th className="px-6 py-4 font-medium text-muted-foreground bg-muted/50">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {loading ? (
                                <tr><td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">Loading logs...</td></tr>
                            ) : paginatedLogs.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">No logs found.</td></tr>
                            ) : (
                                paginatedLogs.map((log) => (
                                    <tr key={log._id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                            {format(new Date(log.createdAt), "MMM d, yyyy HH:mm")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border ${log.action === 'CREATE' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                    log.action === 'UPDATE' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        log.action === 'DELETE' || log.action === 'SOFT_DELETE' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                            'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                                }`}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{log.resource}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {log.user ? log.user.email : "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-muted-foreground font-mono max-w-xs truncate">
                                            {JSON.stringify(log.details)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex-none flex items-center justify-between px-6 py-4 border-t border-border/50 bg-card z-10">
                        <span className="text-xs text-muted-foreground">Page {currentPage} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-xs rounded-md bg-secondary hover:bg-secondary/80 disabled:opacity-50 transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-xs rounded-md bg-secondary hover:bg-secondary/80 disabled:opacity-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuditLogs;
