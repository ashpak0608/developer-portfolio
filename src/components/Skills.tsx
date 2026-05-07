"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import {
    SiReact, SiNextdotjs, SiNodedotjs, SiTypescript,
    SiTailwindcss, SiGit, SiDocker, SiMysql, SiMongodb,
    SiLaravel, SiPhp, SiLinux
} from "react-icons/si";

// Map icon names to components
const iconMap: Record<string, any> = {
    react: SiReact,
    nextjs: SiNextdotjs,
    nodejs: SiNodedotjs,
    typescript: SiTypescript,
    tailwind: SiTailwindcss,
    tailwindcss: SiTailwindcss,
    git: SiGit,
    docker: SiDocker,
    mysql: SiMysql,
    mongodb: SiMongodb,
    laravel: SiLaravel,
    php: SiPhp,
    linux: SiLinux,
};

// Color map for different technologies
const colorMap: Record<string, string> = {
    react: "#61DAFB",
    nextjs: "#ffffff",
    nodejs: "#339933",
    typescript: "#3178C6",
    tailwind: "#06B6D4",
    tailwindcss: "#06B6D4",
    git: "#F05032",
    docker: "#2496ED",
    mysql: "#4479A1",
    mongodb: "#47A248",
    laravel: "#FF2D20",
    php: "#777BB4",
    linux: "#FCC624",
};

interface Skill {
    id: string;
    name: string;
    level: number;
    category: string;
    isVisible: boolean;
}

export default function Skills() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/skills')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Only show visible skills
                    const visibleSkills = data.filter((skill: Skill) => skill.isVisible === true);
                    setSkills(visibleSkills);
                } else {
                    setSkills([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch skills:', err);
                setSkills([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section id="skills" className="py-32">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="animate-pulse">
                        <div className="h-12 w-48 bg-purple-600/20 rounded mx-auto mb-4"></div>
                        <div className="h-1 w-24 bg-purple-600/20 rounded mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (skills.length === 0) {
        return (
            <section id="skills" className="py-32">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical Skills</h2>
                    <p className="text-gray-400">Skills coming soon!</p>
                </div>
            </section>
        );
    }

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
                        Here are the technologies I work with regularly.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => {
                        const skillKey = skill.name.toLowerCase().replace(/\.js$/, '').replace(/\./g, '');
                        const Icon = iconMap[skillKey] || SiReact;
                        const color = colorMap[skillKey] || "#8b5cf6";

                        return (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                            >
                                <div className="flex flex-col items-center">
                                    <Icon
                                        className="w-12 h-12 mb-4 transition-transform group-hover:scale-110"
                                        style={{ color }}
                                    />
                                    <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${skill.level}%` } : {}}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.02 }}
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-400">{skill.level}%</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}