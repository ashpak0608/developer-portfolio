"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
    const [footerText, setFooterText] = useState("© 2024 Ashpak Shaikh. All rights reserved.");

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.footerText) setFooterText(data.footerText);
            })
            .catch(console.error);
    }, []);

    return (
        <footer className="relative py-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">{footerText}</p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">Made with <Heart size={14} className="text-red-500 fill-red-500" /> using Next.js</p>
                </motion.div>
            </div>
        </footer>
    );
}