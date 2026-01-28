'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';
import FormDrawer from '../../../components/forms/FormDrawer';

export default function Page3() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filingStatus = searchParams.get('filingStatus');

  const [spouseData, setSpouseData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    suffix: '',
    occupation: '',
    ssn: '',
    dateOfBirth: '',
    canBeClaimedAsDependent: '',
    wantsPresidentialFundContribution: '',
    isLegallyBlind: '',
    hasPassedAway: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpouseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrevious = () => {
    router.push('/forms/page2');
  };

  const handleNext = () => {
    router.push('/forms/page4');
  };

  const isMarriedFilingJointly = filingStatus === 'married_joint';

  return (
    <>
      <FormsHeader currentStep="personal" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isMarriedFilingJointly ? 'Spouse Information' : 'Additional Information'}
        </h1>

        {isMarriedFilingJointly && (
          <section className="mb-8 border-b pb-4">
            <h2 className="text-xl font-semibold mb-4">Spouse Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={spouseData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Middle Initial
                </label>
                <input
                  name="middleInitial"
                  value={spouseData.middleInitial}
                  onChange={handleChange}
                  maxLength={1}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="M"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={spouseData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jr., Sr., III
                </label>
                <input
                  name="suffix"
                  value={spouseData.suffix}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Jr., Sr., III"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  name="occupation"
                  value={spouseData.occupation}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Cashier, homemaker, retired, student, etc."
                />
                <p className="text-xs text-gray-500 mt-1">
                  (Cashier, homemaker, retired, student, etc.)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Security Number
                </label>
                <input
                  name="ssn"
                  value={spouseData.ssn}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="123-45-6789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  name="dateOfBirth"
                  type="date"
                  value={spouseData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">(mm/dd/yyyy)</p>
              </div>
            </div>

            {/* Spouse Questions */}
            <div className="mt-6 space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Can a parent (or somebody else) claim {spouseData.firstName || 'your spouse'} as a dependent on their return? (very uncommon)
                </h3>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="canBeClaimedAsDependent"
                      value="yes"
                      checked={spouseData.canBeClaimedAsDependent === 'yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="canBeClaimedAsDependent"
                      value="no"
                      checked={spouseData.canBeClaimedAsDependent === 'no'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Does {spouseData.firstName || 'your spouse'} want to contribute $3 to the Presidential Election Campaign Fund?
                </h3>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wantsPresidentialFundContribution"
                      value="yes"
                      checked={spouseData.wantsPresidentialFundContribution === 'yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="wantsPresidentialFundContribution"
                      value="no"
                      checked={spouseData.wantsPresidentialFundContribution === 'no'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Is {spouseData.firstName || 'your spouse'} legally blind?
                </h3>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isLegallyBlind"
                      value="yes"
                      checked={spouseData.isLegallyBlind === 'yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isLegallyBlind"
                      value="no"
                      checked={spouseData.isLegallyBlind === 'no'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-medium text-gray-900 mb-3">
                  Has {spouseData.firstName || 'your spouse'} passed away before the filing of this tax return?
                </h3>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasPassedAway"
                      value="yes"
                      checked={spouseData.hasPassedAway === 'yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasPassedAway"
                      value="no"
                      checked={spouseData.hasPassedAway === 'no'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        )}

        {!isMarriedFilingJointly && (
          <section className="mb-8">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Let's double-check your info
                  </h3>
                  <div className="bg-white border border-yellow-200 rounded-md p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Switch Filing Status?
                    </h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Changing Your Filing Status
You selected Married Filing Jointly. If you switch to a different filing status, all information entered for Tracey (W-2s, interest income, etc.) will be permanently deleted.
                    </p>
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-3"
                    >
                      Your options:
                    </button>
                    <p className="text-sm text-gray-700">
                      Keep Married Filing Jointly — Go back to the Filing Status screen and reselect it
Change filing status — Click Save and Continue (Tracey's information will be removed)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

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
            {!isMarriedFilingJointly ? 'Save and Continue' : 'Next'}
          </button>
        </div>
      </div>
    </div>

      <FormDrawer currentPage="Page 3" pageTitle="Spouse Information" />
    </>
  );
}
