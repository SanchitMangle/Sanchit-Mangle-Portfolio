import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "./ui/MagneticButton";
import { ResumeDownloadButton } from "./ResumeDownloadButton";


export const HeroSection = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-50" />

            <div className="container max-w-5xl mx-auto z-10 grid lg:grid-cols-1 gap-12 text-center">
                <div className="space-y-4 md:space-y-8 flex flex-col items-center">

                    {/* Badge / Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-semibold tracking-wider text-primary uppercase">Available for work</span>
                    </motion.div>

                    {/* Main Heading */}
                    <div className="space-y-2">
                        <motion.h1
                            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground leading-[0.9]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        >
                            Sanchit
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-secondary pb-4">
                                Mangle
                            </span>
                        </motion.h1>
                    </div>

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        I create modern web solutions using the latest technologies. With a focus on full-stack development, I build interfaces that are both <span className="text-foreground font-medium">elegant</span> and <span className="text-foreground font-medium">functional</span>.
                    </motion.p>

                    {/* Socials - Reintroduced for quick access */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-4 pt-4"
                    >
                        {[
                            { icon: Github, href: "https://github.com/SanchitMangle" }, // Assumption: user will update links
                            { icon: Linkedin, href: "https://www.linkedin.com/in/sanchit-mangle-78044222b" },
                            { icon: Mail, href: "mailto:sanchitmangle12345@gmail.com" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 hover:border-primary/50 transition-all hover:scale-110 text-muted-foreground hover:text-primary"
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        className="pt-8 pb-12 flex flex-col sm:flex-row items-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <MagneticButton>
                            <a
                                href="#projects"
                                className="group relative inline-flex h-14 w-48 items-center justify-center overflow-hidden rounded-full bg-primary font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    View My Work <ArrowDown size={18} className="-rotate-90 group-hover:rotate-0 transition-transform duration-300" />
                                </span>
                            </a>
                        </MagneticButton>
                        <ResumeDownloadButton />
                        <MagneticButton>
                            <a
                                href="#contact"
                                className="inline-flex h-14 w-48 items-center justify-center rounded-full border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
                            >
                                Contact Me
                            </a>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                whileHover={{ scale: 1.1, y: -5 }}
            >
                <motion.div
                    className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary to-transparent"
                    animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">Scroll</span>
            </motion.div>
        </section>
    );
};
