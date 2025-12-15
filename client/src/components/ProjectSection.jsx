import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "QuickGpt AI-Chatbot",
    description: "An AI Chatbot using MERN-Stack where we can generate images and ask questions to the AI assistant.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://ai-chat-bot-omega-beige.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/AI-ChatBot",
  },
  {
    id: 2,
    title: "QuickBlog - AI Powered Blogging Platform",
    description: "A full-stack Blogging Platform built using MERN Stack. QuickBlog allows users to explore, read, and interact with blogs, while Admins can publish and manage content with AI-powered generation.",
    image: "/projects/project2.png",
    tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://quick-blog-frontend-three.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/QuickBlog",
  },
  {
    id: 3,
    title: "Full-Stack Job Portal App",
    description: "Full-featured job application app where users can apply to various jobs and recruiters can post jobs and manage applications.",
    image: "/projects/project3.png",
    tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://job-portal-web-application-client-two.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/Job-Portal-Web-Application",
  },
  {
    id: 4,
    title: "Full-Stack LMS Website",
    description: "Full-featured Learning Management System where students can enroll using payment gateways and educators can add courses from dashboard.",
    image: "/projects/project4.png",
    tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://lms-web-frontend.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/LMS_Web",
  },
  {
    id: 5,
    title: "Real-time Chat Application",
    description: "A real-time chat application built with MERN stack and Socket.IO for instant messaging. Messages delivered instantly without page reloads.",
    image: "/projects/project5.png",
    tags: ["React", "TailwindCSS", "Node.js", "Express", "Socket.IO"],
    demoUrl: "https://job-portal-web-application-client-two.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/Chat-App",
  },
  {
    id: 6,
    title: "Full-Stack E-Commerce Website",
    description: "An end-to-end online shopping platform with authentication, cart functionality, payment integration, and order tracking.",
    image: "/projects/project6.png",
    tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://e-commerce-web-frontend-rdej.onrender.com/",
    githubUrl: "https://github.com/SanchitMangle/E-Commerce-Web",
  },
];

const ProjectCard = ({ project, index }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse tracking for spotlight effect
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1], // Custom easing for premium feel
      }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col h-full rounded-[20px] overflow-hidden",
        "bg-white/5 dark:bg-card/40 backdrop-blur-xl",
        "border border-white/20 dark:border-white/10",
        "transition-all duration-500 will-change-transform",
        "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]",
        !prefersReducedMotion && "hover:-translate-y-2"
      )}
    >
      {/* Spotlight Effect Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Image Section */}
      <div className="relative h-60 w-full overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-[1] opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover object-top",
            "transition-transform duration-700 ease-out will-change-transform",
            !prefersReducedMotion && "group-hover:scale-105"
          )}
        />

        {/* Floating Action Button on Image */}
        <div className="absolute top-4 right-4 z-20 translate-x-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-white/95 text-slate-900 shadow-sm border border-slate-200/50",
              "dark:bg-black/80 dark:text-white dark:border-white/10",
              "backdrop-blur-md text-xs font-semibold",
              "transition-all duration-300 hover:scale-105",
              "hover:bg-primary hover:text-white hover:border-primary",
            )}
            title="View Live Demo"
          >
            <span>Live Preview</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 sm:p-7 z-20">
        <div className="mb-4">
          {/* Title */}
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 group-hover:to-primary transition-all duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mt-auto mb-6">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className={cn(
                "px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-md",
                "bg-primary/5 text-primary/90 border border-primary/10",
                "transition-colors duration-300 group-hover:bg-primary/10 group-hover:border-primary/20"
              )}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-1 text-[11px] font-medium tracking-wide rounded-md bg-muted text-muted-foreground">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-4 mt-auto border-t border-border/50">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
              "bg-muted/50 hover:bg-muted text-sm font-medium transition-colors",
              "text-muted-foreground hover:text-foreground"
            )}
          >
            <Github size={16} />
            <span>Code</span>
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
              "bg-primary/10 hover:bg-primary/20 text-sm font-medium transition-colors",
              "text-primary"
            )}
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Layers size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
          >
            My Recent <span className="text-primary">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            A curated selection of my best work, exploring modern web technologies, AI integrations, and responsive design systems.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 md:mt-28 flex justify-center"
        >
          <a
            href="https://github.com/SanchitMangle"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative inline-flex items-center gap-2",
              "px-8 py-4 rounded-full text-base font-semibold",
              "bg-foreground text-background dark:bg-primary dark:text-primary-foreground",
              "transition-all duration-300 hover:shadow-xl hover:shadow-primary/20",
              "hover:-translate-y-1"
            )}
          >
            <Github size={20} />
            <span>View Complete Portfolio</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};