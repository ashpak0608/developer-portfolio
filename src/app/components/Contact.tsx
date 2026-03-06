"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, Instagram, Send, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function Contact() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [mounted, setMounted] = useState(false);

    // Fix hydration issues by ensuring component only renders on client
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "shaikhashpak0608@gmail.com",
            href: "mailto:shaikhashpak0608@gmail.com",
            color: "from-red-500 to-orange-500",
        },
        {
            icon: Github,
            label: "GitHub",
            value: "github.com/ashpak0608",
            href: "https://github.com/ashpak0608",
            color: "from-gray-700 to-gray-900",
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            value: "linkedin.com/in/ashpak-shaikh",
            href: "https://www.linkedin.com/in/ashpak-shaikh-7b22a929b",
            color: "from-blue-500 to-blue-700",
        },
        {
            icon: Instagram,
            label: "Instagram",
            value: "@tech_solutions_0608",
            href: "https://instagram.com/tech_solutions_0608",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Mira Road, India",
            href: "#",
            color: "from-green-500 to-emerald-500",
        },
    ];

    // Don't render anything until after hydration
    if (!mounted) {
        return null;
    }

    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Get In{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                            Touch
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                    <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                        Have a project in mind? Let's work together to create something amazing.
                        Feel free to reach out through any of these channels.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                            <div>
                                <label htmlFor="name" className="block text-gray-300 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white"
                                    placeholder="John Doe"
                                    suppressHydrationWarning
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-300 mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white"
                                    placeholder="john@example.com"
                                    suppressHydrationWarning
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-300 mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-white resize-none"
                                    placeholder="Tell me about your project..."
                                    suppressHydrationWarning
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={info.label}
                                href={info.href}
                                target={info.href.startsWith("http") ? "_blank" : undefined}
                                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all group"
                                suppressHydrationWarning
                            >
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                                    <info.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-400 mb-1">{info.label}</h3>
                                    <p className="text-white font-medium">{info.value}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}