'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';

export default function Page2() {
  const router = useRouter();
  const [filingStatus, setFilingStatus] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handlePrevious = () => {
    router.push('/forms/page1');
  };

  const handleNext = () => {
    router.push(`/forms/page3?filingStatus=${filingStatus}`);
  };

  const filingStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married_joint', label: 'Married Filing Jointly' },
    { value: 'married_separate', label: 'Married Filing Separately' },
    { value: 'head_household', label: 'Head of Household' },
    { value: 'qualifying_surviving_spouse', label: 'Qualifying Surviving Spouse' },
  ];

  return (
    <>
      <FormsHeader currentStep="personal" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Filing Status</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">What's your filing status?</h2>

          <div className="space-y-3">
            {filingStatusOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="filingStatus"
                  value={option.value}
                  checked={filingStatus === option.value}
                  onChange={(e) => setFilingStatus(e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-gray-900 font-medium">{option.label}</span>
              </label>
            ))}

            <label className="flex items-center p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="filingStatus"
                value="not_sure"
                checked={filingStatus === 'not_sure'}
                onChange={(e) => setFilingStatus(e.target.value)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-900 font-medium">I'm not sure - help me decide</span>
            </label>
          </div>

          {/* Help Links */}
          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Which filing status should I use?
            </button>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Which filing status gives the biggest refund?
            </button>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              More Information
            </button>
          </div>

          {/* Help Content */}
          {showHelp && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="font-semibold text-gray-900 mb-2">Filing Status Guide</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>
                  <strong>Single:</strong> Unmarried, divorced, or legally separated as of the last day of the tax year.
                </li>
                <li>
                  <strong>Married Filing Jointly:</strong> Married couples filing one return together, combining income and deductions.
                </li>
                <li>
                  <strong>Married Filing Separately:</strong> Married couples filing separate returns with their own income and deductions.
                </li>
                <li>
                  <strong>Head of Household:</strong> Unmarried and paid more than half the costs of keeping up a home for a qualifying person.
                </li>
                <li>
                  <strong>Qualifying Surviving Spouse:</strong> Your spouse died in the previous two years and you have a dependent child.
                </li>
              </ul>
            </div>
          )}
        </section>

        <div className="flex justify-between">
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
    </>
  );
}
