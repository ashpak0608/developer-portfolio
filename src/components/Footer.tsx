"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative py-8 overflow-hidden">
            {/* Gradient line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Ashpak Shaikh. All rights reserved.
                    </p>

                    <p className="text-gray-400 text-sm flex items-center gap-1">
                        Made with <Heart size={14} className="text-red-500 fill-red-500" /> using Next.js
                    </p>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            Terms
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}