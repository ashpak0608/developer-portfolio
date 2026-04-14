"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/admin/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      if (res.ok) {
        sessionStorage.setItem('adminAuth', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Incorrect password');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 w-96">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-purple-600/20 rounded-full">
            <Shield className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Login</h1>
        <p className="text-gray-400 text-center mb-6">Enter your password to access the dashboard</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg text-white border border-white/20 focus:border-purple-500 focus:outline-none transition"
                autoFocus
              />
            </div>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}