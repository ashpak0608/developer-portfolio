"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, Code2 } from "lucide-react";
import Image from "next/image";

export default function Projects() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const projects = [
        {
            name: "Amazon Clone",
            description: "A full-featured e-commerce platform with real payments, user authentication, and product management.",
            tech: ["React", "Node.js", "MySQL", "Stripe"],
            github: "https://github.com/ashpak0608/amazon",
            live: "https://amazon-clone-demo.com",
            image: "/projects/amazon.jpg",
            color: "from-yellow-500 to-orange-500",
        },
        {
            name: "Jarvis AI",
            description: "An AI assistant inspired by Iron Man's Jarvis, featuring voice recognition, task automation, and smart home integration.",
            tech: ["Python", "TensorFlow", "MySQL", "WebSocket"],
            github: "https://github.com/ashpak0608/jarvis-ai",
            live: "https://jarvis-ai-demo.com",
            image: "/projects/jarvis.jpg",
            color: "from-blue-500 to-cyan-500",
        },
        {
            name: "Doctor Management",
            description: "A comprehensive healthcare management system for doctors to manage patients, appointments, and medical records.",
            tech: ["Node.js", "React", "MongoDB", "Socket.io"],
            github: "https://github.com/ashpak0608/doctor_management",
            live: "https://doctor-management-demo.com",
            image: "/projects/doctor.jpg",
            color: "from-green-500 to-emerald-500",
        },
        {
            name: "TaskFlow",
            description: "A collaborative project management tool with real-time updates, task assignments, and progress tracking.",
            tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
            github: "https://github.com/ashpak0608/taskflow",
            live: "https://taskflow-demo.com",
            image: "/projects/taskflow.jpg",
            color: "from-purple-500 to-pink-500",
        },
    ];

    return (
        <section id="projects" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                            Projects
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                        Here are some of my recent projects. Each one is built with
                        attention to detail and a focus on user experience.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                        >
                            {/* Project Image Placeholder */}
                            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Code2 className="w-16 h-16 text-white/20" />
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {project.name}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Github size={20} />
                                        <span>Code</span>
                                    </motion.a>
                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <ExternalLink size={20} />
                                        <span>Live Demo</span>
                                    </motion.a>
                                </div>
                            </div>

                            {/* Hover Effect Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:via-purple-600/5 group-hover:to-pink-600/10 transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}