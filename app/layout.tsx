import type { Metadata } from 'next';
import './globals.css';
import LicenseGate from './LicenseGate';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Email Sender - Secure & Simple',
  description: 'Send emails securely with attachments using our glassmorphic form',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className="bg-black text-white min-h-screen">
        <Providers>
          <LicenseGate>{children}</LicenseGate>
        </Providers>
      </body>
    </html>
  );
}
