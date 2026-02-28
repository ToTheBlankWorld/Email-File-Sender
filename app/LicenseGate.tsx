'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function LicenseGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLicensePage = pathname === '/license-verify';

  useEffect(() => {
    const isVerified = localStorage.getItem('licenseVerified') === 'true';

    // If not verified and trying to access non-license pages, redirect to license
    if (!isVerified && !isLicensePage) {
      router.push('/license-verify');
    }

    // If verified and on license page, redirect to home
    if (isVerified && isLicensePage) {
      router.push('/');
    }
  }, [pathname, isLicensePage, router]);

  return <>{children}</>;
}
