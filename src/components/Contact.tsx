"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, Instagram, Send, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

// Icon mapping for social links
const iconMap: Record<string, any> = {
  Mail: Mail,
  Github: Github,
  Linkedin: Linkedin,
  Instagram: Instagram,
  MapPin: MapPin,
};

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch social links from API
    fetch('/api/socials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Only show active social links
          const activeLinks = data.filter(link => link.isActive === true);
          setSocialLinks(activeLinks);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!mounted) {
    return null;
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
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
                      Your Name
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
                      Your Email
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
                    Your Message
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
                  className={`w-full px-6 py-4 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 ${formStatus === 'idle'
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
                      Message Sent!
                    </>
                  )}
                  {formStatus === 'error' && (
                    <>
                      Failed to Send
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info - Only shows social links from database */}
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
                {socialLinks.length === 0 ? (
                  <p className="text-gray-400 text-center">No social links added yet.</p>
                ) : (
                  socialLinks.map((link, index) => {
                    const Icon = iconMap[link.icon] || Mail;
                    return (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group"
                        suppressHydrationWarning
                      >
                        <div className="p-3 rounded-xl bg-purple-500/10 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 mb-1">{link.platform}</p>
                          <p className="text-white font-medium text-sm truncate">{link.url}</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-purple-400">→</span>
                        </div>
                      </motion.a>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}