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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900">
                FoQuest
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/calendar"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Calendar
              </Link>
              <Link
                href="/dashboard/tasks"
                className="text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Tasks
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                
              </span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
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
