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
  Loader2
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

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

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'messages' | 'projects'>('messages');
  const [loading, setLoading] = useState(true);
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

  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin/login');
    }
  }, [router]);

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [messagesRes, projectsRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/projects'),
      ]);

      const messagesData = await messagesRes.json();
      const projectsData = await projectsRes.json();

      setMessages(messagesData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Delete message with immediate UI update
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, { method: 'DELETE' });

      if (response.ok) {
        // Immediately remove from UI
        setMessages(messages.filter(m => m.id !== id));
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred');
    }
  };

  // ✅ FIXED: Mark message as read with immediate UI update
  const handleMarkRead = async (id: string, isRead: boolean) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !isRead }),
      });

      if (response.ok) {
        // Immediately update UI
        setMessages(messages.map(m =>
          m.id === id ? { ...m, isRead: !isRead } : m
        ));
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  // ✅ FIXED: Delete project with immediate UI update
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project? This will also delete the image.')) return;

    try {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });

      if (response.ok) {
        // Immediately remove from UI
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred');
    }
  };

  // ✅ FIXED: Save project with immediate UI update
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

        if (response.ok) {
          const updatedProject = await response.json();
          // Immediately update UI for edit
          setProjects(projects.map(p =>
            p.id === editingProject.id ? updatedProject : p
          ));
        }
      } else {
        response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData),
        });

        if (response.ok) {
          const newProject = await response.json();
          // Immediately add to UI
          setProjects([newProject, ...projects]);
        }
      }

      if (response?.ok) {
        setShowProjectModal(false);
        resetProjectForm();
      } else {
        alert('Failed to save project');
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('An error occurred');
    } finally {
      setSavingProject(false);
    }
  };

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
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'messages'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <Mail size={18} />
            Messages ({messages.filter(m => !m.isRead).length})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeTab === 'projects'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <FolderGit2 size={18} />
            Projects ({projects.length})
          </button>
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

        {/* Projects Tab */}
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
                    <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-purple-600/20 rounded text-xs text-purple-400">
                          {tech}
                        </span>
                      ))}
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
          </div>
        )}
      </div>

      {/* Project Modal - Keep as is */}
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
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Description *</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
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
                  className="w-full px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">Live Demo URL (optional)</label>
                <input
                  type="url"
                  value={projectForm.live}
                  onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
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
    </div>
  );
}