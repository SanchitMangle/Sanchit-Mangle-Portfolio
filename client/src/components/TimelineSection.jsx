import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const experienceData = [
    {
        id: 1,
        type: "experience",
        title: "Full Stack Developer Intern",
        organization: "Axiomen Tech Solution",
        period: "Sep. 2025 - Present",
        location: "Chhatrapati Sambhajinagar, India",
        description: [
            "Developed and deployed scalable web applications using MERN stack (MongoDB, Express.js, React.js, Node.js)",
            "Engineered responsive front-end components with React.js and optimized back-end services with Node.js and Express.js",
            "Designed and integrated RESTful APIs and managed database systems including MongoDB",
            "Collaborated with development team to enhance UI/UX performance and API integration",
            "Practiced Agile methodologies and used Git/GitHub for version control in collaborative environment",
        ],
    },
    {
        id: 2,
        type: "education",
        title: "Full Stack Web Development Certificate",
        organization: "Certification",
        period: "August 2025",
        location: "",
        description: [],
    },
    {
        id: 3,
        type: "education",
        title: "Bachelor of Technology in Electronics and Telecommunication Engineering",
        organization: "Government College of Engineering",
        period: "Dec. 2021 - Jun. 2025",
        location: "Yavatmal, India",
        description: [
            "CGPA: 6.56/10.00",
        ],
    },
];

const TimelineCard = ({ item, index }) => {
    const isLeft = index % 2 === 0;

    return (
        <div className={`relative flex items-center justify-between md:justify-normal w-full mb-8 z-10 ${isLeft ? "md:flex-row-reverse" : ""}`}>
            {/* Timestamp / Date - Desktop Only */}
            <div className="hidden md:block w-5/12 text-center md:text-right px-4">
                {isLeft ? (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                        className="text-right"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors">
                            <Calendar size={12} className="text-secondary" />
                            <span className="text-secondary font-medium text-xs tracking-wide uppercase">{item.period}</span>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-left w-full"></div>
                )}
            </div>

            {/* Central Node */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="relative flex items-center justify-center"
                >
                    <div className={cn(
                        "w-4 h-4 rounded-full relative z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)] border-2 border-background",
                        item.type === 'experience' ? "bg-primary shadow-primary/50" : "bg-purple-500 shadow-purple-500/50"
                    )} />
                    <div className={cn(
                        "absolute w-8 h-8 rounded-full animate-pulse",
                        item.type === 'experience' ? "bg-primary/20" : "bg-purple-500/20"
                    )} />
                </motion.div>
            </div>

            {/* Card Content */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={cn(
                    "w-full ml-12 md:ml-0 md:w-5/12 glass-card p-6 md:p-8 rounded-2xl relative group hover:-translate-y-1 transition-transform duration-300 border border-white/5 hover:border-primary/20 bg-card/40 hover:bg-card/60",
                    isLeft ? "md:mr-auto" : "md:ml-auto"
                )}
            >
                {/* Connector Line */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-border to-transparent ${isLeft ? "-right-8 rotate-180" : "-left-8"}`} />

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col mb-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                            <span className="md:hidden text-xs font-semibold text-primary px-2 py-1 bg-primary/10 rounded-full">{item.period}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground/80 mt-1 flex items-center gap-2">
                            {item.type === 'experience' ? <Briefcase size={14} className="text-primary" /> : <GraduationCap size={14} className="text-purple-500" />}
                            {item.organization}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <MapPin size={12} className="text-primary/60" />
                        {item.location || "Remote"}
                    </div>

                    <ul className="space-y-3">
                        {item.description.map((point, i) => (
                            <li key={i} className="text-sm text-muted-foreground/90 flex items-start gap-3 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0 group-hover:bg-primary transition-colors" />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* Date Right Side */}
            <div className="hidden md:block w-5/12 text-left px-4">
                {!isLeft && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-colors">
                            <Calendar size={12} className="text-secondary" />
                            <span className="text-secondary font-medium text-xs tracking-wide uppercase">{item.period}</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export const TimelineSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" className="py-24 md:py-32 relative overflow-hidden bg-background">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-3 block">My Path</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                        Education & <span className="text-gradient-primary">Experience</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-primary/20 mx-auto rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>

                <div ref={containerRef} className="relative">
                    {/* Vertical Line Gradient */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-0 h-full">
                        <motion.div
                            style={{ height }}
                            className="w-full bg-gradient-to-b from-primary via-purple-500 to-primary/50 origin-top shadow-[0_0_15px_rgba(var(--primary),0.6)]"
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-8 md:space-y-16 py-10">
                        {experienceData.map((item, index) => (
                            <TimelineCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
