'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';
import FormDrawer from '../../../components/forms/FormDrawer';

interface Dependent {
  id: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  suffix: string;
  ssn: string;
  dateOfBirth: string;
  relationship: string;
}

export default function Page4() {
  const router = useRouter();
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentDependent, setCurrentDependent] = useState<Dependent>({
    id: '',
    firstName: '',
    middleInitial: '',
    lastName: '',
    suffix: '',
    ssn: '',
    dateOfBirth: '',
    relationship: ''
  });

  const handleAddDependent = () => {
    setShowForm(true);
    setCurrentDependent({
      id: Date.now().toString(),
      firstName: '',
      middleInitial: '',
      lastName: '',
      suffix: '',
      ssn: '',
      dateOfBirth: '',
      relationship: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentDependent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveDependent = () => {
    if (currentDependent.firstName && currentDependent.lastName && currentDependent.ssn) {
      setDependents(prev => [...prev, currentDependent]);
      setShowForm(false);
      setCurrentDependent({
        id: '',
        firstName: '',
        middleInitial: '',
        lastName: '',
        suffix: '',
        ssn: '',
        dateOfBirth: '',
        relationship: ''
      });
    }
  };

  const handleEditDependent = (id: string) => {
    const dependent = dependents.find(d => d.id === id);
    if (dependent) {
      setCurrentDependent(dependent);
      setShowForm(true);
      setDependents(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleDeleteDependent = (id: string) => {
    setDependents(prev => prev.filter(d => d.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentDependent({
      id: '',
      firstName: '',
      middleInitial: '',
      lastName: '',
      suffix: '',
      ssn: '',
      dateOfBirth: '',
      relationship: ''
    });
  };

  const handlePrevious = () => {
    router.push('/forms/page3');
  };

  const handleNext = () => {
    router.push('/forms/page5');
  };

  return (
    <>
      <FormsHeader currentStep="personal" />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Dependents</h1>

            <section className="mb-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Add your dependents
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  A dependent is someone who relies on you for financial support. This includes children,
                  elderly parents, or other qualifying relatives. Adding dependents may reduce your tax liability.
                </p>
              </div>

              {/* List of added dependents */}
              {dependents.length > 0 && (
                <div className="mb-6 space-y-4">
                  {dependents.map((dependent) => (
                    <div
                      key={dependent.id}
                      className="border border-gray-300 rounded-md p-4 flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {dependent.firstName} {dependent.middleInitial && `${dependent.middleInitial}.`} {dependent.lastName} {dependent.suffix}
                        </h3>
                        <p className="text-sm text-gray-600">SSN: {dependent.ssn}</p>
                        <p className="text-sm text-gray-600">DOB: {dependent.dateOfBirth}</p>
                        <p className="text-sm text-gray-600">Relationship: {dependent.relationship}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditDependent(dependent.id)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDependent(dependent.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Dependent Button */}
              {!showForm && (
                <button
                  type="button"
                  onClick={handleAddDependent}
                  className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-600 font-medium transition-colors"
                >
                  + Add Dependent
                </button>
              )}

              {/* Dependent Form */}
              {showForm && (
                <div className="border border-gray-300 rounded-md p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Dependent Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name:
                      </label>
                      <input
                        name="firstName"
                        value={currentDependent.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="First Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Middle Initial:
                      </label>
                      <input
                        name="middleInitial"
                        value={currentDependent.middleInitial}
                        onChange={handleChange}
                        maxLength={1}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="M"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name:
                      </label>
                      <input
                        name="lastName"
                        value={currentDependent.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Last Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Jr., Sr., III:
                      </label>
                      <input
                        name="suffix"
                        value={currentDependent.suffix}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Jr., Sr., III"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Social Security Number:
                      </label>
                      <input
                        name="ssn"
                        value={currentDependent.ssn}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="123-45-6789"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth:
                      </label>
                      <input
                        name="dateOfBirth"
                        type="date"
                        value={currentDependent.dateOfBirth}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">(mm/dd/yyyy)</p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship to Taxpayer:
                      </label>
                      <input
                        name="relationship"
                        value={currentDependent.relationship}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Son, Daughter, Parent, etc."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="py-2 px-6 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveDependent}
                      className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Dependent
                    </button>
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

      <FormDrawer currentPage="Page 4" pageTitle="Dependents Information" />
    </>
  );
}
