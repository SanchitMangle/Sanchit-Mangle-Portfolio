import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Save, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileManager = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resumeUrl, setResumeUrl] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/profile");
                setProfile(data);
                setResumeUrl(data.resumeUrl);
            } catch (error) {
                toast({ title: "Error", description: "Failed to fetch profile", variant: "destructive" });
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put("/profile", { resumeUrl });
            setProfile(data);
            toast({ title: "Success", description: "Profile updated" });
        } catch (error) {
            toast({ title: "Error", description: "Update failed", variant: "destructive" });
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="h-full flex flex-col gap-8">
            <div className="flex-none">
                <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your resume and view your profile information.</p>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 pr-2 scrollbar-hide">
                <div className="max-w-4xl space-y-8 pb-8">
                    {/* Resume Section - Editable */}
                    <div className="p-6 rounded-xl bg-card border border-white/5 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Resume Configuration</h2>
                        <form onSubmit={handleSave} className="flex gap-4 items-end">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium">Resume File URL</label>
                                <input
                                    value={resumeUrl}
                                    onChange={(e) => setResumeUrl(e.target.value)}
                                    className="w-full bg-background border border-input rounded-lg p-3"
                                    placeholder="/resume.pdf or https://example.com/resume.pdf"
                                />
                                <p className="text-xs text-muted-foreground">Path to the resume file directly in the public folder or an external URL.</p>
                            </div>
                            <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg flex items-center gap-2 font-medium hover:bg-primary/90 transition-colors">
                                <Save size={18} /> Save Changes
                            </button>
                        </form>
                    </div>

                    {/* Profile Info - Read Only */}
                    <div className="p-6 rounded-xl bg-muted/30 border border-white/5">
                        <div className="flex items-center gap-2 mb-6">
                            <AlertCircle size={20} className="text-orange-500" />
                            <h2 className="text-xl font-semibold">Profile Information (Read-Only)</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground block mb-2">Headline</label>
                                <div className="p-3 rounded-lg bg-background border border-input text-foreground">{profile?.aboutTitle}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground block mb-2">Bio</label>
                                <div className="space-y-2">
                                    {profile?.aboutBio?.map((p, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-background border border-input text-foreground text-sm leading-relaxed">{p}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground block mb-2">Years Exp.</label>
                                    <div className="p-3 rounded-lg bg-background border border-input text-foreground">{profile?.stats?.yearsExperience}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground block mb-2">Projects</label>
                                    <div className="p-3 rounded-lg bg-background border border-input text-foreground">{profile?.stats?.projects}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground block mb-2">Clients</label>
                                    <div className="p-3 rounded-lg bg-background border border-input text-foreground">{profile?.stats?.clients}</div>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 italic">
                            * To modify this information, please contact the system administrator (developer) directly as per security policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileManager;
