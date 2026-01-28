'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';

export default function Page6() {
  const router = useRouter();

  const handlePrevious = () => {
    router.push('/forms/page5');
  };

  const handleNext = () => {
    router.push('/forms/page7');
  };

  return (
    <>
      <FormsHeader currentStep="income" />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                We're off to a good start
              </h1>
              <p className="text-xl text-gray-700 mb-2">
                Now let's work on your 2025 income.
              </p>
              <p className="text-lg text-blue-600 font-medium">
                We've got you covered with the new tax changes.
              </p>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200 mt-12">
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
                className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
