"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUploaded: (url: string, publicId: string) => void;
  existingImage?: string | null;
  onRemove?: () => void;
}

export default function ImageUpload({ onImageUploaded, existingImage, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(existingImage || null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setUploading(true);
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        
        const data = await response.json();
        setPreview(data.url);
        onImageUploaded(data.url, data.publicId);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleRemove = () => {
    setPreview(null);
    onRemove?.();
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative">
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={200}
            className="rounded-lg object-cover w-full h-48"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-600 rounded-full hover:bg-red-700 transition"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
            ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 hover:border-purple-500/50'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          {uploading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
              <span className="text-gray-400">Uploading...</span>
            </div>
          ) : (
            <>
              <p className="text-gray-400">Drag & drop an image here, or click to select</p>
              <p className="text-gray-500 text-sm mt-1">PNG, JPG, JPEG, WEBP up to 5MB</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}