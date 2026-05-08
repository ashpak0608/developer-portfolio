"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import {
    SiReact, SiNextdotjs, SiNodedotjs, SiTypescript,
    SiTailwindcss, SiGit, SiDocker, SiMysql, SiMongodb,
    SiLaravel, SiPhp, SiLinux, SiPrisma
} from "react-icons/si";

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
    prisma: SiPrisma,
};

const colorMap: Record<string, string> = {
    react: "#61DAFB",
    nextjs: "#000000",
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
    prisma: "#2D3748",
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
                    const visibleSkills = data.filter((skill: Skill) => skill.isVisible === true);
                    setSkills(visibleSkills);
                } else {
                    setSkills([]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section id="skills" className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="animate-pulse">
                        <div className="h-12 w-48 bg-purple-200 rounded-lg mx-auto mb-4"></div>
                        <div className="h-1 w-24 bg-purple-200 rounded-lg mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="skills" className="py-32 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Technical{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                            Skills
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full" />
                    <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
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
                                className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-8 h-8" style={{ color }} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{skill.name}</h3>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={inView ? { width: `${skill.level}%` } : {}}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.02 }}
                                            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">{skill.level}%</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}