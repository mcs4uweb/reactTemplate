'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';

export default function Page8() {
  const router = useRouter();
  const [entryMethod, setEntryMethod] = useState('');

  const handlePrevious = () => {
    router.push('/forms/page7');
  };

  const handleNext = () => {
    if (entryMethod === 'manual') {
      router.push('/forms/page9'); // Go to manual W-2 entry form
    } else if (entryMethod === 'upload') {
      router.push('/forms/page10'); // Go to upload page
    } else if (entryMethod === 'scan') {
      router.push('/forms/page11'); // Go to scan page
    }
  };

  return (
    <>
      <FormsHeader currentStep="income" />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              How do you want to enter your W-2?
            </h1>

            <section className="mb-8">
              <div className="space-y-4">
                <label className="flex items-start p-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="entryMethod"
                    value="manual"
                    checked={entryMethod === 'manual'}
                    onChange={(e) => setEntryMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <svg
                        className="h-6 w-6 text-gray-600 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span className="text-lg font-semibold text-gray-900">
                        Manually enter W-2 information
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-8">
                      Type in the information from your W-2 form
                    </p>
                  </div>
                </label>

                <label className="flex items-start p-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="entryMethod"
                    value="upload"
                    checked={entryMethod === 'upload'}
                    onChange={(e) => setEntryMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <svg
                        className="h-6 w-6 text-gray-600 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-lg font-semibold text-gray-900">
                        Upload a file
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-8">
                      Upload a photo or PDF of your W-2
                    </p>
                  </div>
                </label>

                <label className="flex items-start p-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="entryMethod"
                    value="scan"
                    checked={entryMethod === 'scan'}
                    onChange={(e) => setEntryMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <svg
                        className="h-6 w-6 text-gray-600 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-lg font-semibold text-gray-900">
                        Scan with phone
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-8">
                      Use your mobile device to scan your W-2
                    </p>
                  </div>
                </label>
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
                disabled={!entryMethod}
                className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
