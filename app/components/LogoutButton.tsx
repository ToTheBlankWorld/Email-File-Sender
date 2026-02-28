'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('licenseVerified');
    localStorage.removeItem('verifiedAt');
    router.push('/license-verify');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="p-2 rounded-full border border-red-400 bg-red-500/20 text-red-300 hover:shadow-lg hover:shadow-red-500/50 transition"
      title="Logout"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
      </svg>
    </motion.button>
  );
}
