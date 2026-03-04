'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import LogoutButton from './components/LogoutButton';
import { FileUpload } from '@/components/ui/file-upload';
import { Button as StatefulButton } from '@/components/ui/stateful-button';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      if (file) {
        formDataToSend.append('file', file);
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send email');
        return;
      }

      setMessage('Email sent successfully!');
      setFormData({ name: '', email: '', subject: '' });
      setFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-black">
      <div className="absolute top-4 right-4 z-50">
        <LogoutButton />
      </div>

      {/* Grid Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient fade */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Claymorphism Card */}
        <div
          className="rounded-3xl p-8 backdrop-blur-2xl"
          style={{
            background: 'linear-gradient(145deg, rgba(20, 30, 60, 0.85), rgba(10, 15, 35, 0.9))',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            boxShadow: '12px 12px 30px rgba(0, 0, 0, 0.5), -6px -6px 20px rgba(30, 58, 138, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-3xl font-bold text-transparent mb-2">
              Send Email
            </h1>
            <p className="text-neutral-400 text-sm">Send emails with attachments securely</p>
          </div>

          <div className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition"
                style={{
                  background: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 2px 2px 6px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition"
                style={{
                  background: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 2px 2px 6px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>

            {/* Subject Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Email subject"
                required
                className="w-full px-4 py-3 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition"
                style={{
                  background: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 2px 2px 6px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Attachment (Optional)</label>
              <FileUpload onChange={(files) => setFile(files[0] || null)} />
            </div>

            {/* Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm"
              >
                {error}
              </motion.div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-sm"
              >
                {message}
              </motion.div>
            )}

            {/* Submit Button — Green StatefulButton */}
            <StatefulButton
              onClick={handleSubmit}
              disabled={loading || !formData.name || !formData.email || !formData.subject}
              className="w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Email
            </StatefulButton>
          </div>

          {/* Footer */}
          <p className="text-xs text-neutral-500 text-center mt-6">
            ✓ Emails sent securely | No data stored
          </p>
        </div>
      </motion.div>
    </div>
  );
}
