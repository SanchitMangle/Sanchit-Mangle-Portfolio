import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            {" "}
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary"> Me</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">
                            Passionate Full Stack Developer & Software Enthusiast
                        </h3>

                        <p className="text-muted-foreground">
                            I am a recent Electronics and Telecommunication Engineering graduate with a strong focus on Full Stack Development and Software Development. Skilled in the MERN stack (MongoDB, Express, React, Node.js), I enjoy building dynamic, user-friendly, and scalable web applications. Alongside my knowledge of Data Structures & Algorithms in C++, I bring problem-solving ability and logical thinking to every project I work on.
                        </p>

                        <p className="text-muted-foreground">
                            I’m passionate about creating end-to-end solutions that solve real-world problems, and I’m constantly exploring new technologies to stay at the forefront of modern development practices.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a href="#contact" className="cosmic-button">
                                {" "}
                                Get In Touch
                            </a>

                            <a
                                href="/myresume.pdf"  target="_blank"
                                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                            >
                                Download CV
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Full Stack Development</h4>
                                    <p className="text-muted-foreground">
                                        Building complete web applications with front-end (React, Tailwind CSS) and back-end (Node.js, Express, MongoDB) technologies, ensuring scalability and performance.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Problem Solving & DSA</h4>
                                    <p className="text-muted-foreground">
                                        Strong foundation in Data Structures & Algorithms (C++), applying logical and analytical thinking to design efficient solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>

                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Software Development</h4>
                                    <p className="text-muted-foreground">
                                        Designing and developing robust, maintainable software applications, focusing on clean code practices and real-world impact.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>

                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Version Control & Deployment</h4>
                                    <p className="text-muted-foreground">
                                        Managing projects with Git/GitHub, and deploying applications on platforms like Vercel, Netlify, and Render for real-world usability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};