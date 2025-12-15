import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedBackground = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const { scrollYProgress } = useScroll();

    // Scroll-responsive transformations
    const gradientPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const meshOpacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.08, 0.12, 0.08, 0.06]);
    const meshOpacity2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.06, 0.04, 0.08, 0.06]);
    const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.08, 0.05]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: -1 }}
        >
            {/* Layer 1: Deep Base Gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            linear-gradient(
              180deg,
              hsl(var(--background)) 0%,
              hsl(220, 35%, 4%) 40%,
              hsl(220, 30%, 3%) 70%,
              hsl(var(--background)) 100%
            )
          `,
                }}
            />

            {/* Layer 2: Gradient Mesh Top */}
            <motion.div
                className="absolute inset-0"
                style={{ opacity: meshOpacity1 }}
            >
                <div
                    className="absolute w-full h-full"
                    style={{
                        background: `
              radial-gradient(
                ellipse 90% 60% at 15% 20%,
                hsl(200, 100%, 50%) 0%,
                transparent 60%
              ),
              radial-gradient(
                ellipse 70% 50% at 85% 30%,
                hsl(280, 80%, 60%) 0%,
                transparent 60%
              )
            `,
                    }}
                />
            </motion.div>

            {/* Layer 3: Gradient Mesh Bottom */}
            <motion.div
                className="absolute inset-0"
                style={{ opacity: meshOpacity2 }}
            >
                <div
                    className="absolute w-full h-full"
                    style={{
                        background: `
              radial-gradient(
                ellipse 80% 50% at 70% 80%,
                hsl(260, 70%, 50%) 0%,
                transparent 55%
              ),
              radial-gradient(
                ellipse 60% 40% at 20% 75%,
                hsl(190, 85%, 45%) 0%,
                transparent 50%
              )
            `,
                    }}
                />
            </motion.div>

            {/* Layer 4: Floating Ambient Orbs */}
            {!prefersReducedMotion && (
                <>
                    {/* Primary Orb - Cyan */}
                    <motion.div
                        className="absolute w-[600px] h-[600px] rounded-full"
                        style={{
                            top: "10%",
                            left: "5%",
                            background:
                                "radial-gradient(circle, rgba(14, 165, 233, 0.08), transparent 65%)",
                            filter: "blur(70px)",
                            opacity: glowIntensity,
                        }}
                        animate={{
                            x: [0, 100, -50, 0],
                            y: [0, -60, 40, 0],
                            scale: [1, 1.15, 0.95, 1],
                        }}
                        transition={{
                            duration: 35,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Secondary Orb - Purple */}
                    <motion.div
                        className="absolute w-[550px] h-[550px] rounded-full"
                        style={{
                            bottom: "15%",
                            right: "8%",
                            background:
                                "radial-gradient(circle, rgba(139, 92, 246, 0.06), transparent 65%)",
                            filter: "blur(70px)",
                        }}
                        animate={{
                            x: [0, -80, 60, 0],
                            y: [0, 70, -40, 0],
                            scale: [1, 1.08, 1.12, 1],
                        }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Tertiary Orb - Accent */}
                    <motion.div
                        className="absolute w-[450px] h-[450px] rounded-full"
                        style={{
                            top: "55%",
                            left: "55%",
                            background:
                                "radial-gradient(circle, rgba(56, 189, 248, 0.05), transparent 65%)",
                            filter: "blur(60px)",
                        }}
                        animate={{
                            x: [0, 50, -70, 0],
                            y: [0, -90, 50, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{
                            duration: 38,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </>
            )}

            {/* Layer 5: Section-Aware Hero Glow */}
            <motion.div
                className="absolute top-0 left-1/2 w-[1000px] h-[600px] rounded-full"
                style={{
                    transform: "translateX(-50%)",
                    background:
                        "radial-gradient(ellipse, rgba(14, 165, 233, 0.1), transparent 70%)",
                    filter: "blur(100px)",
                    opacity: useTransform(scrollYProgress, [0, 0.2], [0.8, 0]),
                }}
            />

            {/* Layer 6: Subtle Grain Texture */}
            <div
                className="absolute inset-0 opacity-[0.018] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "256px 256px",
                }}
            />

            {/* Layer 7: Edge Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(
              ellipse 120% 100% at center,
              transparent 0%,
              hsl(var(--background) / 0.2) 80%,
              hsl(var(--background) / 0.5) 100%
            )
          `,
                }}
            />

            {/* Layer 8: Subtle Scanlines (ultra-minimal) */}
            <div
                className="absolute inset-0 opacity-[0.01]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          )`,
                }}
            />
        </div>
    );
};
