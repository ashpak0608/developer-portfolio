"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LogOut,
  Mail,
  Trash2,
  CheckCircle,
  Circle,
  Plus,
  Edit2,
  X,
  FolderGit2,
  Loader2,
  Code2,
  Pencil,
  Eye,
  EyeOff
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
  createdAt: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  order: number;
  isVisible: boolean;
}

// ============ MAIN COMPONENT ============
export default function AdminDashboard() {
  const router = useRouter();

  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'projects' | 'skills'>('messages');
  const [loading, setLoading] = useState(true);

  // Project Modal State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    technologies: '',
    github: '',
    live: '',
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePublicId, setImagePublicId] = useState<string | null>(null);
  const [savingProject, setSavingProject] = useState(false);

  // Skill Modal State
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    level: 80,
    category: 'technical',
    order: 0,
    isVisible: true,
  });
  const [savingSkill, setSavingSkill] = useState(false);

  // ============ AUTHENTICATION ============
  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin/login');
    }
  }, [router]);

  // ============ FETCH DATA ============
  const fetchData = async () => {
    setLoading(true);
    try {
      const [messagesRes, projectsRes, skillsRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/projects'),
        fetch('/api/skills'),
      ]);

      const messagesData = await messagesRes.json();
      const projectsData = await projectsRes.json();
      const skillsData = await skillsRes.json();

      setMessages(Array.isArray(messagesData) ? messagesData : []);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setSkills(Array.isArray(skillsData) ? skillsData : []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
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
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleMarkRead = async (id: string, isRead: boolean) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: !isRead }),
    });
    setMessages(messages.map(m =>
      m.id === id ? { ...m, isRead: !isRead } : m
    ));
  };

  // ============ PROJECT HANDLERS ============
  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectForm({
      name: '',
      description: '',
      technologies: '',
      github: '',
      live: '',
    });
    setImageUrl(null);
    setImagePublicId(null);
  };

  const editProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      technologies: project.technologies.join(', '),
      github: project.github,
      live: project.live || '',
    });
    setImageUrl(project.imageUrl || null);
    setImagePublicId(project.imagePublicId || null);
    setShowProjectModal(true);
  };

  const handleSaveProject = async () => {
    setSavingProject(true);
    try {
      const projectData = {
        name: projectForm.name,
        description: projectForm.description,
        technologies: projectForm.technologies.split(',').map(t => t.trim()),
        github: projectForm.github,
        live: projectForm.live || null,
        imageUrl: imageUrl,
        imagePublicId: imagePublicId,
      };

      let response;
      if (editingProject) {
        response = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
      } else {
        response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });
      }

      if (response.ok) {
        await fetchData();
        setShowProjectModal(false);
        resetProjectForm();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project');
    } finally {
      setSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project? This will also delete the image.')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    await fetchData();
  };

  // ============ SKILL HANDLERS ============
  const resetSkillForm = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      level: 80,
      category: 'technical',
      order: 0,
      isVisible: true,
    });
  };

  const editSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      order: skill.order,
      isVisible: skill.isVisible,
    });
    setShowSkillModal(true);
  };

  const handleSaveSkill = async () => {
    if (!skillForm.name.trim()) {
      alert('Skill name is required');
      return;
    }

    setSavingSkill(true);
    try {
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : '/api/skills';
      const method = editingSkill ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: skillForm.name,
          level: Number(skillForm.level),
          category: skillForm.category,
          order: Number(skillForm.order),
          isVisible: skillForm.isVisible,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchData();
        setShowSkillModal(false);
        resetSkillForm();
        alert('Skill saved successfully!');
      } else {
        alert(data.error || 'Failed to save skill');
      }
    } catch (error) {
      console.error('Failed to save skill:', error);
      alert('Failed to save skill');
    } finally {
      setSavingSkill(false);
    }
  };
  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    await fetch(`/api/skills/${id}`, { method: 'DELETE' });
    await fetchData();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  // ============ LOADING STATE ============
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
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'messages'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <Mail size={18} />
            Messages ({messages.filter(m => !m.isRead).length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'projects'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <FolderGit2 size={18} />
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'skills'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            <Code2 size={18} />
            Skills ({skills.length})
          </button>
        </div>

        {/* ============ MESSAGES TAB ============ */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-6 rounded-2xl transition-all ${msg.isRead
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-purple-900/20 border border-purple-500/50 shadow-lg shadow-purple-500/10'
                    }`}
                >
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
                        className={`p-2 rounded-lg transition ${msg.isRead
                          ? 'text-gray-400 hover:text-green-400'
                          : 'text-green-400 hover:text-green-300'
                          }`}
                        title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                      >
                        {msg.isRead ? <Circle size={20} /> : <CheckCircle size={20} />}
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-400 transition"
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
                resetProjectForm();
                setShowProjectModal(true);
              }}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition"
            >
              <Plus size={18} />
              Add Project
            </button>

            {projects.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <FolderGit2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No projects yet. Click "Add Project" to get started.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition"
                  >
                    {project.imageUrl && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={project.imageUrl}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-purple-600/20 rounded text-xs text-purple-400">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editProject(project)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 rounded text-blue-400 text-sm hover:bg-blue-600/30 transition"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-600/20 rounded text-red-400 text-sm hover:bg-red-600/30 transition"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
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
                resetSkillForm();
                setShowSkillModal(true);
              }}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition"
            >
              <Plus size={18} />
              Add Skill
            </button>

            {skills.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No skills yet. Click "Add Skill" to get started.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`bg-white/5 rounded-xl p-4 border transition ${skill.isVisible ? 'border-white/10' : 'border-red-500/30 opacity-60'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <p className="text-xs text-gray-400">{skill.category}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => editSkill(skill)}
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
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="text-gray-500">Order: {skill.order}</span>
                      {!skill.isVisible && (
                        <span className="text-red-400 flex items-center gap-1">
                          <EyeOff size={10} /> Hidden
                        </span>
                      )}
                      {skill.isVisible && (
                        <span className="text-green-400 flex items-center gap-1">
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
      </div>

      {/* ============ PROJECT MODAL ============ */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="sticky top-0 bg-gray-900 p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={() => setShowProjectModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <ImageUpload
                onImageUploaded={(url, publicId) => {
                  setImageUrl(url);
                  setImagePublicId(publicId);
                }}
                existingImage={imageUrl}
                onRemove={() => {
                  setImageUrl(null);
                  setImagePublicId(null);
                }}
              />

              <div>
                <label className="block text-gray-300 text-sm mb-1">Project Name *</label>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Description *</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                  placeholder="Describe your project..."
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Technologies (comma separated) *
                </label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  placeholder="React, Node.js, TypeScript"
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">GitHub URL *</label>
                <input
                  type="url"
                  value={projectForm.github}
                  onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Live Demo URL (optional)</label>
                <input
                  type="url"
                  value={projectForm.live}
                  onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                  placeholder="https://myproject.com"
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveProject}
                  disabled={savingProject || !projectForm.name || !projectForm.description || !projectForm.technologies || !projectForm.github}
                  className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingProject ? 'Saving...' : (editingProject ? 'Update' : 'Create')}
                </button>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="px-6 py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ SKILL MODAL ============ */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-white/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button
                onClick={() => setShowSkillModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Skill Name *</label>
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g., React, TypeScript, Docker"
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Proficiency Level (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-center text-purple-400 font-semibold mt-1">{skillForm.level}%</div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="tools">Tools & DevOps</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Display Order</label>
                <input
                  type="number"
                  value={skillForm.order}
                  onChange={(e) => setSkillForm({ ...skillForm, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={skillForm.isVisible}
                  onChange={(e) => setSkillForm({ ...skillForm, isVisible: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20"
                />
                <span className="text-gray-300">Visible on website</span>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveSkill}
                  disabled={savingSkill || !skillForm.name.trim()}
                  className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingSkill ? 'Saving...' : (editingSkill ? 'Update' : 'Create')}
                </button>
                <button
                  onClick={() => setShowSkillModal(false)}
                  className="px-6 py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}