"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiLaravel,
    SiPhp,
    SiTypescript,
    SiMysql,
    SiMongodb,
    SiDocker,
    SiLinux,
    SiTailwindcss,
    SiGit,
} from "react-icons/si";

export default function Skills() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skills = [
        { name: "React", icon: SiReact, color: "#61DAFB", level: 90 },
        { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 85 },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 88 },
        { name: "Laravel", icon: SiLaravel, color: "#FF2D20", level: 82 },
        { name: "PHP", icon: SiPhp, color: "#777BB4", level: 80 },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85 },
        { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 87 },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 83 },
        { name: "Docker", icon: SiDocker, color: "#2496ED", level: 75 },
        { name: "Linux", icon: SiLinux, color: "#FCC624", level: 78 },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", level: 92 },
        { name: "Git", icon: SiGit, color: "#F05032", level: 88 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section id="skills" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Technical{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                            Skills
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                        Here are the technologies I work with regularly. I'm always excited
                        to learn new tools and frameworks.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                        >
                            <div className="flex flex-col items-center">
                                <skill.icon
                                    className="w-12 h-12 mb-4 transition-transform group-hover:scale-110"
                                    style={{ color: skill.color }}
                                />
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {skill.name}
                                </h3>
                                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={inView ? { width: `${skill.level}%` } : {}}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-400">{skill.level}%</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}