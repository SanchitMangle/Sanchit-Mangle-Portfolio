import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "QuickGpt AI-Chatbot",
    description: "An AI Chatbot using MERN-Stack where we can generate images and ask questions to the AI assistant",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS","Node.js", "Express","MongoDB",],
    demoUrl: "https://ai-chat-bot-omega-beige.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/AI-ChatBot",
  },
  {
    id: 2,
    title: " QuickBlog - AI Powered Blogging Platform",
    description:
      "A full-stack Blogging Platform built using MongoDB, Express, React, and Node.js (MERN Stack)QuickBlog allows users to explore, read, and interact with blogs, while Admins can publish, manage, and moderate blogs. This project also integrates AI (Google Gemini) to generate blog content automatically.",
    image: "/projects/project2.png",
    tags: ["React", "TailwindCSS","Node.js", "Express","MongoDB",],
    demoUrl: "https://quick-blog-frontend-three.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/QuickBlog",
  },
  {
    id: 3,
    title: "A Full-Stack Job Portal App",
    description:
      "Full-featured job application app where user can apply a to various jobs and the recruiter can post jobs and accept or reject applications.",
    image: "/projects/project3.png",
    tags: ["React", "TailwindCSS","Node.js", "Express","MongoDB",],
    demoUrl: "https://job-portal-web-application-client-two.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/Job-Portal-Web-Application",
  },
  {
    id: 4,
    title: "A Full-Stac LMS Website",
    description:
      "Full-featured Learning Management System wherre students can enroll using payment gatawys to various courses and watch lectures and educater can add courses from dashboarsd ",
    image: "/projects/project4.png",
    tags: ["React", "TailwindCSS","Node.js", "Express","MongoDB",],
    demoUrl: "https://lms-web-frontend.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/LMS_Web",
  },
  {
    id: 5,
    title: "A Real time chat application",
    description:
      "A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO for instant messaging between users Messages are delivered instantly without page reloads, providing a smooth real-time communication experience.",
    image: "/projects/project5.png",
    tags: ["React", "TailwindCSS","Node.js", "Express","MongoDB",],
    demoUrl: "https://job-portal-web-application-client-two.vercel.app/",
    githubUrl: "https://github.com/SanchitMangle/Chat-App",
  },
  {
    id: 6,
    title: "Full-Stack E-Commerce Website",
    description:
      "An end-to-end online shopping platform with authentication, cart functionality, payment integration, and order tracking — built using the MERN stack.",
    image: "/projects/project6.png",
    tags: ["React", "TailwindCSS","Node.js", "Express","MongoDB",],
    demoUrl: "https://e-commerce-web-frontend-rdej.onrender.com/",
    githubUrl: "https://github.com/SanchitMangle/E-Commerce-Web",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/SanchitMangle"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};