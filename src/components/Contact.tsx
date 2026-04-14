"use client";

// src/app/components/Contact.tsx
// This component handles contact form submissions and saves to database

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, Instagram, Send, MapPin, CheckCircle, AlertCircle } from "lucide-react";
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

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: "", email: "", message: "" });
        
        // Reset after 3 seconds
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
      
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }
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
      bg: "bg-red-500/10",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/ashpak0608",
      href: "https://github.com/ashpak0608",
      color: "from-gray-700 to-gray-900",
      bg: "bg-gray-500/10",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/ashpak-shaikh",
      href: "https://www.linkedin.com/in/ashpak-shaikh-7b22a929b",
      color: "from-blue-500 to-blue-700",
      bg: "bg-blue-500/10",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@tech_solutions_0608",
      href: "https://instagram.com/tech_solutions_0608",
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mira Road, India",
      href: "#",
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-500/10",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

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
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500"
                      placeholder="John Doe"
                      suppressHydrationWarning
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500"
                      placeholder="john@example.com"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Tell me about your project..."
                    suppressHydrationWarning
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  whileHover={formStatus === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={formStatus === 'idle' ? { scale: 0.98 } : {}}
                  className={`w-full px-6 py-4 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 ${
                    formStatus === 'idle' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25' 
                      : formStatus === 'success'
                      ? 'bg-green-600'
                      : formStatus === 'error'
                      ? 'bg-red-600'
                      : 'bg-purple-600/50 cursor-not-allowed'
                  }`}
                >
                  {formStatus === 'idle' && (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                  {formStatus === 'sending' && (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  )}
                  {formStatus === 'success' && (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  )}
                  {formStatus === 'error' && (
                    <>
                      <AlertCircle size={20} />
                      {errorMessage || 'Failed to Send'}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                Connect With Me
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group"
                    suppressHydrationWarning
                  >
                    <div className={`p-3 rounded-xl ${info.bg} group-hover:scale-110 transition-transform`}>
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">{info.label}</p>
                      <p className="text-white font-medium text-sm">{info.value}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-purple-400">→</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Response Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30 text-center"
            >
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-white font-semibold mb-2">Quick Response</h4>
              <p className="text-gray-400 text-sm">
                I typically respond within 24-48 hours
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}