"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
    const typedRef = useRef(null);
    const [heroData, setHeroData] = useState({
        greeting: "Hi, I'm",
        name: "Ashpak Shaikh",
        titleLines: ["Full Stack Developer", "Next.js Specialist", "Node.js Backend Engineer"],
        description: "I build scalable, performant applications using modern technologies that solve real-world problems and help businesses grow.",
        primaryBtnText: "View My Work",
        secondaryBtnText: "Contact Me"
    });
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => {
                if (data && data.titleLines) {
                    setHeroData(data);
                }
                setLoading(false);
                setTimeout(() => setIsVisible(true), 100);
            })
            .catch(() => {
                setLoading(false);
                setTimeout(() => setIsVisible(true), 100);
            });
    }, []);

    useEffect(() => {
        if (!loading && heroData.titleLines && heroData.titleLines.length > 0 && typedRef.current) {
            const typed = new Typed(typedRef.current, {
                strings: heroData.titleLines,
                typeSpeed: 60,
                backSpeed: 40,
                loop: true,
                backDelay: 1500,
                showCursor: true,
                cursorChar: "|",
            });
            return () => typed.destroy();
        }
    }, [loading, heroData.titleLines]);

    // Loading Animation
    if (loading) {
        return (
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50" />
                <div className="relative z-20 text-center px-4">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-ping opacity-75" />
                            <div className="w-20 h-20 border-4 border-t-purple-600 border-r-indigo-600 border-b-purple-600 border-l-indigo-600 rounded-full animate-spin absolute top-0 left-0" />
                        </div>
                        <div className="space-y-3">
                            <div className="shimmer h-8 w-48 rounded-lg mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                            <div className="shimmer h-6 w-64 rounded-lg mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                            <div className="shimmer h-20 w-80 rounded-lg mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        </div>
                        <p className="text-purple-600 font-medium animate-pulse">Loading experience...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50" />

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-20" />

            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6 shadow-sm">
                        <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                        <span className="text-sm text-purple-700 font-medium">Welcome to my portfolio</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-6 leading-tight">
                        {heroData.greeting}{" "}
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-transparent bg-clip-text animate-gradient">
                            {heroData.name}
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="text-2xl md:text-4xl lg:text-5xl text-gray-600 mb-8">
                        <span ref={typedRef} className="text-purple-600 font-semibold"></span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                        {heroData.description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                        {heroData.primaryBtnText}
                        <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                        {heroData.secondaryBtnText}
                    </motion.a>
                </motion.div>

                {/* Scroll Indicator - FIXED: No duplicate animate prop */}
                <motion.a
                    href="#about"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { delay: 1.5, duration: 0.5 },
                        y: { duration: 2, repeat: Infinity, repeatDelay: 0.5 }
                    }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
                            Scroll to explore
                        </span>
                        <div className="w-8 h-12 rounded-full border-2 border-gray-300 flex justify-center group-hover:border-purple-400 transition-colors">
                            <div className="w-1.5 h-3 bg-purple-500 rounded-full mt-2 animate-bounce" />
                        </div>
                    </div>
                </motion.a>
            </div>
        </section>
    );
}