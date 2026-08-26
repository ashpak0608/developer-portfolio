"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LogOut, Mail, Trash2, CheckCircle, Circle, Plus, Edit2, X,
  FolderGit2, Loader2, Code2, Pencil, Eye, EyeOff, Settings,
  User, Link2, Star, Heart, Save, PlusCircle, MinusCircle,
  LayoutDashboard, Sparkles, Activity, TrendingUp, Award,
  Clock, Check, ExternalLink, Menu, ChevronDown, Palette,
  MessageSquare, Briefcase, Cpu, Users, Globe, FileText,
  Upload
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

// ============ STAT CARD COMPONENT ============
function StatCard({ title, value, icon: Icon, color, trend, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={12} className="text-green-500" />
              <span className="text-xs text-green-600">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

// ============ RECENT ACTIVITY COMPONENT ============
function RecentMessages({ messages, onViewAll }: { messages: Message[]; onViewAll: () => void }) {
  const recentMessages = messages.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-purple-500" />
          <h3 className="font-semibold text-gray-800">Recent Messages</h3>
        </div>
        <button onClick={onViewAll} className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          View All →
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {recentMessages.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400">
            <Mail size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No messages yet</p>
          </div>
        ) : (
          recentMessages.map((msg) => (
            <div key={msg.id} className="px-6 py-3 hover:bg-gray-50 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{msg.name}</p>
                  <p className="text-gray-500 text-xs truncate max-w-md">{msg.message.substring(0, 60)}...</p>
                </div>
                <span className="text-xs text-gray-400">{new Date(msg.sentAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============ QUICK ACTIONS COMPONENT ============
function QuickActions({ onAction }: { onAction: (tab: string) => void }) {
  const actions = [
    { tab: 'projects', label: 'Add Project', icon: FolderGit2, color: 'from-emerald-500 to-teal-500' },
    { tab: 'skills', label: 'Add Skill', icon: Code2, color: 'from-purple-500 to-pink-500' },
    { tab: 'testimonials', label: 'Add Testimonial', icon: Star, color: 'from-yellow-500 to-amber-500' },
    { tab: 'social', label: 'Add Social Link', icon: Link2, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-purple-500" />
        <h3 className="font-semibold text-gray-800">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.tab}
            onClick={() => onAction(action.tab)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition text-gray-700 text-sm font-medium"
          >
            <div className={`p-1 rounded-lg bg-gradient-to-br ${action.color}`}>
              <action.icon size={14} className="text-white" />
            </div>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ TAB BUTTON COMPONENT ============
function TabButton({ active, onClick, icon: Icon, label, badge, badgeColor = "purple" }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
        ${active
          ? `bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md`
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }
      `}
    >
      <Icon size={20} />
      <span className="flex-1 text-left font-medium">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-semibold
          ${active ? 'bg-white/20 text-white' : `bg-${badgeColor}-100 text-${badgeColor}-700`}
        `}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ============ RESUME UPLOAD COMPONENT ============
function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setError(null);
      setStatus('idle');
    } else {
      setError('Please select a PDF file');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setStatus('processing');
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setResult(data.data);
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleImport = async () => {
    if (!result) return;
    
    setImporting(true);
    try {
      const response = await fetch('/api/resume/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Data imported successfully! Your portfolio has been updated.');
        window.location.reload();
      } else {
        alert('❌ ' + (data.error || 'Import failed. Please try again.'));
      }
    } catch (error) {
      alert('❌ Failed to import data. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-sm">
          <FileText size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Import Resume</h2>
          <p className="text-gray-500 text-sm">Upload your resume to automatically update your portfolio</p>
        </div>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition">
        <input
          type="file"
          id="resume-upload"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="resume-upload"
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <Upload size={40} className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              {file ? file.name : 'Click to upload your resume'}
            </p>
            <p className="text-gray-400 text-sm">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF files only (max 10MB)'}
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {status === 'success' && result && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-3 text-green-700 mb-4">
            <CheckCircle size={20} />
            <span className="font-medium">Resume parsed successfully!</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-white rounded-lg p-3">
              <span className="text-gray-500">Name</span>
              <p className="font-medium text-gray-800">{result.personalDetails?.name || 'N/A'}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <span className="text-gray-500">Email</span>
              <p className="font-medium text-gray-800">{result.personalDetails?.email || 'N/A'}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <span className="text-gray-500">Skills</span>
              <p className="font-medium text-gray-800">{result.skills?.length || 0} found</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <span className="text-gray-500">Projects</span>
              <p className="font-medium text-gray-800">{result.projects?.length || 0} found</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle size={20} />
              Parsed!
            </>
          ) : (
            <>
              <Upload size={20} />
              Parse Resume
            </>
          )}
        </button>
        
        {status === 'success' && (
          <button
            onClick={handleImport}
            disabled={importing}
            className="flex-1 py-3 bg-green-600 rounded-xl text-white font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            {importing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Import to Portfolio
              </>
            )}
          </button>
        )}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="font-semibold text-blue-800 mb-2">How it works</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Upload your resume in PDF format</li>
          <li>• AI will extract: Skills, Projects, Experience, Education, Contact Info</li>
          <li>• Review the extracted data before importing</li>
          <li>• Data will update your portfolio automatically</li>
        </ul>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function AdminDashboard() {
  const router = useRouter();

  // Tab State - Dashboard is now the default
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
      const [
        messagesRes, projectsRes, skillsRes, socialsRes,
        testimonialsRes, heroRes, aboutRes, settingsRes
      ] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/socials'),
        fetch('/api/testimonials'),
        fetch('/api/hero'),
        fetch('/api/about'),
        fetch('/api/settings'),
      ]);

      const messagesData = await messagesRes.json();
      setMessages(Array.isArray(messagesData) ? messagesData : []);

      const projectsData = await projectsRes.json();
      setProjects(Array.isArray(projectsData) ? projectsData : []);

      const skillsData = await skillsRes.json();
      setSkills(Array.isArray(skillsData) ? skillsData : []);

      const socialsData = await socialsRes.json();
      setSocials(Array.isArray(socialsData) ? socialsData : []);

      const testimonialsData = await testimonialsRes.json();
      setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);

      const hero = await heroRes.json();
      setHeroData(hero);
      setHeroForm(hero);

      const about = await aboutRes.json();
      setAboutData(about);
      let statsArray = [];
      try {
        statsArray = JSON.parse(about.stats || '[]');
      } catch (e) {
        statsArray = [];
      }
      setAboutForm({ bio: about.bio || '', stats: statsArray });

      const settings = await settingsRes.json();
      setSiteSettings(settings);
      setSettingsForm(settings);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============ CRUD HANDLERS ============
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(m => m.id !== id));
    } catch (error) { console.error(error); }
  };

  const handleMarkRead = async (id: string, isRead: boolean) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !isRead }),
      });
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: !isRead } : m));
    } catch (error) { console.error(error); }
  };

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
        imageUrl, imagePublicId,
      };

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        alert(editingProject ? 'Project updated!' : 'Project created!');
        await fetchData();
        setShowProjectModal(false);
        setImageUrl(null); setImagePublicId(null);
        setProjectForm({ name: '', description: '', technologies: '', github: '', live: '' });
        setEditingProject(null);
      } else alert('Failed to save project');
    } catch (error) {
      console.error(error); alert('Error saving project');
    } finally { setSavingProject(false); }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) { console.error(error); }
  };

  const handleSaveSkill = async () => {
    if (!skillForm.name.trim()) { alert('Skill name required'); return; }
    setSavingSkill(true);
    try {
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : '/api/skills';
      const method = editingSkill ? 'PUT' : 'POST';
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(skillForm) });

      if (response.ok) {
        alert(editingSkill ? 'Skill updated!' : 'Skill created!');
        await fetchData();
        setShowSkillModal(false);
        setSkillForm({ name: '', level: 80, category: 'technical', order: 0, isVisible: true });
        setEditingSkill(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save skill');
      }
    } catch (error) {
      console.error(error); alert('Failed to save skill');
    } finally { setSavingSkill(false); }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) { console.error(error); }
  };

  const handleSaveSocial = async () => {
    if (!socialForm.platform || !socialForm.url) { alert('Platform and URL required'); return; }
    setSavingSocial(true);
    try {
      const url = editingSocial ? `/api/socials/${editingSocial.id}` : '/api/socials';
      const method = editingSocial ? 'PUT' : 'POST';
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(socialForm) });

      if (response.ok) {
        alert(editingSocial ? 'Social link updated!' : 'Social link created!');
        await fetchData();
        setShowSocialModal(false);
        setSocialForm({ platform: '', url: '', icon: '', isActive: true, order: 0 });
        setEditingSocial(null);
      } else alert('Failed to save social link');
    } catch (error) {
      console.error(error); alert('Error saving social link');
    } finally { setSavingSocial(false); }
  };

  const handleDeleteSocial = async (id: string) => {
    if (!confirm('Delete this social link?')) return;
    try {
      await fetch(`/api/socials/${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) { console.error(error); }
  };

  const handleSaveTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.content) { alert('Name and content required'); return; }
    setSavingTestimonial(true);
    try {
      const testimonialData = { ...testimonialForm, imageUrl: testimonialImageUrl, imagePublicId: testimonialImagePublicId };
      const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : '/api/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(testimonialData) });

      if (response.ok) {
        alert(editingTestimonial ? 'Testimonial updated!' : 'Testimonial created!');
        await fetchData();
        setShowTestimonialModal(false);
        setTestimonialForm({ name: '', company: '', position: '', content: '', rating: 5, isVisible: true, order: 0 });
        setTestimonialImageUrl(null); setTestimonialImagePublicId(null);
        setEditingTestimonial(null);
      } else alert('Failed to save testimonial');
    } catch (error) {
      console.error(error); alert('Error saving testimonial');
    } finally { setSavingTestimonial(false); }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      await fetchData();
    } catch (error) { console.error(error); }
  };

  const handleSaveHero = async () => {
    setSavingHero(true);
    try {
      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroForm),
      });
      if (response.ok) {
        alert('Hero section updated!');
        await fetchData();
      } else alert('Failed to update hero section');
    } catch (error) {
      console.error(error); alert('Error saving hero section');
    } finally { setSavingHero(false); }
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

  const handleSaveAbout = async () => {
    setSavingAbout(true);
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: aboutForm.bio, stats: aboutForm.stats }),
      });
      if (response.ok) {
        alert('About section updated!');
        await fetchData();
      } else alert('Failed to update about section');
    } catch (error) {
      console.error(error); alert('Error saving about section');
    } finally { setSavingAbout(false); }
  };

  const handleAddStat = () => {
    if (newStat.value && newStat.label) {
      setAboutForm({ ...aboutForm, stats: [...aboutForm.stats, { ...newStat, icon: newStat.icon || 'Code2' }] });
      setNewStat({ value: '', label: '', icon: '' });
    }
  };

  const handleRemoveStat = (index: number) => {
    setAboutForm({ ...aboutForm, stats: aboutForm.stats.filter((_, i) => i !== index) });
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      });
      if (response.ok) {
        alert('Settings saved!');
        await fetchData();
      } else alert('Failed to save settings');
    } catch (error) {
      console.error(error); alert('Error saving settings');
    } finally { setSavingSettings(false); }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  // Calculate unread messages count
  const unreadCount = messages.filter(m => !m.isRead).length;

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-cyan-500' },
    { id: 'messages', label: 'Messages', icon: Mail, color: 'from-blue-500 to-cyan-500', badge: unreadCount },
    { id: 'projects', label: 'Projects', icon: FolderGit2, color: 'from-emerald-500 to-teal-500', badge: projects.length },
    { id: 'skills', label: 'Skills', icon: Code2, color: 'from-purple-500 to-pink-500', badge: skills.length },
    { id: 'social', label: 'Social Links', icon: Link2, color: 'from-orange-500 to-red-500', badge: socials.length },
    { id: 'testimonials', label: 'Testimonials', icon: Star, color: 'from-yellow-500 to-amber-500', badge: testimonials.length },
    { id: 'hero', label: 'Hero Section', icon: User, color: 'from-indigo-500 to-purple-500' },
    { id: 'about', label: 'About Section', icon: Heart, color: 'from-rose-500 to-pink-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-500 to-gray-700' },
    { id: 'resume', label: 'Import Resume', icon: FileText, color: 'from-purple-600 to-indigo-600' },
  ];

  // Stats cards for dashboard
  const statsCards = [
    { title: 'Total Messages', value: messages.length, icon: Mail, color: 'from-blue-500 to-cyan-500', trend: `${unreadCount} unread`, onClick: () => setActiveTab('messages') },
    { title: 'Active Projects', value: projects.length, icon: FolderGit2, color: 'from-emerald-500 to-teal-500', onClick: () => setActiveTab('projects') },
    { title: 'Skills', value: skills.length, icon: Code2, color: 'from-purple-500 to-pink-500', onClick: () => setActiveTab('skills') },
    { title: 'Testimonials', value: testimonials.length, icon: Star, color: 'from-yellow-500 to-amber-500', onClick: () => setActiveTab('testimonials') },
    { title: 'Social Links', value: socials.length, icon: Link2, color: 'from-orange-500 to-red-500', onClick: () => setActiveTab('social') },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-md border border-gray-200"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Sidebar Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowMobileMenu(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full z-40 transition-all duration-300
        bg-white shadow-xl
        ${sidebarCollapsed ? 'w-20' : 'w-72'}
        ${showMobileMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
              <Palette className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-gray-800 font-bold text-lg">Admin Panel</h1>
                <p className="text-gray-400 text-xs">Content Management</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:block p-1 rounded-lg hover:bg-gray-100 transition"
          >
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${sidebarCollapsed ? 'rotate-90' : '-rotate-90'}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'resume') {
                  window.location.href = '/admin/resume';
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${activeTab === item.id
                  ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
                ${sidebarCollapsed ? 'justify-center' : ''}
              `}
            >
              <item.icon size={20} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-semibold
                      ${activeTab === item.id ? 'bg-white/20' : 'bg-purple-100 text-purple-700'}
                    `}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              text-red-600 hover:text-red-700 hover:bg-red-50
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                  {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  {activeTab === 'dashboard'
                    ? 'Welcome back! Here\'s what\'s happening with your portfolio today.'
                    : `Manage your ${activeTab} content`}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* ============ DASHBOARD TAB ============ */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Welcome Section */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Welcome to your Admin Panel!</h2>
                      <p className="text-purple-100">Manage all your portfolio content from one place.</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition text-sm font-medium"
                      >
                        View Portfolio →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                {statsCards.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid lg:grid-cols-2 gap-6">
                <RecentMessages messages={messages} onViewAll={() => setActiveTab('messages')} />
                <QuickActions onAction={(tab) => setActiveTab(tab)} />
              </div>

              {/* Content Overview */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <FolderGit2 size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Projects</h3>
                      <p className="text-2xl font-bold text-gray-800">{projects.length}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Manage Projects →
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Code2 size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Skills</h3>
                      <p className="text-2xl font-bold text-gray-800">{skills.length}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('skills')}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Manage Skills →
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Users size={20} className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Testimonials</h3>
                      <p className="text-2xl font-bold text-gray-800">{testimonials.length}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('testimonials')}
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Manage Testimonials →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============ MESSAGES TAB ============ */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">All Messages</h2>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {unreadCount} unread
                </span>
              </div>
              {messages.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-400">No messages yet</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`
                      p-6 rounded-2xl transition-all duration-300 bg-white shadow-sm border
                      ${msg.isRead ? 'border-gray-100' : 'border-purple-200 bg-purple-50/30 shadow-md shadow-purple-100'}
                    `}
                  >
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-semibold text-gray-800 text-lg">{msg.name}</h3>
                          <span className="text-sm text-gray-500">{msg.email}</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(msg.sentAt).toLocaleString()}
                          </span>
                          {!msg.isRead && (
                            <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-600">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 whitespace-pre-wrap">{msg.message}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleMarkRead(msg.id, msg.isRead)}
                          className={`p-2 rounded-xl transition ${msg.isRead
                              ? 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                              : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                            }`}
                          title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                        >
                          {msg.isRead ? <Circle size={20} /> : <CheckCircle size={20} />}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Delete"
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

          {/* ============ PROJECTS TAB ============ */}
          {activeTab === 'projects' && (
            <div>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setImageUrl(null);
                  setProjectForm({ name: '', description: '', technologies: '', github: '', live: '' });
                  setShowProjectModal(true);
                }}
                className="mb-6 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Plus size={18} />
                Add Project
              </button>

              {projects.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <FolderGit2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-400">No projects yet. Click "Add Project" to get started.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      {project.imageUrl && (
                        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                          <Image
                            src={project.imageUrl}
                            alt={project.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-purple-50 rounded-md text-xs text-purple-600">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
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
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-lg text-blue-600 text-sm hover:bg-blue-100 transition"
                          >
                            <Edit2 size={14} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-lg text-red-600 text-sm hover:bg-red-100 transition"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-gray-500 text-sm hover:text-gray-700 transition"
                            >
                              <ExternalLink size={14} /> Live
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ SKILLS TAB ============ */}
          {activeTab === 'skills' && (
            <div>
              <button
                onClick={() => {
                  setEditingSkill(null);
                  setSkillForm({ name: '', level: 80, category: 'technical', order: 0, isVisible: true });
                  setShowSkillModal(true);
                }}
                className="mb-6 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Plus size={18} />
                Add Skill
              </button>

              {skills.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Code2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-400">No skills yet. Click "Add Skill" to get started.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className={`
                        bg-white rounded-xl p-4 border transition-all duration-300 shadow-sm
                        ${skill.isVisible ? 'border-gray-100 hover:shadow-md' : 'border-red-100 bg-red-50/30 opacity-75'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                          <span className="text-xs text-gray-500 px-2 py-0.5 rounded-full bg-gray-100">
                            {skill.category}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditingSkill(skill);
                              setSkillForm(skill);
                              setShowSkillModal(true);
                            }}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                          >
                            <Pencil size={14} className="text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                          >
                            <Trash2 size={14} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 font-mono">{skill.level}%</span>
                      </div>
                      <div className="flex justify-between mt-3 text-xs">
                        <span className="text-gray-400">Order: {skill.order}</span>
                        {!skill.isVisible && (
                          <span className="text-red-500 flex items-center gap-1">
                            <EyeOff size={10} /> Hidden
                          </span>
                        )}
                        {skill.isVisible && (
                          <span className="text-green-600 flex items-center gap-1">
                            <Eye size={10} /> Visible
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ SOCIAL LINKS TAB ============ */}
          {activeTab === 'social' && (
            <div>
              <button
                onClick={() => {
                  setEditingSocial(null);
                  setSocialForm({ platform: '', url: '', icon: '', isActive: true, order: 0 });
                  setShowSocialModal(true);
                }}
                className="mb-6 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Plus size={18} />
                Add Social Link
              </button>

              {socials.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Link2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-400">No social links yet. Click "Add Social Link" to get started.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {socials.map((social) => (
                    <div
                      key={social.id}
                      className={`
                        bg-white rounded-xl p-4 border transition-all duration-300 shadow-sm
                        ${social.isActive ? 'border-gray-100 hover:shadow-md' : 'border-red-100 bg-red-50/30 opacity-75'}
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                            <Link2 size={18} className="text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{social.platform}</h3>
                            <p className="text-sm text-gray-500 truncate max-w-md">{social.url}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingSocial(social);
                              setSocialForm(social);
                              setShowSocialModal(true);
                            }}
                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                          >
                            <Edit2 size={16} className="text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDeleteSocial(social.id)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                          >
                            <Trash2 size={16} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ TESTIMONIALS TAB ============ */}
          {activeTab === 'testimonials' && (
            <div>
              <button
                onClick={() => {
                  setEditingTestimonial(null);
                  setTestimonialForm({ name: '', company: '', position: '', content: '', rating: 5, isVisible: true, order: 0 });
                  setTestimonialImageUrl(null);
                  setShowTestimonialModal(true);
                }}
                className="mb-6 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Plus size={18} />
                Add Testimonial
              </button>

              {testimonials.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-400">No testimonials yet. Click "Add Testimonial" to get started.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        {testimonial.imageUrl && (
                          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                            <Image src={testimonial.imageUrl} alt={testimonial.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                              {testimonial.company && <p className="text-sm text-gray-500">{testimonial.company}</p>}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setEditingTestimonial(testimonial);
                                  setTestimonialForm(testimonial);
                                  setTestimonialImageUrl(testimonial.imageUrl);
                                  setShowTestimonialModal(true);
                                }}
                                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                              >
                                <Edit2 size={14} className="text-gray-500" />
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(testimonial.id)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                              >
                                <Trash2 size={14} className="text-gray-500" />
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-0.5 mt-2">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} size={14} className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                            ))}
                          </div>
                          <p className="text-gray-600 text-sm mt-2 italic line-clamp-2">"{testimonial.content}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============ HERO SECTION TAB ============ */}
          {activeTab === 'hero' && heroData && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-sm">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Hero Section</h2>
                  <p className="text-gray-500 text-sm">Customize your hero section content</p>
                </div>
              </div>
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Greeting</label>
                    <input type="text" value={heroForm.greeting} onChange={(e) => setHeroForm({ ...heroForm, greeting: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-2">Name</label>
                    <input type="text" value={heroForm.name} onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Typing Titles (Animation)</label>
                  <div className="space-y-2">
                    {heroForm.titleLines.map((line, i) => (
                      <div key={i} className="flex gap-2">
                        <input type="text" value={line} onChange={(e) => { const newLines = [...heroForm.titleLines]; newLines[i] = e.target.value; setHeroForm({ ...heroForm, titleLines: newLines }); }} className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
                        <button onClick={() => handleRemoveTitleLine(i)} className="px-4 py-2.5 bg-red-50 rounded-xl text-red-500 hover:bg-red-100 transition"><Trash2 size={18} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input type="text" value={newTitleLine} onChange={(e) => setNewTitleLine(e.target.value)} placeholder="Add new title (e.g., React Developer)" className="flex-1 px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
                    <button onClick={handleAddTitleLine} className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white shadow-sm"><Plus size={18} /></button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Description</label>
                  <textarea value={heroForm.description} onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="block text-gray-700 text-sm mb-2">Primary Button Text</label><input type="text" value={heroForm.primaryBtnText} onChange={(e) => setHeroForm({ ...heroForm, primaryBtnText: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" /></div>
                  <div><label className="block text-gray-700 text-sm mb-2">Secondary Button Text</label><input type="text" value={heroForm.secondaryBtnText} onChange={(e) => setHeroForm({ ...heroForm, secondaryBtnText: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" /></div>
                </div>
                <button onClick={handleSaveHero} disabled={savingHero} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition">
                  {savingHero ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
                  {savingHero ? 'Saving...' : 'Save Hero Section'}
                </button>
              </div>
            </div>
          )}

          {/* ============ ABOUT SECTION TAB ============ */}
          {activeTab === 'about' && aboutData && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-sm">
                  <Heart size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">About Section</h2>
                  <p className="text-gray-500 text-sm">Customize your about section content</p>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Bio / Description</label>
                  <textarea value={aboutForm.bio} onChange={(e) => setAboutForm({ ...aboutForm, bio: e.target.value })} rows={6} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">Statistics</label>
                  {aboutForm.stats.map((stat, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={stat.value} onChange={(e) => { const newStats = [...aboutForm.stats]; newStats[i].value = e.target.value; setAboutForm({ ...aboutForm, stats: newStats }); }} className="flex-1 px-3 py-2 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" placeholder="Value" />
                      <input value={stat.label} onChange={(e) => { const newStats = [...aboutForm.stats]; newStats[i].label = e.target.value; setAboutForm({ ...aboutForm, stats: newStats }); }} className="flex-1 px-3 py-2 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" placeholder="Label" />
                      <button onClick={() => handleRemoveStat(i)} className="px-3 py-2 bg-red-50 rounded-xl text-red-500"><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-3">
                    <input type="text" value={newStat.value} onChange={(e) => setNewStat({ ...newStat, value: e.target.value })} placeholder="Value (e.g., 50+)" className="flex-1 px-3 py-2 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
                    <input type="text" value={newStat.label} onChange={(e) => setNewStat({ ...newStat, label: e.target.value })} placeholder="Label (e.g., Clients)" className="flex-1 px-3 py-2 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
                    <button onClick={handleAddStat} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white shadow-sm"><Plus size={18} /></button>
                  </div>
                </div>
                <button onClick={handleSaveAbout} disabled={savingAbout} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition">
                  {savingAbout ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
                  {savingAbout ? 'Saving...' : 'Save About Section'}
                </button>
              </div>
            </div>
          )}

          {/* ============ SETTINGS TAB ============ */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-sm">
                  <Settings size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Site Settings</h2>
                  <p className="text-gray-500 text-sm">Configure your site metadata and settings</p>
                </div>
              </div>
              <div className="space-y-5">
                <div><label className="block text-gray-700 text-sm mb-2">Site Title (Browser Tab)</label><input type="text" value={settingsForm.siteTitle} onChange={(e) => setSettingsForm({ ...settingsForm, siteTitle: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" /></div>
                <div><label className="block text-gray-700 text-sm mb-2">Site Description (SEO)</label><textarea value={settingsForm.siteDescription} onChange={(e) => setSettingsForm({ ...settingsForm, siteDescription: e.target.value })} rows={2} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" /></div>
                <div><label className="block text-gray-700 text-sm mb-2">Footer Text</label><input type="text" value={settingsForm.footerText} onChange={(e) => setSettingsForm({ ...settingsForm, footerText: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" /></div>
                <div><label className="block text-gray-700 text-sm mb-2">Contact Email</label><input type="email" value={settingsForm.contactEmail} onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" /></div>
                <div><label className="block text-gray-700 text-sm mb-2">Resume Download URL</label><input type="url" value={settingsForm.resumeUrl} onChange={(e) => setSettingsForm({ ...settingsForm, resumeUrl: e.target.value })} placeholder="/resume.pdf" className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" /></div>
                <button onClick={handleSaveSettings} disabled={savingSettings} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition">
                  {savingSettings ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
                  {savingSettings ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ============ MODALS ============ */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white p-5 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                  {editingProject ? <Edit2 size={16} className="text-white" /> : <Plus size={16} className="text-white" />}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
              </div>
              <button onClick={() => setShowProjectModal(false)} className="p-2 rounded-xl hover:bg-gray-100 transition"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-5">
              <ImageUpload onImageUploaded={(url, id) => { setImageUrl(url); setImagePublicId(id); }} existingImage={imageUrl} onRemove={() => { setImageUrl(null); setImagePublicId(null); }} />
              <input type="text" placeholder="Project Name" value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition" />
              <textarea placeholder="Description" rows={3} value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition" />
              <input type="text" placeholder="Technologies (comma separated)" value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <input type="url" placeholder="GitHub URL" value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <input type="url" placeholder="Live Demo URL (optional)" value={projectForm.live} onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <button onClick={handleSaveProject} disabled={savingProject} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold shadow-sm hover:shadow-md transition disabled:opacity-50">
                {savingProject ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingProject ? 'Update Project' : 'Create Project')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setShowSkillModal(false)} className="p-2 rounded-xl hover:bg-gray-100"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-5">
              <input type="text" placeholder="Skill Name" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <div>
                <label className="text-gray-700 text-sm">Level: {isNaN(skillForm.level) ? 0 : skillForm.level}%</label>
                <input type="range" min="0" max="100" value={isNaN(skillForm.level) ? 0 : skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) || 0 })} className="w-full mt-2" />
              </div>
              <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200">
                <option value="technical">Technical</option>
                <option value="tools">Tools & DevOps</option>
                <option value="soft">Soft Skills</option>
              </select>
              <input type="number" placeholder="Order (lower = first)" value={skillForm.order} onChange={(e) => setSkillForm({ ...skillForm, order: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={skillForm.isVisible} onChange={(e) => setSkillForm({ ...skillForm, isVisible: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
                <span className="text-gray-700">Visible on website</span>
              </label>
              <button onClick={handleSaveSkill} disabled={savingSkill} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold shadow-sm hover:shadow-md transition">
                {savingSkill ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingSkill ? 'Update Skill' : 'Create Skill')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{editingSocial ? 'Edit Social Link' : 'Add Social Link'}</h2>
              <button onClick={() => setShowSocialModal(false)} className="p-2 rounded-xl hover:bg-gray-100"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-5">
              <input type="text" placeholder="Platform (e.g., GitHub, LinkedIn)" value={socialForm.platform} onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <input type="url" placeholder="URL" value={socialForm.url} onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <input type="text" placeholder="Icon name" value={socialForm.icon} onChange={(e) => setSocialForm({ ...socialForm, icon: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <input type="number" placeholder="Order" value={socialForm.order} onChange={(e) => setSocialForm({ ...socialForm, order: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={socialForm.isActive} onChange={(e) => setSocialForm({ ...socialForm, isActive: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
                <span className="text-gray-700">Active</span>
              </label>
              <button onClick={handleSaveSocial} disabled={savingSocial} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold shadow-sm hover:shadow-md transition">
                {savingSocial ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingSocial ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showTestimonialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white p-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowTestimonialModal(false)} className="p-2 rounded-xl hover:bg-gray-100"><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-5">
              <ImageUpload onImageUploaded={(url, id) => { setTestimonialImageUrl(url); setTestimonialImagePublicId(id); }} existingImage={testimonialImageUrl} onRemove={() => { setTestimonialImageUrl(null); setTestimonialImagePublicId(null); }} />
              <input type="text" placeholder="Client Name" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <input type="text" placeholder="Company (optional)" value={testimonialForm.company || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <input type="text" placeholder="Position (optional)" value={testimonialForm.position || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, position: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <textarea placeholder="Testimonial Content" rows={4} value={testimonialForm.content} onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <div>
                <label className="text-gray-700 text-sm">Rating: {testimonialForm.rating} stars</label>
                <input type="range" min="1" max="5" value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })} className="w-full mt-2" />
              </div>
              <input type="number" placeholder="Order" value={testimonialForm.order} onChange={(e) => setTestimonialForm({ ...testimonialForm, order: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-800 border border-gray-200" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={testimonialForm.isVisible} onChange={(e) => setTestimonialForm({ ...testimonialForm, isVisible: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
                <span className="text-gray-700">Visible on website</span>
              </label>
              <button onClick={handleSaveTestimonial} disabled={savingTestimonial} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-semibold shadow-sm hover:shadow-md transition">
                {savingTestimonial ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (editingTestimonial ? 'Update Testimonial' : 'Create Testimonial')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}