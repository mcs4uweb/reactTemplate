'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';
import FormDrawer from '../../../components/forms/FormDrawer';

export default function Page1() {
  const router = useRouter();
  const yourInfoRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    taxComfortLevel: '',
    firstName: '',
    middleInitial: '',
    lastName: '',
    ssn: '',
    mailingAddressType: '',
    country: '',
    territory: '',
    address: '',
    aptNo: '',
    city: '',
    state: '',
    zipCode: '',
    isUsResident: false,
    previousStateOfResidence: '',
    presidentialElectionFund: {
      taxpayer: false,
      spouse: false
    },
    canBeClaimedAsDependent: '',
    wantsPresidentialFundContribution: '',
    isLegallyBlind: '',
    hasPassedAway: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleNext = () => {
    router.push('/forms/page2');
  };

  useEffect(() => {
    if (formData.taxComfortLevel === 'comfortable' && yourInfoRef.current) {
      setTimeout(() => {
        yourInfoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [formData.taxComfortLevel]);

  return (
    <>
      <FormsHeader currentStep="personal" />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">U.S. Individual Income Tax Return</h1>

        <section className="mb-8 border-b pb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Questionnaire</h2>
          <h3 className="font-medium text-gray-900 mb-2">
            How comfortable do you feel doing your own taxes?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            This informs our recommendation, including expert help options.
          </p>
          <div className="space-y-3">
            <label className="flex items-start p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="taxComfortLevel"
                value="comfortable"
                checked={formData.taxComfortLevel === 'comfortable'}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">Comfortable on my own</span>
            </label>
            <label className="flex items-start p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="taxComfortLevel"
                value="want-help"
                checked={formData.taxComfortLevel === 'want-help'}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">I need help with my tax return</span>
            </label>
            <label className="flex items-start p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="taxComfortLevel"
                value="hand-off"
                checked={formData.taxComfortLevel === 'hand-off'}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-700">Prefer an expert handle my taxes</span>
            </label>
          </div>
        </section>

        {/* Security Section */}
        <section className="mb-8 border-b pb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">We take security seriously.</h2>
          </div>

          <p className="text-gray-700 mb-4">
            Your sensitive information is encrypted before being stored in our database. We use industry-standard encryption to protect critical data such as Social Security Numbers, email addresses, and other personally identifiable information.
          </p>

          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Example of Encrypted Data:</span>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-xs font-mono">
{`[{ssn: "qppMQV2aOHpyF+V5m0jiIK0Hp8ykS5YFfSj/6HJjfjIwMA==", ...}]
0: {email: "ZzesMQV2aOHpyF+V5m0jiIK0Hp8ykS5YFfSj$T67fsdffMO==", ...}`}
            </pre>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How it works:
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Your data is encrypted before being transmitted to our servers</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Encrypted data is stored securely in our database</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Only authorized systems can decrypt your information when needed</span>
              </li>
            </ul>
          </div>
        </section>

        {formData.taxComfortLevel === 'want-help' && (
        <section className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Expert Tax Help Available</h2>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Get professional assistance with your tax return from a certified tax expert. Our experts will review your return, answer your questions, and ensure everything is filed correctly.
              </p>

              <div className="bg-white rounded-lg p-4 border border-blue-200 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional review of your entire tax return
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Direct access to certified tax professionals
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Help maximizing deductions and credits
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accuracy guarantee and audit support
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">One-time fee</p>
                    <p className="text-4xl font-bold">$75</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Expert tax assistance</p>
                    <p className="text-sm opacity-90">for your entire return</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500">
                      <option value="">Select method</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief description of what you need help with (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="e.g., I have questions about deductions for my home office..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, taxComfortLevel: '' }))}
                className="py-2 px-6 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go Back
              </button>
              <button
                type="button"
                className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Purchase Expert Help - $75
              </button>
            </div>
          </div>
        </section>
        )}

        {formData.taxComfortLevel === 'hand-off' && (
        <section className="mb-8">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">Full-Service Tax Preparation</h2>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Let a certified tax professional handle your entire tax return from start to finish. Simply provide your documents and we'll take care of everything for you.
              </p>

              <div className="bg-white rounded-lg p-4 border border-purple-200 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Complete tax return preparation by a certified expert
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Direct access to certified tax professionals
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Help maximizing deductions and credits
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accuracy guarantee and audit support
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Electronic filing and confirmation
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">One-time fee</p>
                    <p className="text-4xl font-bold">$150</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90">Full-service tax preparation</p>
                    <p className="text-sm opacity-90">handled completely for you</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-purple-500">
                      <option value="">Select method</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief description of what you need help with (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    placeholder="e.g., I have questions about deductions for my home office..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, taxComfortLevel: '' }))}
                className="py-2 px-6 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Go Back
              </button>
              <button
                type="button"
                className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Purchase Full Service - $150
              </button>
            </div>
          </div>
        </section>
        )}

        {formData.taxComfortLevel === 'comfortable' && (
        <>
        <section ref={yourInfoRef} className="mb-8 border-b pb-4">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name and Middle Initial
              </label>
              <div className="flex gap-2">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="First Name"
                />
                <input
                  name="middleInitial"
                  value={formData.middleInitial}
                  onChange={handleChange}
                  maxLength={1}
                  className="w-16 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="M"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Last Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Security Number
              </label>
              <input
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="123-45-6789"
              />
            </div>

            <div className="md:col-span-2 border-t border-gray-300 my-4"></div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Mailing Address
              </label>
              <select
                name="mailingAddressType"
                value={formData.mailingAddressType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              >
                <option value="">Select address type</option>
                <option value="us">US address</option>
                <option value="foreign">Foreign address</option>
                <option value="territory">US territory</option>
              </select>
            </div>

            {formData.mailingAddressType === 'territory' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  US Territory
                </label>
                <select
                  name="territory"
                  value={formData.territory}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">Select territory</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Guam">Guam</option>
                  <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="US Virgin Islands">US Virgin Islands</option>
                  <option value="Midway Islands">Midway Islands</option>
                  <option value="Wake Island">Wake Island</option>
                  <option value="US Minor Outlying Islands">US Minor Outlying Islands</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Street Address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apartment Number
              </label>
              <input
                name="aptNo"
                value={formData.aptNo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Apt #"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City, Town or Post Office
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              >
                <option value="">Select state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>

            {formData.mailingAddressType === 'foreign' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">Select country</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Brunei">Brunei</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Central African Republic">Central African Republic</option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Greece">Greece</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran">Iran</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Laos">Laos</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libya">Libya</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia">Micronesia</option>
                  <option value="Moldova">Moldova</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="North Korea">North Korea</option>
                  <option value="North Macedonia">North Macedonia</option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestine">Palestine</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Romania">Romania</option>
                  <option value="Russia">Russia</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                  <option value="Saint Lucia">Saint Lucia</option>
                  <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Korea">South Korea</option>
                  <option value="South Sudan">South Sudan</option>
                  <option value="Spain">Spain</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syria">Syria</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-Leste">Timor-Leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Vatican City">Vatican City</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
              <input
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="12345 or 12345-6789"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              name="isUsResident"
              checked={formData.isUsResident}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Check here if your main home was <b>NOT</b> in the above State for more than half of 2025
            </span>
          </div>

          {formData.isUsResident && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous state of residence greater than 6 months
              </label>
              <select
                name="previousStateOfResidence"
                value={formData.previousStateOfResidence}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              >
                <option value="">Select state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-2">
              Presidential Election Campaign
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Check here if you, or your spouse if filing jointly, want $3 to go to this fund.
            </p>
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="presidentialElectionFund.taxpayer"
                  checked={formData.presidentialElectionFund.taxpayer}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">You</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="presidentialElectionFund.spouse"
                  checked={formData.presidentialElectionFund.spouse}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Spouse</span>
              </label>
            </div>
          </div>
        </section>

        {/* Additional Questions */}
        <section className="mb-8 space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Can a parent (or somebody else) claim you as a dependent on their tax return?
            </h3>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="canBeClaimedAsDependent"
                  value="yes"
                  checked={formData.canBeClaimedAsDependent === 'yes'}
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
                  checked={formData.canBeClaimedAsDependent === 'no'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Do you want to contribute $3 to the Presidential Election Campaign Fund?
            </h3>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="wantsPresidentialFundContribution"
                  value="yes"
                  checked={formData.wantsPresidentialFundContribution === 'yes'}
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
                  checked={formData.wantsPresidentialFundContribution === 'no'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Are you legally blind?
            </h3>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isLegallyBlind"
                  value="yes"
                  checked={formData.isLegallyBlind === 'yes'}
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
                  checked={formData.isLegallyBlind === 'no'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-medium text-gray-900 mb-3">
              Has this person passed away before the filing of this tax return?
            </h3>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasPassedAway"
                  value="yes"
                  checked={formData.hasPassedAway === 'yes'}
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
                  checked={formData.hasPassedAway === 'no'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next
          </button>
        </div>
        </>
        )}
      </div>
    </div>

      <FormDrawer currentPage="Page 1" pageTitle="Personal Information & Tax Comfort Level" />
    </>
  );
}
