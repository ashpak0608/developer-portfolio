"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import ThreeScene from "./ThreeScene";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    const typedRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: [
                "Full Stack Developer",
                "Backend Specialist",
                "Problem Solver"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            backDelay: 1500,
        });

        return () => typed.destroy();
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <ThreeScene />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black z-10" />

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Hi, I'm{" "}
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-gradient">
                            Ashpak Shaikh
                        </span>
                    </h1>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-2xl md:text-4xl text-gray-300 mb-8"
                >
                    <span ref={typedRef}></span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
                >
                    I build scalable, performant applications using modern technologies
                    that solve real-world problems and help businesses grow.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                    >
                        View My Work
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/20 transition-all border border-white/10"
                    >
                        Contact Me
                    </motion.a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.a
                    href="#about"
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ArrowDown className="text-gray-400" size={32} />
                </motion.a>
            </div>
        </section>
    );
}