'use client';

import React, { useState } from 'react';

interface FormDrawerProps {
  currentPage: string;
  pageTitle: string;
}

export default function FormDrawer({ currentPage, pageTitle }: FormDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Drawer Toggle Button */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className={`fixed top-1/2 -translate-y-1/2 z-40 bg-blue-600 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ${
          isDrawerOpen ? 'right-80' : 'right-0'
        }`}
        aria-label="Toggle drawer"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${isDrawerOpen ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Information</h2>

          {/* Current Page Display */}
          <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-semibold text-indigo-900">Current Section</h3>
            </div>
            <p className="text-sm font-medium text-indigo-700">{pageTitle}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Tax Filing Tips</h3>
              <p className="text-sm text-gray-700">
                Make sure to have all your documents ready before starting your tax return.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700">
                Contact our support team if you have any questions about filling out your tax forms.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Important Dates</h3>
              <p className="text-sm text-gray-700">
                The tax filing deadline is typically April 15th each year.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
}
