import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export const Background = () => {
    const { scrollY } = useScroll();

    // Performance optimization: Use MotionValues instead of State to avoid re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Smooth scroll parallax
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    const springConfig = { stiffness: 50, damping: 20, mass: 1 };
    const y1Spring = useSpring(y1, springConfig);
    const y2Spring = useSpring(y2, springConfig);

    // Mouse parallax for subtle interactivity
    const mouseXSpring = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig);
    const mouseYSpring = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), springConfig);

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
            {/* Deep Obsidian Base */}
            <div className="absolute inset-0 bg-background transition-colors duration-300" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
            />

            {/* Primary Gradient Orb (Top Left) */}
            <motion.div
                style={{ y: y1Spring, x: mouseXSpring }}
                animate={{
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[100px] mix-blend-screen"
            />

            {/* Secondary Violet Orb (Bottom Right) */}
            <motion.div
                style={{ y: y2Spring, x: mouseYSpring }}
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary/15 blur-[120px] mix-blend-screen"
            />

            {/* Accent Orb (Center-ish) */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-indigo-500/10 blur-[90px] mix-blend-screen"
            />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.2] bg-[url('/noise.png')] mix-blend-overlay" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,var(--color-background)_100%)]" />
        </div>
    );
};
