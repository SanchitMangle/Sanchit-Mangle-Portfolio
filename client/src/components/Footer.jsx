import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative py-12 bg-background border-t border-white/5 overflow-hidden text-foreground">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand / Name */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Sanchit<span className="text-primary font-light">Mangle</span>
            </span>
            <p className="text-sm text-muted-foreground/60 text-center md:text-left">
              Building digital experiences that matter.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/SanchitMangle" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/sanchit-mangle-78044222b" },
              { icon: Mail, href: "mailto:sanchitmangle12345@gmail.com" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300 text-muted-foreground"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright & Action */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-xs text-muted-foreground/40 order-2 md:order-1">
              &copy; {new Date().getFullYear()} Sanchit Mangle. All rights reserved.
            </p>

            <MagneticButton>
              <button
                onClick={scrollToTop}
                className="order-1 md:order-2 p-3 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300 group cursor-pointer"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
};