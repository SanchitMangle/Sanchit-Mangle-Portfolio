import { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";
import { Layers, Code, History } from "lucide-react";

const StatCard = ({ label, value, icon: Icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="p-6 rounded-2xl glass-card border border-white/5 bg-card/40 hover:bg-card/60 transition-colors"
    >
        <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Icon size={24} />
            </div>
        </div>
        <div className="space-y-1">
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({ projects: 0, skills: 0, timeline: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projectsRes, skillsRes, timelineRes] = await Promise.all([
                    api.get("/projects"),
                    api.get("/skills"),
                    api.get("/timeline"),
                ]);
                setStats({
                    projects: projectsRes.data.length,
                    skills: skillsRes.data.length,
                    timeline: timelineRes.data.length,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="h-full flex flex-col gap-8">
            <div className="flex-none">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">Welcome back to your portfolio management center.</p>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 pr-2 space-y-8 pb-8 scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="Total Projects"
                        value={loading ? "-" : stats.projects}
                        icon={Layers}
                        delay={0.1}
                    />
                    <StatCard
                        label="Total Skills"
                        value={loading ? "-" : stats.skills}
                        icon={Code}
                        delay={0.2}
                    />
                    <StatCard
                        label="Timeline Entries"
                        value={loading ? "-" : stats.timeline}
                        icon={History}
                        delay={0.3}
                    />
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-card/30">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground">Select a category from the sidebar to manage your content.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
