"use client";

import ThreeScene from "./ThreeScene";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">

            <div className="md:w-1/2 p-10">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl md:text-6xl font-bold"
                >
                    Hi, I'm a <span className="text-indigo-400">Full Stack Developer</span>
                </motion.h1>

                <p className="mt-6 text-gray-300 text-lg">
                    I build scalable web applications using modern technologies.
                </p>

                <div className="mt-6">
                    <button className="bg-indigo-500 px-6 py-3 rounded-xl hover:bg-indigo-600">
                        View Projects
                    </button>
                </div>
            </div>

            <div className="md:w-1/2">
                <ThreeScene />
            </div>

        </section>
    );
}