import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

export const Background = () => {
    const { scrollY } = useScroll();

    // Mouse position state
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

    // Parallax & Smooth Spring Config
    const springConfig = { stiffness: 50, damping: 20, mass: 1 };

    // Grid movement (opposing directions for depth)
    const gridY = useSpring(useTransform(scrollY, [0, 5000], [0, -500]), springConfig);
    const secondaryGridY = useSpring(useTransform(scrollY, [0, 5000], [0, -200]), springConfig);

    // Mouse Parallax for Orbs
    const mouseXSpring = useSpring(useTransform(mouseX, [0, window.innerWidth], [-50, 50]), springConfig);
    const mouseYSpring = useSpring(useTransform(mouseY, [0, window.innerHeight], [-50, 50]), springConfig);

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-background">

            {/* Layer 1: Base Grid (Perspective Mesh) */}
            <motion.div
                style={{ y: secondaryGridY }}
                className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]"
            />

            {/* Layer 2: Primary Grid (Finer detail) */}
            <motion.div
                style={{ y: gridY }}
                className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"
            />

            {/* Layer 3: Ambient Coloured Orbs (Breathing) */}
            <motion.div
                style={{ x: mouseXSpring, y: mouseYSpring }}
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen"
            />

            <motion.div
                style={{ x: useTransform(mouseXSpring, v => -v), y: useTransform(mouseYSpring, v => -v) }}
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[120px] mix-blend-screen"
            />

            {/* Layer 4: Accent Light (Mouse Follower) */}
            <motion.div
                role="presentation"
                style={{
                    x: mouseX,
                    y: mouseY,
                    opacity: useSpring(useTransform(mouseX, [0, 1], [0, 1]), springConfig) // simple fade in logic if needed, but sticking to constant for now
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen hidden md:block"
            />

            {/* Layer 5: Noise & Vignette Overlay */}
            <div className="absolute inset-0 opacity-[0.25] bg-[url('/noise.png')] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,var(--color-background)_90%)]" />
        </div>
    );
};
