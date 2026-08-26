"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, CheckCircle, AlertCircle, FileText, ArrowLeft } from 'lucide-react';

export default function ResumeUploadPage() {
  const router = useRouter();
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
        router.push('/admin/dashboard');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Import from Resume</h1>
              <p className="text-gray-500 text-sm">
                Upload your resume PDF and let AI parse your data
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-purple-400 transition">
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
                <Upload className="w-10 h-10 text-purple-600" />
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

          {/* Status Messages */}
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

          {/* Action Buttons */}
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
        </div>

        {/* Info Section */}
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
    </div>
  );
}