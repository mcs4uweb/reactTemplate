'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormsHeader from '../../../components/forms/FormsHeader';

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'GU', name: 'Guam' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'VI', name: 'U.S. Virgin Islands' }
];

const BOX_12_CODES = [
  { code: 'A', description: 'Uncollected Social Security or RRTA tax on tips' },
  { code: 'B', description: 'Uncollected Medicare tax on tips (not Additional Medicare Tax)' },
  { code: 'C', description: 'Taxable cost of group-term life insurance over $50,000' },
  { code: 'D', description: '401(k) elective deferrals (including SIMPLE 401(k))' },
  { code: 'E', description: '403(b) elective deferrals' },
  { code: 'F', description: '408(k)(6) SEP elective deferrals' },
  { code: 'G', description: '457(b) elective deferrals and employer contributions' },
  { code: 'H', description: '501(c)(18)(D) tax-exempt organization plan deferrals' },
  { code: 'J', description: 'Non-taxable sick pay' },
  { code: 'K', description: '20% excise tax on excess golden parachute payments' },
  { code: 'L', description: 'Substantiated employee business expense reimbursements' },
  { code: 'M', description: 'Uncollected Social Security/RRTA tax on group-term life insurance over $50,000 (former employees)' },
  { code: 'N', description: 'Uncollected Medicare tax on group-term life insurance over $50,000 (former employees)' },
  { code: 'P', description: 'Excludable moving expense reimbursements (U.S. Armed Forces only)' },
  { code: 'Q', description: 'Nontaxable combat pay' },
  { code: 'R', description: 'Employer contributions to Archer MSA' },
  { code: 'S', description: 'SIMPLE IRA (408(p)) salary reduction contributions' },
  { code: 'T', description: 'Employer-provided adoption benefits' },
  { code: 'V', description: 'Income from exercise of nonstatutory stock options' },
  { code: 'W', description: 'Employer contributions to HSA (including cafeteria plan)' },
  { code: 'Y', description: 'Deferrals under 409A nonqualified deferred compensation plan' },
  { code: 'Z', description: 'Income under 409A that fails to satisfy requirements (20% additional tax applies)' },
  { code: 'AA', description: 'Designated Roth contributions to 401(k)' },
  { code: 'BB', description: 'Designated Roth contributions to 403(b)' },
  { code: 'DD', description: 'Cost of employer-sponsored health coverage (informational only)' },
  { code: 'EE', description: 'Designated Roth contributions to governmental 457(b)' },
  { code: 'FF', description: 'Permitted benefits under qualified small employer HRA (QSEHRA)' },
  { code: 'GG', description: 'Income from qualified equity grants under section 83(i)' },
  { code: 'HH', description: 'Aggregate deferrals under section 83(i)' },
  { code: 'II', description: 'Medicaid waiver payments excluded under Notice 2014-7' }
];

export default function Page9() {
  const router = useRouter();
  const [showEmployeeInfo, setShowEmployeeInfo] = useState(false);
  const [showFullSSN, setShowFullSSN] = useState(false);
  const [formData, setFormData] = useState({
    employeeSSN: '611-74-2450',
    ein: '',
    employerName: '',
    addressType: 'us',
    employerAddress: '',
    employerCity: '',
    employerState: '',
    employerZip: '',
    employerZipPlus4: '',
    box1Wages: '',
    box2FederalTax: '',
    box3SocialSecurityWages: '',
    box4SocialSecurityTax: '',
    box5MedicareWages: '',
    box6MedicareTax: '',
    box7SocialSecurityTips: '',
    box8AllocatedTips: '',
    box10DependentCare: '',
    box11NonqualifiedPlans: '',
    box12Code1: '',
    box12Amount1: '',
    box12Code2: '',
    box12Amount2: '',
    box13StatutoryEmployee: false,
    box13RetirementPlan: false,
    box13ThirdPartySickPay: false,
    box14Description: '',
    box14Amount: '',
    box15State: '',
    box15StateId: '',
    box16StateWages: '',
    box17StateIncomeTax: '',
    localityState: '',
    box18LocalWages: '',
    box19LocalIncomeTax: '',
    box20LocalityName: '',
    w2Type: 'standard'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePrevious = () => {
    router.push('/forms/page8');
  };

  const handleNext = () => {
    router.push('/forms/page10');
  };

  const getMaskedSSN = (ssn: string) => {
    if (!ssn) return '';
    const parts = ssn.split('-');
    if (parts.length === 3) {
      return `***-**-${parts[2]}`;
    }
    return ssn.length > 4 ? `***-**-${ssn.slice(-4)}` : ssn;
  };

  return (
    <>
      <FormsHeader currentStep="income" />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Your Wages (Form W-2)
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Enter your information as it appears on your W-2 form.
            </p>

            {/* Employee SSN */}
            <section className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Box A - Employee's Social Security Number:
              </label>
              <div className="flex items-center gap-3">
                <input
                  name="employeeSSN"
                  value={showFullSSN ? formData.employeeSSN : getMaskedSSN(formData.employeeSSN)}
                  onChange={handleChange}
                  className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="***-**-****"
                  readOnly={!showFullSSN}
                />
                <button
                  type="button"
                  onClick={() => setShowFullSSN(!showFullSSN)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                >
                  {showFullSSN ? 'Hide' : 'Show'}
                </button>
              </div>
            </section>

            {/* Employer Information */}
            <section className="mb-6 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Employer Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box B - Employer Identification Number (EIN):
                  </label>
                  <input
                    name="ein"
                    value={formData.ein}
                    onChange={handleChange}
                    className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="12-3456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box C - Employer's Name, Address, and Zip Code
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer's Name:
                  </label>
                  <input
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Type:
                  </label>
                  <select
                    name="addressType"
                    value={formData.addressType}
                    onChange={handleChange}
                    className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  >
                    <option value="us">U.S. Address</option>
                    <option value="foreign">Foreign Address</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer's Address:
                  </label>
                  <input
                    name="employerAddress"
                    value={formData.employerAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employer's City:
                    </label>
                    <input
                      name="employerCity"
                      value={formData.employerCity}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employer's State:
                    </label>
                    <input
                      name="employerState"
                      value={formData.employerState}
                      onChange={handleChange}
                      maxLength={2}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="TX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer's Zip Code:
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      name="employerZip"
                      value={formData.employerZip}
                      onChange={handleChange}
                      className="w-32 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="12345"
                      maxLength={5}
                    />
                    <span>-</span>
                    <input
                      name="employerZipPlus4"
                      value={formData.employerZipPlus4}
                      onChange={handleChange}
                      className="w-24 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      placeholder="6789"
                      maxLength={4}
                    />
                    <span className="text-xs text-gray-500">+4 regional zip code</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Show Employee Information Toggle */}
            <button
              type="button"
              onClick={() => setShowEmployeeInfo(!showEmployeeInfo)}
              className="text-blue-600 hover:text-blue-700 font-medium mb-6"
            >
              {showEmployeeInfo ? 'Hide' : 'Show'} Employee Information
            </button>

            {/* Federal Tax Information */}
            <section className="mb-6 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Federal Tax Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 1 - Wages and Tips:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box1Wages"
                      type="number"
                      step="0.01"
                      value={formData.box1Wages}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 2 - Federal Income Tax Withheld:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box2FederalTax"
                      type="number"
                      step="0.01"
                      value={formData.box2FederalTax}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 3 - Social Security Wages:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box3SocialSecurityWages"
                      type="number"
                      step="0.01"
                      value={formData.box3SocialSecurityWages}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 4 - Social Security Tax Withheld:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box4SocialSecurityTax"
                      type="number"
                      step="0.01"
                      value={formData.box4SocialSecurityTax}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 5 - Medicare Wages and Tips:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box5MedicareWages"
                      type="number"
                      step="0.01"
                      value={formData.box5MedicareWages}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 6 - Medicare Tax Withheld:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box6MedicareTax"
                      type="number"
                      step="0.01"
                      value={formData.box6MedicareTax}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 7 - Social Security Tips:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box7SocialSecurityTips"
                      type="number"
                      step="0.01"
                      value={formData.box7SocialSecurityTips}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 8 - Allocated Tips:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box8AllocatedTips"
                      type="number"
                      step="0.01"
                      value={formData.box8AllocatedTips}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 9:
                  </label>
                  <input
                    disabled
                    value="N/A"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 10 - Dependent Care Benefits:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box10DependentCare"
                      type="number"
                      step="0.01"
                      value={formData.box10DependentCare}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 11 - Nonqualified Plans:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box11NonqualifiedPlans"
                      type="number"
                      step="0.01"
                      value={formData.box11NonqualifiedPlans}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Box 12 */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Box 12</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code:
                    </label>
                    <select
                      name="box12Code1"
                      value={formData.box12Code1}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500 relative z-10 bg-white"
                    >
                      <option value="">-- Select a code --</option>
                      {BOX_12_CODES.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.code} - {item.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount:
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input
                        name="box12Amount1"
                        type="number"
                        step="0.01"
                        value={formData.box12Amount1}
                        onChange={handleChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code:
                    </label>
                    <select
                      name="box12Code2"
                      value={formData.box12Code2}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500 relative z-10 bg-white"
                    >
                      <option value="">-- Select a code --</option>
                      {BOX_12_CODES.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.code} - {item.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount:
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input
                        name="box12Amount2"
                        type="number"
                        step="0.01"
                        value={formData.box12Amount2}
                        onChange={handleChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 13 */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Box 13</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="box13StatutoryEmployee"
                      checked={formData.box13StatutoryEmployee}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Statutory Employee</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="box13RetirementPlan"
                      checked={formData.box13RetirementPlan}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Retirement Plan</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="box13ThirdPartySickPay"
                      checked={formData.box13ThirdPartySickPay}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Third-Party Sick Pay</span>
                  </label>
                </div>
              </div>

              {/* Box 14 */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Box 14 - Other</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description:
                    </label>
                    <input
                      name="box14Description"
                      value={formData.box14Description}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount:
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input
                        name="box14Amount"
                        type="number"
                        step="0.01"
                        value={formData.box14Amount}
                        onChange={handleChange}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* State Tax Information */}
            <section className="mb-6 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">State Tax Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 15 - State:
                  </label>
                  <select
                    name="box15State"
                    value={formData.box15State}
                    onChange={handleChange}
                    className="w-64 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  >
                    <option value="">-- Select a state --</option>
                    {US_STATES.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.code} - {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employer's State ID Number:
                  </label>
                  <input
                    name="box15StateId"
                    value={formData.box15StateId}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 16 - State Wages, Tips, Etc.:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box16StateWages"
                      type="number"
                      step="0.01"
                      value={formData.box16StateWages}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 17 - State Income Tax:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box17StateIncomeTax"
                      type="number"
                      step="0.01"
                      value={formData.box17StateIncomeTax}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Local Tax Information */}
            <section className="mb-6 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Local Tax Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Locality State:
                  </label>
                  <select
                    name="localityState"
                    value={formData.localityState}
                    onChange={handleChange}
                    className="w-64 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  >
                    <option value="">-- Select a state --</option>
                    {US_STATES.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.code} - {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 18 - Local Wages, Tips, Etc.:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box18LocalWages"
                      type="number"
                      step="0.01"
                      value={formData.box18LocalWages}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 19 - Local Income Tax:
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <input
                      name="box19LocalIncomeTax"
                      type="number"
                      step="0.01"
                      value={formData.box19LocalIncomeTax}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Box 20 - Locality Name:
                  </label>
                  <input
                    name="box20LocalityName"
                    value={formData.box20LocalityName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            {/* Other Information */}
            <section className="mb-6 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Information</h2>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="w2Type"
                    value="standard"
                    checked={formData.w2Type === 'standard'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Standard W-2 <span className="text-gray-500">(most common)</span>
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="w2Type"
                    value="nonstandard"
                    checked={formData.w2Type === 'nonstandard'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Nonstandard W-2 <span className="text-gray-500">(handwritten, altered, or hand-typed)</span>
                  </span>
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
                className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save and Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
