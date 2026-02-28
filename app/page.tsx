'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import LogoutButton from './components/LogoutButton';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glassmorphism Card */}
        <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-2xl shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-3xl font-bold text-transparent mb-2">
              Send Email
            </h1>
            <p className="text-neutral-400 text-sm">Send emails with attachments securely</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
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
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
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
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">Attachment (Optional)</label>
              <label className="flex items-center justify-center px-4 py-6 rounded-lg border-2 border-dashed border-white/20 hover:border-violet-400 transition cursor-pointer bg-white/5 hover:bg-white/10">
                <div className="text-center">
                  <p className="text-sm text-neutral-400">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">Max 25MB</p>
                </div>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
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

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:shadow-lg hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Sending...' : 'Send Email'}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-xs text-neutral-500 text-center mt-6">
            ✓ Emails sent securely | No data stored
          </p>
        </div>
      </motion.div>
    </div>
  );
}
