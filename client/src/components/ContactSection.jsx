import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    setIsSubmitting(true);
    const formData = new FormData(event.target);

    formData.append("access_key", "d48c3944-1f2d-4f0b-abad-b455b71d2f93");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Submission error", error);
      setResult("Failed to send message.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="py-10 md:py-16 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Get In <span className="text-primary"> Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            <h3 className="text-2xl font-bold">Contact Information</h3>

            <div className="space-y-8">
              {[
                { icon: <Mail className="h-5 w-5" />, label: "Email", value: "sanchitmangle12345@gmail.com", href: "mailto:sanchitmangle12345@gmail.com" },
                { icon: <Phone className="h-5 w-5" />, label: "Phone", value: "+91 93732 81498", href: "tel:+919373281498" },
                { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Akola, Maharashtra, India", href: null }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1"> {item.label}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5">
              <h4 className="font-medium mb-6"> Connect With Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <Linkedin size={20} className="text-current" />, href: "https://www.linkedin.com/in/sanchit-mangle-78044222b" },
                  { icon: <Twitter size={20} className="text-current" />, href: "https://x.com/SanchitMangle" },
                  { icon: <Instagram size={20} className="text-current" />, href: "https://www.instagram.com/sanchit__17?igsh=MTJwODUyNGRidTUyMA==&utm_source" },
                  { icon: <Twitch size={20} className="text-current" />, href: "#" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 border border-border/50 hover:border-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8 md:p-10 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-8"> Send a Message</h3>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/30"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Your Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/30"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Your Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none placeholder:text-muted-foreground/30"
                  placeholder="Hello, I'd like to collaborate..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-300 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primary/25",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
              {result && <p className="mt-4 text-center text-sm text-muted-foreground animate-fade-in">{result}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};