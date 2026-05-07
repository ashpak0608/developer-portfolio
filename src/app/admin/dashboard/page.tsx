"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LogOut, Mail, Trash2, CheckCircle, Circle, Plus, Edit2, X,
  FolderGit2, Loader2, Code2, Pencil, Eye, EyeOff, Settings,
  User, Link2, Star, Heart, Save, PlusCircle, MinusCircle
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

// ============ TYPES ============
interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  sentAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  live?: string | null;
  imageUrl?: string | null;
  imagePublicId?: string | null;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  order: number;
  isVisible: boolean;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  isActive: boolean;
  order: number;
}

interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  position: string | null;
  content: string;
  rating: number;
  imageUrl: string | null;
  isVisible: boolean;
  order: number;
}

interface HeroData {
  greeting: string;
  name: string;
  titleLines: string[];
  description: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

interface AboutData {
  bio: string;
  stats: Array<{ value: string; label: string; icon: string }>;
}

// ============ MAIN COMPONENT ============
export default function AdminDashboard() {
  const router = useRouter();

  // Tab State
  const [activeTab, setActiveTab] = useState('messages');
  const [loading, setLoading] = useState(true);

  // Data States
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [siteSettings, setSiteSettings] = useState<any>({});

  // Modal States
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({ name: '', description: '', technologies: '', github: '', live: '' });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);
  const [savingProject, setSavingProject] = useState(false);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState({ name: '', level: 80, category: 'technical', order: 0, isVisible: true });
  const [savingSkill, setSavingSkill] = useState(false);

  const [showSocialModal, setShowSocialModal] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [socialForm, setSocialForm] = useState({ platform: '', url: '', icon: '', isActive: true, order: 0 });
  const [savingSocial, setSavingSocial] = useState(false);

  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({ name: '', company: '', position: '', content: '', rating: 5, isVisible: true, order: 0 });
  const [testimonialImageUrl, setTestimonialImageUrl] = useState<string | null>(null);
  const [testimonialImagePublicId, setTestimonialImagePublicId] = useState<string | null>(null);
  const [savingTestimonial, setSavingTestimonial] = useState(false);

  const [heroForm, setHeroForm] = useState<HeroData>({
    greeting: '', name: '', titleLines: [], description: '', primaryBtnText: '', secondaryBtnText: ''
  });
  const [newTitleLine, setNewTitleLine] = useState('');
  const [savingHero, setSavingHero] = useState(false);

  const [aboutForm, setAboutForm] = useState({ bio: '', stats: [] as any[] });
  const [newStat, setNewStat] = useState({ value: '', label: '', icon: '' });
  const [savingAbout, setSavingAbout] = useState(false);

  const [settingsForm, setSettingsForm] = useState({ siteTitle: '', siteDescription: '', footerText: '', contactEmail: '', resumeUrl: '' });
  const [savingSettings, setSavingSettings] = useState(false);

  // ============ AUTHENTICATION ============
  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin/login');
    }
  }, [router]);

  // ============ FETCH ALL DATA ============
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch messages
      const messagesRes = await fetch('/api/contact');
      const messagesData = await messagesRes.json();
      setMessages(Array.isArray(messagesData) ? messagesData : []);

      // Fetch projects
      const projectsRes = await fetch('/api/projects');
      const projectsData = await projectsRes.json();
      setProjects(Array.isArray(projectsData) ? projectsData : []);

      // Fetch skills
      const skillsRes = await fetch('/api/skills');
      const skillsData = await skillsRes.json();
      setSkills(Array.isArray(skillsData) ? skillsData : []);

      // Fetch socials
      const socialsRes = await fetch('/api/socials');
      const socialsData = await socialsRes.json();
      setSocials(Array.isArray(socialsData) ? socialsData : []);

      // Fetch testimonials
      const testimonialsRes = await fetch('/api/testimonials');
      const testimonialsData = await testimonialsRes.json();
      setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);

      // Fetch hero
      const heroRes = await fetch('/api/hero');
      const heroData = await heroRes.json();
      setHeroData(heroData);
      setHeroForm(heroData);

      // Fetch about
      const aboutRes = await fetch('/api/about');
      const aboutData = await aboutRes.json();
      setAboutData(aboutData);
      let statsArray = [];
      try {
        statsArray = JSON.parse(aboutData.stats || '[]');
      } catch (e) {
        statsArray = [];
      }
      setAboutForm({ bio: aboutData.bio || '', stats: statsArray });

      // Fetch settings
      const settingsRes = await fetch('/api/settings');
      const settingsData = await settingsRes.json();
      setSiteSettings(settingsData);
      setSettingsForm(settingsData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============ MESSAGE HANDLERS ============
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkRead = async (id: string, isRead: boolean) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !isRead }),
      });
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: !isRead } : m));
    } catch (error) {
      console.error(error);
    }
  };

  // ============ PROJECT HANDLERS ============
  const handleSaveProject = async () => {
    if (!projectForm.name || !projectForm.description) {
      alert('Please fill in required fields');
      return;
    }
    setSavingProject(true);
    try {
      const projectData = {
        name: projectForm.name,
        description: projectForm.description,
        technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t),
        github: projectForm.github,
        live: projectForm.live || null,
        imageUrl: imageUrl,
        imagePublicId: imagePublicId,
      };

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        alert(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
        await fetchData();
        setShowProjectModal(false);
        setImageUrl(null);
        setImagePublicId(null);
        setProjectForm({ name: '', description: '', technologies: '', github: '', live: '' });
        setEditingProject(null);
      } else {
        alert('Failed to save project');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving project');
    } finally {
      setSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  // ============ SKILL HANDLERS ============
  const handleSaveSkill = async () => {
    if (!skillForm.name.trim()) {
      alert('Skill name required');
      return;
    }
    setSavingSkill(true);
    try {
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : '/api/skills';
      const method = editingSkill ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillForm)
      });

      if (response.ok) {
        alert(editingSkill ? 'Skill updated successfully!' : 'Skill created successfully!');
        await fetchData();
        setShowSkillModal(false);
        setSkillForm({ name: '', level: 80, category: 'technical', order: 0, isVisible: true });
        setEditingSkill(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save skill');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save skill');
    } finally {
      setSavingSkill(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  // ============ SOCIAL HANDLERS ============
  const handleSaveSocial = async () => {
    if (!socialForm.platform || !socialForm.url) {
      alert('Platform and URL required');
      return;
    }
    setSavingSocial(true);
    try {
      const url = editingSocial ? `/api/socials/${editingSocial.id}` : '/api/socials';
      const method = editingSocial ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialForm)
      });

      if (response.ok) {
        alert(editingSocial ? 'Social link updated successfully!' : 'Social link created successfully!');
        await fetchData();
        setShowSocialModal(false);
        setSocialForm({ platform: '', url: '', icon: '', isActive: true, order: 0 });
        setEditingSocial(null);
      } else {
        alert('Failed to save social link');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving social link');
    } finally {
      setSavingSocial(false);
    }
  };

  const handleDeleteSocial = async (id: string) => {
    if (!confirm('Delete this social link?')) return;
    try {
      await fetch(`/api/socials/${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  // ============ TESTIMONIAL HANDLERS ============
  const handleSaveTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.content) {
      alert('Name and content required');
      return;
    }
    setSavingTestimonial(true);
    try {
      const testimonialData = {
        ...testimonialForm,
        imageUrl: testimonialImageUrl,
        imagePublicId: testimonialImagePublicId
      };
      const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : '/api/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData)
      });

      if (response.ok) {
        alert(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
        await fetchData();
        setShowTestimonialModal(false);
        setTestimonialForm({ name: '', company: '', position: '', content: '', rating: 5, isVisible: true, order: 0 });
        setTestimonialImageUrl(null);
        setTestimonialImagePublicId(null);
        setEditingTestimonial(null);
      } else {
        alert('Failed to save testimonial');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving testimonial');
    } finally {
      setSavingTestimonial(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  // ============ HERO HANDLERS ============
  const handleSaveHero = async () => {
    setSavingHero(true);
    try {
      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroForm),
      });
      if (response.ok) {
        alert('Hero section updated successfully!');
        await fetchData();
      } else {
        alert('Failed to update hero section');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving hero section');
    } finally {
      setSavingHero(false);
    }
  };

  const handleAddTitleLine = () => {
    if (newTitleLine.trim()) {
      setHeroForm({ ...heroForm, titleLines: [...heroForm.titleLines, newTitleLine.trim()] });
      setNewTitleLine('');
    }
  };

  const handleRemoveTitleLine = (index: number) => {
    setHeroForm({ ...heroForm, titleLines: heroForm.titleLines.filter((_, i) => i !== index) });
  };

  // ============ ABOUT HANDLERS ============
  const handleSaveAbout = async () => {
    setSavingAbout(true);
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: aboutForm.bio, stats: aboutForm.stats }),
      });
      if (response.ok) {
        alert('About section updated successfully!');
        await fetchData();
      } else {
        alert('Failed to update about section');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving about section');
    } finally {
      setSavingAbout(false);
    }
  };

  const handleAddStat = () => {
    if (newStat.value && newStat.label) {
      setAboutForm({
        ...aboutForm,
        stats: [...aboutForm.stats, { ...newStat, icon: newStat.icon || 'Code2' }]
      });
      setNewStat({ value: '', label: '', icon: '' });
    }
  };

  const handleRemoveStat = (index: number) => {
    setAboutForm({ ...aboutForm, stats: aboutForm.stats.filter((_, i) => i !== index) });
  };

  // ============ SETTINGS HANDLERS ============
  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      });
      if (response.ok) {
        alert('Settings saved successfully!');
        await fetchData();
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  // ============ RENDER ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-black">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-400 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {[
            ['messages', 'Messages', messages.filter(m => !m.isRead).length],
            ['projects', 'Projects', projects.length],
            ['skills', 'Skills', skills.length],
            ['social', 'Social', socials.length],
            ['testimonials', 'Testimonials', testimonials.length],
            ['hero', 'Hero'],
            ['about', 'About'],
            ['settings', 'Settings']
          ].map(([id, label, count]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as string)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
            >
              {id === 'messages' && <Mail size={18} />}
              {id === 'projects' && <FolderGit2 size={18} />}
              {id === 'skills' && <Code2 size={18} />}
              {id === 'social' && <Link2 size={18} />}
              {id === 'testimonials' && <Star size={18} />}
              {id === 'hero' && <User size={18} />}
              {id === 'about' && <Heart size={18} />}
              {id === 'settings' && <Settings size={18} />}
              {label} {count !== undefined && `(${count})`}
            </button>
          ))}
        </div>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`p-6 rounded-2xl transition-all ${msg.isRead ? 'bg-white/5 border border-white/10' : 'bg-purple-900/20 border border-purple-500/50'
                  }`}>
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-semibold text-white text-lg">{msg.name}</h3>
                        <span className="text-sm text-gray-400">{msg.email}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.sentAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkRead(msg.id, msg.isRead)}
                        className="p-2 rounded-lg transition"
                        title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                      >
                        {msg.isRead ? <Circle size={20} className="text-gray-400" /> : <CheckCircle size={20} className="text-green-400" />}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <button
              onClick={() => {
                setEditingProject(null);
                setImageUrl(null);
                setProjectForm({ name: '', description: '', technologies: '', github: '', live: '' });
                setShowProjectModal(true);
              }}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition"
            >
              <Plus size={18} /> Add Project
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition">
                  {project.imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-purple-600/20 rounded text-xs text-purple-400">{tech}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setProjectForm({
                            name: project.name,
                            description: project.description,
                            technologies: project.technologies.join(', '),
                            github: project.github,
                            live: project.live || ''
                          });
                          setImageUrl(project.imageUrl || null);
                          setImagePublicId(project.imagePublicId || null);
                          setShowProjectModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 rounded text-blue-400 text-sm hover:bg-blue-600/30 transition"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600/20 rounded text-red-400 text-sm hover:bg-red-600/30 transition"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <button
              onClick={() => {
                setEditingSkill(null);
                setSkillForm({ name: '', level: 80, category: 'technical', order: 0, isVisible: true });
                setShowSkillModal(true);
              }}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition"
            >
              <Plus size={18} /> Add Skill
            </button>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className={`bg-white/5 rounded-xl p-4 border ${skill.isVisible ? 'border-white/10' : 'border-red-500/30 opacity-60'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <p className="text-xs text-gray-400">{skill.category}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingSkill(skill);
                          setSkillForm(skill);
                          setShowSkillModal(true);
                        }}
                        className="p-1 rounded hover:bg-white/10"
                      >
                        <Pencil size={14} className="text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-1 rounded hover:bg-white/10"
                      >
                        <Trash2 size={14} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-gray-500">Order: {skill.order}</span>
                    {!skill.isVisible && <span className="text-red-400 flex items-center gap-1"><EyeOff size={10} /> Hidden</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links Tab */}
        {activeTab === 'social' && (
          <div>
            <button
              onClick={() => {
                setEditingSocial(null);
                setSocialForm({ platform: '', url: '', icon: '', isActive: true, order: 0 });
                setShowSocialModal(true);
              }}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition"
            >
              <Plus size={18} /> Add Social Link
            </button>
            <div className="grid md:grid-cols-2 gap-4">
              {socials.map((social) => (
                <div key={social.id} className={`bg-white/5 rounded-xl p-4 border flex justify-between items-center ${social.isActive ? 'border-white/10' : 'border-red-500/30 opacity-60'}`}>
                  <div>
                    <h3 className="font-semibold text-white">{social.platform}</h3>
                    <p className="text-sm text-gray-400 truncate max-w-md">{social.url}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingSocial(social);
                        setSocialForm(social);
                        setShowSocialModal(true);
                      }}
                      className="p-2 rounded hover:bg-white/10"
                    >
                      <Edit2 size={16} className="text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteSocial(social.id)}
                      className="p-2 rounded hover:bg-white/10"
                    >
                      <Trash2 size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div>
            <button
              onClick={() => {
                setEditingTestimonial(null);
                setTestimonialForm({ name: '', company: '', position: '', content: '', rating: 5, isVisible: true, order: 0 });
                setTestimonialImageUrl(null);
                setShowTestimonialModal(true);
              }}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition"
            >
              <Plus size={18} /> Add Testimonial
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex gap-4">
                    {testimonial.imageUrl && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={testimonial.imageUrl} alt={testimonial.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-white">{testimonial.name}</h3>
                          {testimonial.company && <p className="text-sm text-gray-400">{testimonial.company}</p>}
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingTestimonial(testimonial);
                              setTestimonialForm(testimonial);
                              setTestimonialImageUrl(testimonial.imageUrl);
                              setShowTestimonialModal(true);
                            }}
                            className="p-1 rounded hover:bg-white/10"
                          >
                            <Edit2 size={14} className="text-gray-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="p-1 rounded hover:bg-white/10"
                          >
                            <Trash2 size={14} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} size={14} className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'} />
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm mt-2 italic">"{testimonial.content.substring(0, 100)}..."</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Section Tab */}
        {activeTab === 'hero' && heroData && (
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Hero Section Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Greeting</label>
                <input type="text" value={heroForm.greeting} onChange={(e) => setHeroForm({ ...heroForm, greeting: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Name</label>
                <input type="text" value={heroForm.name} onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Typing Titles (Animation)</label>
                <div className="space-y-2">
                  {heroForm.titleLines.map((line, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={line} onChange={(e) => { const newLines = [...heroForm.titleLines]; newLines[i] = e.target.value; setHeroForm({ ...heroForm, titleLines: newLines }); }} className="flex-1 px-4 py-2 bg-white/10 rounded-lg text-white" />
                      <button onClick={() => handleRemoveTitleLine(i)} className="px-3 py-2 bg-red-600/20 rounded-lg text-red-400"><MinusCircle size={18} /></button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input type="text" value={newTitleLine} onChange={(e) => setNewTitleLine(e.target.value)} placeholder="Add new title (e.g., React Developer)" className="flex-1 px-4 py-2 bg-white/10 rounded-lg text-white" />
                  <button onClick={handleAddTitleLine} className="px-4 py-2 bg-purple-600 rounded-lg text-white"><PlusCircle size={18} /></button>
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Description</label>
                <textarea value={heroForm.description} onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })} rows={3} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Primary Button Text</label>
                  <input type="text" value={heroForm.primaryBtnText} onChange={(e) => setHeroForm({ ...heroForm, primaryBtnText: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">Secondary Button Text</label>
                  <input type="text" value={heroForm.secondaryBtnText} onChange={(e) => setHeroForm({ ...heroForm, secondaryBtnText: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
                </div>
              </div>
              <button onClick={handleSaveHero} disabled={savingHero} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2">
                {savingHero ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
                {savingHero ? 'Saving...' : 'Save Hero Section'}
              </button>
            </div>
          </div>
        )}

        {/* About Section Tab */}
        {activeTab === 'about' && aboutData && (
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">About Section Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Bio / Description</label>
                <textarea value={aboutForm.bio} onChange={(e) => setAboutForm({ ...aboutForm, bio: e.target.value })} rows={6} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Statistics</label>
                {aboutForm.stats.map((stat, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={stat.value} onChange={(e) => { const newStats = [...aboutForm.stats]; newStats[i].value = e.target.value; setAboutForm({ ...aboutForm, stats: newStats }); }} className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white" placeholder="Value (e.g., 20+)" />
                    <input value={stat.label} onChange={(e) => { const newStats = [...aboutForm.stats]; newStats[i].label = e.target.value; setAboutForm({ ...aboutForm, stats: newStats }); }} className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white" placeholder="Label" />
                    <button onClick={() => handleRemoveStat(i)} className="px-3 py-2 bg-red-600/20 rounded-lg text-red-400"><Trash2 size={16} /></button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <input type="text" value={newStat.value} onChange={(e) => setNewStat({ ...newStat, value: e.target.value })} placeholder="Value (e.g., 50+)" className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white" />
                  <input type="text" value={newStat.label} onChange={(e) => setNewStat({ ...newStat, label: e.target.value })} placeholder="Label (e.g., Clients)" className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-white" />
                  <button onClick={handleAddStat} className="px-4 py-2 bg-purple-600 rounded-lg text-white"><Plus size={18} /></button>
                </div>
              </div>
              <button onClick={handleSaveAbout} disabled={savingAbout} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2">
                {savingAbout ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
                {savingAbout ? 'Saving...' : 'Save About Section'}
              </button>
            </div>
          </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Site Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Site Title (Browser Tab)</label>
                <input type="text" value={settingsForm.siteTitle} onChange={(e) => setSettingsForm({ ...settingsForm, siteTitle: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Site Description (SEO)</label>
                <textarea value={settingsForm.siteDescription} onChange={(e) => setSettingsForm({ ...settingsForm, siteDescription: e.target.value })} rows={2} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Footer Text</label>
                <input type="text" value={settingsForm.footerText} onChange={(e) => setSettingsForm({ ...settingsForm, footerText: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Contact Email</label>
                <input type="email" value={settingsForm.contactEmail} onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Resume Download URL</label>
                <input type="url" value={settingsForm.resumeUrl} onChange={(e) => setSettingsForm({ ...settingsForm, resumeUrl: e.target.value })} placeholder="/resume.pdf" className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              </div>
              <button onClick={handleSaveSettings} disabled={savingSettings} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2">
                {savingSettings ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
                {savingSettings ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setShowProjectModal(false)} className="p-1 rounded-lg hover:bg-white/10"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <ImageUpload onImageUploaded={(url, id) => { setImageUrl(url); setImagePublicId(id); }} existingImage={imageUrl} onRemove={() => { setImageUrl(null); setImagePublicId(null); }} />
              <input type="text" placeholder="Project Name" value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <textarea placeholder="Description" rows={3} value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <input type="text" placeholder="Technologies (comma separated)" value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <input type="url" placeholder="GitHub URL" value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <input type="url" placeholder="Live Demo URL (optional)" value={projectForm.live} onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <button onClick={handleSaveProject} disabled={savingProject} className="w-full py-2 bg-purple-600 rounded-lg text-white font-semibold">{savingProject ? 'Saving...' : (editingProject ? 'Update' : 'Create')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-white/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setShowSkillModal(false)} className="p-1 rounded-lg hover:bg-white/10"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <input type="text" placeholder="Skill Name" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <div>
                <label className="text-gray-300 text-sm">Level: {skillForm.level}%</label>
                <input type="range" min="0" max="100" value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })} className="w-full mt-1" />
              </div>
              <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white">
                <option value="technical">Technical</option>
                <option value="tools">Tools & DevOps</option>
                <option value="soft">Soft Skills</option>
              </select>
              <input type="number" placeholder="Order (lower = first)" value={skillForm.order} onChange={(e) => setSkillForm({ ...skillForm, order: parseInt(e.target.value) })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={skillForm.isVisible} onChange={(e) => setSkillForm({ ...skillForm, isVisible: e.target.checked })} className="w-4 h-4" />
                <span className="text-gray-300">Visible on website</span>
              </label>
              <button onClick={handleSaveSkill} disabled={savingSkill} className="w-full py-2 bg-purple-600 rounded-lg text-white font-semibold">{savingSkill ? 'Saving...' : (editingSkill ? 'Update' : 'Create')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Social Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-white/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingSocial ? 'Edit Social Link' : 'Add Social Link'}</h2>
              <button onClick={() => setShowSocialModal(false)} className="p-1 rounded-lg hover:bg-white/10"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <input type="text" placeholder="Platform (e.g., GitHub, LinkedIn)" value={socialForm.platform} onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <input type="url" placeholder="URL (e.g., https://github.com/username)" value={socialForm.url} onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <input type="text" placeholder="Icon name (e.g., Github, Linkedin)" value={socialForm.icon} onChange={(e) => setSocialForm({ ...socialForm, icon: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <input type="number" placeholder="Order" value={socialForm.order} onChange={(e) => setSocialForm({ ...socialForm, order: parseInt(e.target.value) })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={socialForm.isActive} onChange={(e) => setSocialForm({ ...socialForm, isActive: e.target.checked })} className="w-4 h-4" />
                <span className="text-gray-300">Active</span>
              </label>
              <button onClick={handleSaveSocial} disabled={savingSocial} className="w-full py-2 bg-purple-600 rounded-lg text-white font-semibold">{savingSocial ? 'Saving...' : (editingSocial ? 'Update' : 'Create')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {showTestimonialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowTestimonialModal(false)} className="p-1 rounded-lg hover:bg-white/10"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <ImageUpload onImageUploaded={(url, id) => { setTestimonialImageUrl(url); setTestimonialImagePublicId(id); }} existingImage={testimonialImageUrl} onRemove={() => { setTestimonialImageUrl(null); setTestimonialImagePublicId(null); }} />
              <input type="text" placeholder="Client Name" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <input type="text" placeholder="Company (optional)" value={testimonialForm.company || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <input type="text" placeholder="Position (optional)" value={testimonialForm.position || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <textarea placeholder="Testimonial Content" rows={4} value={testimonialForm.content} onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <div>
                <label className="text-gray-300 text-sm">Rating: {testimonialForm.rating} stars</label>
                <input type="range" min="1" max="5" value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })} className="w-full mt-1" />
              </div>
              <input type="number" placeholder="Order" value={testimonialForm.order} onChange={(e) => setTestimonialForm({ ...testimonialForm, order: parseInt(e.target.value) })} className="w-full px-4 py-2 bg-white/10 rounded-lg text-white" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={testimonialForm.isVisible} onChange={(e) => setTestimonialForm({ ...testimonialForm, isVisible: e.target.checked })} className="w-4 h-4" />
                <span className="text-gray-300">Visible on website</span>
              </label>
              <button onClick={handleSaveTestimonial} disabled={savingTestimonial} className="w-full py-2 bg-purple-600 rounded-lg text-white font-semibold">{savingTestimonial ? 'Saving...' : (editingTestimonial ? 'Update' : 'Create')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}