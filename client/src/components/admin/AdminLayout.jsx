import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Layers,
    Code,
    History,
    LogOut,
    Menu,
    X,
    User,
    ShieldAlert
} from "lucide-react";
import { cn } from "../../lib/utils";

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
    <Link
        to={path}
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            active
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
        )}
    >
        <Icon size={20} className={cn("transition-transform group-hover:scale-110", active && "scale-110")} />
        <span className="font-medium">{label}</span>
        {active && (
            <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
        )}
    </Link>
);

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/admin/login");
    };

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/admin/dashboard" },
        { icon: Layers, label: "Projects", path: "/admin/projects" },
        { icon: Code, label: "Skills", path: "/admin/skills" },
        { icon: History, label: "Experience", path: "/admin/timeline" },
        { icon: ShieldAlert, label: "Audit Logs", path: "/admin/audit-logs" },
    ];

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar - Desktop */}
            <motion.aside
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                className="hidden md:flex flex-col w-64 border-r border-border/40 bg-card/30 backdrop-blur-xl h-screen sticky top-0"
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                            <User size={18} />
                        </span>
                        Admin Panel
                    </h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            {...item}
                            active={location.pathname === item.path}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-border/40 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                    >
                        <User size={20} />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 relative h-screen overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-[120px] pointer-events-none -z-10" />

                {/* Scroll Isolation Container */}
                <div className="absolute inset-0 p-8 flex flex-col min-h-0 overflow-hidden">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
