'use client';

import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Calendar from '@/components/Calendar'; 

export default function CalendarPage() {
  const { user, logout, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  // demo events; wire real data later
  const demoEvents = [
    { id: '1', date: '2025-09-29', title: 'Yuh' },
    { id: '2', date: '2025-10-02', title: 'Time to lock in' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="text-sm text-indigo-600">← Home</Link>
          <span className="text-sm text-gray-400">/</span>
          <Link href="/dashboard" className="text-sm text-indigo-600">Dashboard</Link>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm text-gray-700">Calendar</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Calendar</h1>

        
        <Calendar
          events={demoEvents}
          onDateChange={(iso) => {
            // plug in fetch/filter, modal, or router actions here
            // console.log('Selected date:', iso);
          }}
        />
      </main>
    </div>
  );
}
