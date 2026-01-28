import React from 'react';
import Link from 'next/link';

interface FormsHeaderProps {
  currentStep?: string;
}

export default function FormsHeader({ currentStep = 'personal' }: FormsHeaderProps) {
  const steps = [
    { id: 'personal', label: 'Personal', href: '/forms/page1' },
    { id: 'income', label: 'Income', href: '/forms/page7' },
    { id: 'deductions', label: 'Deductions/Credits', href: '/forms/deductions' },
    { id: 'misc', label: 'Misc', href: '/forms/misc' },
    { id: 'summary', label: 'Summary', href: '/forms/summary' },
    { id: 'state', label: 'State', href: '/forms/state' },
    { id: 'filing', label: 'Final Filing', href: '/forms/filing' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Form sections">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            return (
              <Link
                key={step.id}
                href={step.href}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {step.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
