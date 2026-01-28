'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';

export default function Page5() {
  const router = useRouter();
  const [hasIdentityPin, setHasIdentityPin] = useState('');
  const [phones, setPhones] = useState({
    primary: '(657) 549-2046',
    primaryVerified: false,
    secondary: '',
    secondaryVerified: false,
    tertiary: '',
    tertiaryVerified: false
  });

  const handlePhoneChange = (field: string, value: string | boolean) => {
    setPhones(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrevious = () => {
    router.push('/forms/page4');
  };

  const handleNext = () => {
    router.push('/forms/page6');
  };

  return (
    <>
      <FormsHeader currentStep="personal" />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Let's review your personal information.
            </h1>

            {/* Your Information Section */}
            <section className="mb-8 border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 font-medium mb-1">Name</p>
                  <p className="text-gray-900">Thomas M Hubbs</p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium mb-1">SSN</p>
                  <p className="text-gray-900">611-74-2450</p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium mb-1">Date of birth</p>
                  <p className="text-gray-900">March 22, 1964</p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium mb-1">Address</p>
                  <p className="text-gray-900">
                    1709 Hollowback Dr<br />
                    Leander, TX 78641
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 font-medium mb-1">Filing status</p>
                  <p className="text-gray-900">Single</p>
                </div>
              </div>
            </section>

            {/* Identity Protection PIN Section */}
            <section className="mb-8 border-b pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Identity Protection PIN</h2>

              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Did you have an Identity Protection PIN?
                </h3>
                <div className="flex space-x-6 mb-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasIdentityPin"
                      value="yes"
                      checked={hasIdentityPin === 'yes'}
                      onChange={(e) => setHasIdentityPin(e.target.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasIdentityPin"
                      value="no"
                      checked={hasIdentityPin === 'no'}
                      onChange={(e) => setHasIdentityPin(e.target.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  You can enter your Identity Protection PIN information here or later in the
                  Miscellaneous Forms and Topics section.
                </p>
              </div>
            </section>

            {/* Phone Number Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Phone Number</h2>
              <p className="text-sm text-gray-600 mb-4">
                Listed below are your account phone number(s). You can add up to three phone numbers.
                We'll only use them to help you access your account.
              </p>

              {/* Primary Phone */}
              <div className="mb-4 p-4 border border-gray-300 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      value={phones.primary}
                      onChange={(e) => handlePhoneChange('primary', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="(###) ###-####"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Verified:
                    </label>
                    <div className="flex items-center h-10">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={phones.primaryVerified}
                          onChange={(e) => handlePhoneChange('primaryVerified', e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Verified</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Phone */}
              <div className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Second Phone Number:
                    </label>
                    <input
                      type="tel"
                      value={phones.secondary}
                      onChange={(e) => handlePhoneChange('secondary', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500 bg-white"
                      placeholder="(###) ###-####"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Adding another phone number will help you access your account.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Verified:
                    </label>
                    <div className="flex items-center h-10">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={phones.secondaryVerified}
                          onChange={(e) => handlePhoneChange('secondaryVerified', e.target.checked)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Verified</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tertiary Phone (Optional) */}
              {phones.secondary && (
                <div className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Third Phone Number:
                      </label>
                      <input
                        type="tel"
                        value={phones.tertiary}
                        onChange={(e) => handlePhoneChange('tertiary', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500 bg-white"
                        placeholder="(###) ###-####"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Optional third phone number for account access.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Verified:
                      </label>
                      <div className="flex items-center h-10">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={phones.tertiaryVerified}
                            onChange={(e) => handlePhoneChange('tertiaryVerified', e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Verified</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
