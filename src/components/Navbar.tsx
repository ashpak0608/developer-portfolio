"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Code2, FolderGit2, Mail } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ["home", "about", "skills", "projects", "contact"];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "#", icon: Home, id: "home" },
        { name: "About", href: "#about", icon: User, id: "about" },
        { name: "Skills", href: "#skills", icon: Code2, id: "skills" },
        { name: "Projects", href: "#projects", icon: FolderGit2, id: "projects" },
        { name: "Contact", href: "#contact", icon: Mail, id: "contact" },
    ];

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
        e.preventDefault();
        setActiveSection(id);
        setIsMobileMenuOpen(false);

        if (href === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                        ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100"
                        : "bg-white/80 backdrop-blur-md border-b border-gray-100/50"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo - Simple "AS" Badge (Restored) */}
                        <motion.a
                            href="#"
                            onClick={(e) => handleClick(e, "#", "home")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                                <span className="text-white font-bold text-base lg:text-lg">AS</span>
                            </div>
                            <span className="text-lg lg:text-xl font-semibold text-gray-800">
                                Ashpak
                            </span>
                        </motion.a>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-1 lg:gap-2">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleClick(e, item.href, item.id)}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative px-4 lg:px-5 py-2 rounded-xl text-sm lg:text-base font-medium transition-all duration-300 group ${activeSection === item.id
                                            ? "text-purple-600"
                                            : "text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <item.icon size={16} className="lg:hidden" />
                                        {item.name}
                                    </span>
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg"
                        >
                            <div className="px-4 py-4 space-y-2">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => handleClick(e, item.href, item.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === item.id
                                                ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600"
                                                : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <item.icon size={18} />
                                        <span className="font-medium">{item.name}</span>
                                        {activeSection === item.id && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600" />
                                        )}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Spacer */}
            <div className="h-16 lg:h-20" />
        </>
    );
}