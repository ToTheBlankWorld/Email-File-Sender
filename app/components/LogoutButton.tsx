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
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleLogout}
      className="clay-pill p-2.5 text-blue-400 hover:text-blue-300 transition-colors duration-300"
      title="Logout"
    >
      {/* Power/shutdown icon — modern & sleek */}
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    </motion.button>
  );
}
