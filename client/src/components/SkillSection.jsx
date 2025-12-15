import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Globe, Database, PenTool, Layout, Server, Terminal, Code } from "lucide-react";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend", icon: Layout },
  { name: "JavaScript", level: 90, category: "frontend", icon: Code },
  { name: "React", level: 90, category: "frontend", icon: Globe },
  { name: "TypeScript", level: 85, category: "frontend", icon: Code },
  { name: "Tailwind CSS", level: 80, category: "frontend", icon: Layout },
  { name: "Next.js", level: 70, category: "frontend", icon: Globe },

  // Backend
  { name: "Node.js", level: 80, category: "backend", icon: Server },
  { name: "Express", level: 90, category: "backend", icon: Server },
  { name: "MongoDB", level: 85, category: "backend", icon: Database },
  { name: "SQL", level: 70, category: "backend", icon: Database },
  { name: "MySQL", level: 70, category: "backend", icon: Database },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools", icon: Terminal },
  { name: "Docker", level: 70, category: "tools", icon: Cpu },
  { name: "Figma", level: 85, category: "tools", icon: PenTool },
  { name: "VS Code", level: 95, category: "tools", icon: Code },
  { name: "Postman", level: 95, category: "tools", icon: Terminal },
];

const categories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools & DevOps" },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-16 px-6 relative bg-background overflow-hidden">
      {/* Background Decor */}
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-widest text-primary uppercase mb-3 block">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            My Technical <span className="text-gradient">Arsenal</span>
          </h2>

          <div className="flex-wrap justify-center gap-2 p-1.5 glass rounded-full inline-flex">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative z-10",
                  activeCategory === cat.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg shadow-primary/25"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${skill.category}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative h-40 rounded-2xl p-6 glass-card hover:bg-white/[0.05] transition-colors overflow-hidden"
              >
                {/* Icon Background Element */}
                {skill.icon && <skill.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors rotate-12" />}

                <div className="flex flex-col h-full justify-between relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {skill.icon && <skill.icon size={20} />}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      {skill.level}%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
