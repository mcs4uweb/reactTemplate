'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';
import FormDrawer from '../../../components/forms/FormDrawer';

export default function Page7() {
  const router = useRouter();
  const [w2Option, setW2Option] = useState('');

  const handlePrevious = () => {
    router.push('/forms/page6');
  };

  const handleNext = () => {
    if (w2Option === 'yes') {
      router.push('/forms/page8'); // Go to W-2 entry form
    } else {
      router.push('/forms/page9'); // Skip to next income section
    }
  };

  return (
    <>
      <FormsHeader currentStep="income" />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Your Wages (Form W-2)
            </h1>

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Are you ready to enter your W-2?
              </h2>

              <div className="space-y-3 mb-6">
                <label className="flex items-start p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="w2Option"
                    value="yes"
                    checked={w2Option === 'yes'}
                    onChange={(e) => setW2Option(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
                  />
                  <span className="ml-3 text-gray-900 font-medium">
                    Yes - I'll enter my W-2 now
                  </span>
                </label>

                <label className="flex items-start p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="w2Option"
                    value="no"
                    checked={w2Option === 'no'}
                    onChange={(e) => setW2Option(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
                  />
                  <span className="ml-3 text-gray-900 font-medium">
                    I don't have any W-2s
                  </span>
                </label>

                <label className="flex items-start p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="w2Option"
                    value="skip"
                    checked={w2Option === 'skip'}
                    onChange={(e) => setW2Option(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
                  />
                  <span className="ml-3 text-gray-900 font-medium">
                    Skip for now
                  </span>
                </label>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      You can come back and enter your W-2s later if you don't have them now.
                    </p>
                    <p className="text-sm text-blue-700 mt-2">
                      If you have a 1099 form, we'll work on that later.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                className="py-2 px-6 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!w2Option}
                className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <FormDrawer currentPage="Page 7" pageTitle="W-2 Selection" />
    </>
  );
}
