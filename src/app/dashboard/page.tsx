// src/app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onValue, ref, push, set, remove } from 'firebase/database';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { Bell, Trash2 } from 'lucide-react';

interface ReminderItem {
  id: string;
  title: string;
  date?: string;
  notes?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [reminderOpen, setReminderOpen] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNotes, setReminderNotes] = useState('');
  const [localReminders, setLocalReminders] = useState<ReminderItem[]>([]);

  // Load reminders for this user from Firebase
  useEffect(() => {
    if (!currentUser) return;
    const uid = currentUser.UserId;
    const remindersRef = ref(db, `reminders/${uid}`);
    const unsub = onValue(remindersRef, (snap) => {
      const data = snap.val() as Record<
        string,
        { title?: string; date?: string; notes?: string }
      > | null;
      if (!data) {
        setLocalReminders([]);
        return;
      }
      const list: ReminderItem[] = Object.entries(data)
        .map(([id, r]) => ({
          id,
          title: (r.title || '').trim(),
          date: r.date || undefined,
          notes: r.notes || undefined,
        }))
        .filter((r) => r.title);
      // Sort by date (if present), then title
      list.sort((a, b) => {
        const ad = a.date ? Date.parse(a.date) : NaN;
        const bd = b.date ? Date.parse(b.date) : NaN;
        const aHas = Number.isFinite(ad);
        const bHas = Number.isFinite(bd);
        if (aHas && bHas) return ad - bd;
        if (aHas) return -1;
        if (bHas) return 1;
        return a.title.localeCompare(b.title);
      });
      setLocalReminders(list);
    });
    return () => unsub();
  }, [currentUser]);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace('/login');
    }
  }, [loading, currentUser, router]);

  // Reminder helpers
  const resetReminderForm = () => {
    setReminderTitle('');
    setReminderDate('');
    setReminderNotes('');
  };
  const saveReminder = async () => {
    const title = reminderTitle.trim();
    if (!title) return;
    if (!currentUser) return;
    const uid = currentUser.UserId;
    const remindersRef = ref(db, `reminders/${uid}`);
    const newRef = push(remindersRef);
    await set(newRef, {
      title,
      date: reminderDate || null,
      notes: reminderNotes || null,
      createdAt: Date.now(),
    });
    resetReminderForm();
    setReminderOpen(false);
  };
  const deleteReminder = async (id: string) => {
    if (!currentUser) return;
    const uid = currentUser.UserId;
    await remove(ref(db, `reminders/${uid}/${id}`));
  };

  if (loading || !currentUser) {
    return (
      <Layout>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600' />
            <p className='mt-4 text-gray-600'>Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='min-h-screen bg-gray-100'>
        <header className='bg-white shadow'>
          <div className='mx-auto max-w-7xl px-4 py-3 flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-blue-600'>Dashboard</h1>
            </div>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => setReminderOpen(true)}
                className='inline-flex items-center gap-2 rounded-md border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50'
                aria-label='Add reminder'
                title='Add reminder'
              >
                <Bell className='h-4 w-4' />
                <span className='hidden sm:inline'>Add Reminder</span>
              </button>
            </div>
          </div>
        </header>

        <main className='mx-auto max-w-7xl px-3 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch'>
          <section className='w-full h-full flex flex-col rounded-lg bg-white p-3 md:p-4 shadow-sm border border-solid border-green-300'>
            <div className='mb-2 flex items-center justify-between'>
              <h2 className='text-lg font-semibold text-green-800'>
                Reminders
              </h2>
            </div>
            {localReminders.length === 0 ? (
              <div className='text-sm text-gray-600'>No reminders yet.</div>
            ) : (
              <ul className='divide-y divide-gray-200'>
                {localReminders.map((r) => (
                  <li key={r.id} className='py-2'>
                    <div className='flex items-start justify-between gap-4'>
                      <div>
                        <div className='font-medium text-gray-900'>
                          {r.title}
                        </div>
                        <div className='text-sm text-gray-700'>
                          {r.date ? (
                            <span className='mr-2'>Due: {r.date}</span>
                          ) : null}
                          {r.notes ? (
                            <span className='text-gray-500'>— {r.notes}</span>
                          ) : null}
                        </div>
                      </div>
                      <div className='shrink-0'>
                        <button
                          type='button'
                          onClick={() => deleteReminder(r.id)}
                          className='inline-flex items-center rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50'
                          aria-label={`Delete reminder ${r.title}`}
                          title='Delete reminder'
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>

        {reminderOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 px-4'>
            <div className='w-full max-w-md rounded-lg bg-white p-5 shadow-xl'>
              <h2 className='text-base font-semibold text-gray-900 flex items-center gap-2'>
                <Bell className='h-4 w-4' /> Add Reminder
              </h2>
              <div className='mt-4 space-y-3'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Title
                  </label>
                  <input
                    type='text'
                    value={reminderTitle}
                    onChange={(e) => setReminderTitle(e.target.value)}
                    placeholder='e.g., Renew registration'
                    className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Date
                  </label>
                  <input
                    type='date'
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Notes
                  </label>
                  <textarea
                    value={reminderNotes}
                    onChange={(e) => setReminderNotes(e.target.value)}
                    rows={3}
                    className='mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    placeholder='Optional details'
                  />
                </div>
              </div>
              <div className='mt-5 flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setReminderOpen(false);
                    resetReminderForm();
                  }}
                  className='inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={saveReminder}
                  disabled={!reminderTitle.trim()}
                  className='inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50'
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
