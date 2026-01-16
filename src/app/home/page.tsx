// src/app/home/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/layout/Layout';

export default function HomePage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace('/login');
    }
  }, [loading, currentUser, router]);

  if (loading || !currentUser) {
    return (
      <Layout>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600' />
            <p className='mt-4 text-gray-600'>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='min-h-screen bg-gray-100'>
        <header className='bg-white shadow'>
          <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-blue-600'>Home</h1>
          </div>
        </header>
      </div>
    </Layout>
  );
}
