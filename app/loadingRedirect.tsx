'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoadingRedirectProps {
  session: any;
}

export default function LoadingRedirect({ session }: LoadingRedirectProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [session, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <div className="spinner"/>}
    </div>
  );
}