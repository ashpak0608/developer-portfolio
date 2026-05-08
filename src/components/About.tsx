"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Code2, Users, Rocket, Coffee, Heart } from "lucide-react";

const iconMap: Record<string, any> = {
    Code2: Code2,
    Users: Users,
    Rocket: Rocket,
    Coffee: Coffee,
    Heart: Heart,
};

export default function About() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [aboutData, setAboutData] = useState({ bio: "", stats: [] as any[] });

    useEffect(() => {
        fetch('/api/about')
            .then(res => res.json())
            .then(data => {
                setAboutData({
                    bio: data.bio,
                    stats: JSON.parse(data.stats || '[]')
                });
            })
            .catch(console.error);
    }, []);

    return (
        <section id="about" className="py-32 relative overflow-hidden bg-white">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        About{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                            Me
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                            {aboutData.bio}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {aboutData.stats.map((stat, index) => {
                            const Icon = iconMap[stat.icon] || Code2;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                                    <div className="text-gray-500 text-sm">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}