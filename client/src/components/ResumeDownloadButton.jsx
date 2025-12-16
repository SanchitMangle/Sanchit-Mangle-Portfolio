import { motion } from "framer-motion";
import { FileText, Download, Check } from "lucide-react";
import { useState } from "react";
import { MagneticButton } from "./ui/MagneticButton";

export const ResumeDownloadButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleDownload = () => {
        setIsDownloaded(true);
        setTimeout(() => setIsDownloaded(false), 2000);
    };

    return (
        <MagneticButton>
            <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownload}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative inline-flex h-14 w-48 items-center justify-center overflow-hidden rounded-full border border-input dark:border-white/10 bg-background/50 dark:bg-white/5 backdrop-blur-sm px-8 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="relative z-10 flex items-center gap-2">
                    <span className="relative">
                        <motion.div
                            animate={{
                                y: isHovered ? -20 : 0,
                                opacity: isHovered ? 0 : 1
                            }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2"
                        >
                            Resume <FileText size={18} />
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{
                                y: isHovered ? 0 : 20,
                                opacity: isHovered ? 1 : 0
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            {isDownloaded ? (
                                <>Downloaded <Check size={18} className="text-green-500" /></>
                            ) : (
                                <>Download PDF <Download size={18} className="animate-bounce" /></>
                            )}
                        </motion.div>
                    </span>
                </span>
            </a>
        </MagneticButton>
    );
};
