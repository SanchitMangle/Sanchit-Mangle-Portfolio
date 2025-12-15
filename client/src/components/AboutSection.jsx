import { motion } from "framer-motion";
import { User, Code2, Globe, Sparkles } from "lucide-react";

export const AboutSection = () => {
    return (
        <section id="about" className="relative py-16 px-6 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10" />

            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">Who I Am</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                        Passionate about <span className="text-gradient">building the future</span>
                    </h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
                    {/* Main Bio Card */}
                    <div className="lg:col-span-8 glass-card p-8 md:p-10 rounded-3xl relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <User className="text-primary" /> About Me
                        </h3>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                            <p>
                                I am a dedicated full-stack developer with a deep passion for creating intuitive and dynamic user experiences. My journey in tech is driven by a curiosity to understand how things work and a desire to build solutions that make a difference.
                            </p>
                            <p>
                                With expertise in modern web technologies, I specialize in transforming complex problems into elegant, efficient code. I believe in the power of clean design and robust engineering working in harmony.
                            </p>
                        </div>
                    </div>

                    {/* Stats / Highlight Cards (Bento Style) */}
                    <div className="lg:col-span-4 grid grid-cols-1 gap-6">
                        <div className="glass-card p-6 rounded-3xl flex flex-col justify-center items-center text-center group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                                <Code2 size={24} />
                            </div>
                            <h4 className="text-xl font-bold mb-1">Full Stack</h4>
                            <p className="text-sm text-muted-foreground">MERN & Modern Web</p>
                        </div>

                        <div className="glass-card p-6 rounded-3xl flex flex-col justify-center items-center text-center group">
                            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 text-secondary group-hover:scale-110 transition-transform">
                                <Sparkles size={24} />
                            </div>
                            <h4 className="text-xl font-bold mb-1">UI/UX Design</h4>
                            <p className="text-sm text-muted-foreground">Clean & Accessible</p>
                        </div>
                    </div>

                    {/* Wide Highlight Card */}
                    <div className="lg:col-span-12 glass-card p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-primary/10 to-transparent">
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-3">
                                <Globe className="text-primary" /> global mindset
                            </h3>
                            <p className="text-muted-foreground">
                                I code with a global perspective, ensuring accessibility, performance, and scalability are at the core of every project. I am always open to new challenges and collaborations.
                            </p>
                        </div>
                        {/* Optional: Add a subtle visual or tech stack icons here later */}
                    </div>
                </div>
            </div>
        </section>
    );
};
