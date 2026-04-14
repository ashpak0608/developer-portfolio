"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Users, Rocket, Coffee } from "lucide-react";

export default function About() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const stats = [
        { icon: Code2, label: "Projects Completed", value: "20+" },
        { icon: Users, label: "Happy Clients", value: "15+" },
        { icon: Rocket, label: "Years Experience", value: "3+" },
        { icon: Coffee, label: "Coffee Consumed", value: "500+" },
    ];

    return (
        <section id="about" className="py-32 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        About{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                            Me
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            I'm a Full Stack Developer from Mira Road with a passion for
                            building modern web applications that make a difference. With 3+
                            years of experience, I specialize in creating scalable backend
                            systems and dynamic frontend interfaces.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            My journey in tech started with a curiosity for how things work,
                            which evolved into a career where I get to solve real-world problems
                            every day. I believe in writing clean, maintainable code and
                            creating experiences that users love.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            When I'm not coding, you'll find me exploring new technologies,
                            contributing to open source, or sharing my knowledge with the
                            developer community.
                        </p>
                    </motion.div>

                    {/* Right Column - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={inView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10"
                            >
                                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                                <div className="text-3xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}