"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Code2, Users, Rocket, Coffee } from "lucide-react";

const iconMap: Record<string, any> = {
    Code2: Code2,
    Users: Users,
    Rocket: Rocket,
    Coffee: Coffee,
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
        <section id="about" className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Me</span></h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                </motion.div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">{aboutData.bio}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-2 gap-6">
                        {aboutData.stats.map((stat, index) => {
                            const Icon = iconMap[stat.icon] || Code2;
                            return (
                                <motion.div key={index} initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }} whileHover={{ scale: 1.05 }} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10">
                                    <Icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}