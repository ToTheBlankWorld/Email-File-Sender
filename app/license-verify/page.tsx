'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export default function LicenseVerify() {
  const [licenseKey, setLicenseKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/verify-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ licenseKey }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setVerified(true);
        setMessage('✅ License verified successfully!');
        localStorage.setItem('licenseVerified', 'true');
        localStorage.setItem('verifiedAt', new Date().toISOString());
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setError(data.error || '❌ Invalid license key. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
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
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🔐</span>
              </div>
            </div>
            <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-3xl font-bold text-transparent mb-2">
              License Verification
            </h1>
            <p className="text-neutral-400 text-sm">Enter your license key to access Email Sender</p>
          </div>

          {verified ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="rounded-lg border border-cyan-500/50 bg-cyan-500/10 p-4 text-center">
                <p className="text-cyan-300 font-semibold text-lg mb-2">✅ License Verified!</p>
                <p className="text-cyan-200 text-sm">Redirecting to email sender...</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              {/* License Key Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">License Key</label>
                <input
                  type="password"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="Enter your license key"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition font-mono tracking-widest"
                  disabled={loading}
                  autoFocus
                />
                <p className="text-xs text-neutral-500">Your license key is case-sensitive</p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm font-semibold"
                >
                  {error}
                </motion.div>
              )}

              {/* Success Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm font-semibold"
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
                className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? '⏳ Verifying...' : '🔓 Verify License'}
              </motion.button>

              {/* Info Box */}
              <div className="p-3 rounded-lg bg-neutral-500/10 border border-neutral-500/30 text-neutral-300 text-xs text-center">
                <p>Enter your license key to proceed</p>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">
              🔐 Secure verification • No data collected
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
