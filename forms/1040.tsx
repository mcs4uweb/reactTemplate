// Form1040.tsx
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation schema
const form1040Schema = z.object({
  taxpayer: z.object({
    firstName: z.string().min(1, "Required"),
    middleInitial: z.string().max(1),
    lastName: z.string().min(1, "Required"),
    ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN format"),
    address: z.string().min(1, "Required"),
    aptNo: z.string().optional(),
    city: z.string().min(1, "Required"),
    state: z.string().length(2, "Use 2-letter code"),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP"),
    isUsResident: z.boolean(),
    presidentialElectionFund: z.object({
      taxpayer: z.boolean(),
      spouse: z.boolean()
    })
  }),
  spouse: z.object({
    firstName: z.string().optional(),
    middleInitial: z.string().max(1).optional(),
    lastName: z.string().optional(),
    ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN").optional().or(z.literal("")),
  }).optional(),
  filingStatus: z.enum(["single", "married_joint", "married_separate", "head_household", "qualifying_widow"]),
  digitalAssets: z.enum(["yes", "no"]),
  dependents: z.array(
    z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/),
      relationship: z.string().min(1),
      livedWithYou: z.boolean(),
      isStudent: z.boolean(),
      isDisabled: z.boolean(),
      credits: z.object({
        childTaxCredit: z.boolean(),
        otherDependents: z.boolean()
      })
    })
  ).max(4),
  income: z.object({
    wages: z.number().nonnegative(),
    taxableInterest: z.number().nonnegative(),
    qualifiedDividends: z.number().nonnegative(),
    ordinaryDividends: z.number().nonnegative(),
    iraDistributions: z.number().nonnegative(),
    iraTaxable: z.number().nonnegative(),
    pensions: z.number().nonnegative(),
    pensionsTaxable: z.number().nonnegative(),
    socialSecurity: z.number().nonnegative(),
    socialSecurityTaxable: z.number().nonnegative(),
    capitalGain: z.number(),
    otherIncome: z.number().nonnegative(),
  }),
  // ... (additional sections omitted for brevity)
});

type Form1040Data = z.infer<typeof form1040Schema>;

export default function Form1040() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Form1040Data>({
    resolver: zodResolver(form1040Schema),
    defaultValues: {
      taxpayer: {
        presidentialElectionFund: { taxpayer: false, spouse: false }
      },
      digitalAssets: "no",
      dependents: [],
      income: {
        wages: 0,
        taxableInterest: 0,
        qualifiedDividends: 0,
        ordinaryDividends: 0,
        iraDistributions: 0,
        iraTaxable: 0,
        pensions: 0,
        pensionsTaxable: 0,
        socialSecurity: 0,
        socialSecurityTaxable: 0,
        capitalGain: 0,
        otherIncome: 0
      }
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dependents"
  });

  const onSubmit = (data: Form1040Data) => {
    console.log("Form submitted:", data);
    // Handle submission (e.g., send to backend)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">U.S. Individual Income Tax Return</h1>
      
      {/* Taxpayer Information */}
      <section className="mb-8 border-b pb-4">
        <h2 className="text-xl font-semibold mb-3">Your Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name and Middle Initial</label>
            <input 
              {...register("taxpayer.firstName")} 
              className="w-full p-2 border rounded"
              placeholder="First Name"
            />
            {errors.taxpayer?.firstName && <p className="text-red-500 text-sm">{errors.taxpayer.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input 
              {...register("taxpayer.lastName")} 
              className="w-full p-2 border rounded"
            />
            {errors.taxpayer?.lastName && <p className="text-red-500 text-sm">{errors.taxpayer.lastName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Social Security Number</label>
            <input 
              {...register("taxpayer.ssn")} 
              className="w-full p-2 border rounded"
              placeholder="123-45-6789"
            />
            {errors.taxpayer?.ssn && <p className="text-red-500 text-sm">{errors.taxpayer.ssn.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Street Address</label>
            <input 
              {...register("taxpayer.address")} 
              className="w-full p-2 border rounded"
            />
            {errors.taxpayer?.address && <p className="text-red-500 text-sm">{errors.taxpayer.address.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Apartment Number</label>
            <input 
              {...register("taxpayer.aptNo")} 
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City, Town or Post Office</label>
            <input 
              {...register("taxpayer.city")} 
              className="w-full p-2 border rounded"
            />
            {errors.taxpayer?.city && <p className="text-red-500 text-sm">{errors.taxpayer.city.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input 
              {...register("taxpayer.state")} 
              className="w-full p-2 border rounded"
              maxLength={2}
            />
            {errors.taxpayer?.state && <p className="text-red-500 text-sm">{errors.taxpayer.state.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">ZIP Code</label>
            <input 
              {...register("taxpayer.zipCode")} 
              className="w-full p-2 border rounded"
              placeholder="12345 or 12345-6789"
            />
            {errors.taxpayer?.zipCode && <p className="text-red-500 text-sm">{errors.taxpayer.zipCode.message}</p>}
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <input 
            type="checkbox" 
            {...register("taxpayer.isUsResident")} 
            className="mr-2"
          />
          <span>Check here if your main home was in the U.S. for more than half of 2025</span>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Presidential Election Campaign</h3>
          <div className="flex items-center space-x-4">
            <label>
              <input 
                type="checkbox" 
                {...register("taxpayer.presidentialElectionFund.taxpayer")} 
                className="mr-1"
              />
              You
            </label>
            <label>
              <input 
                type="checkbox" 
                {...register("taxpayer.presidentialElectionFund.spouse")} 
                className="mr-1"
              />
              Spouse
            </label>
          </div>
        </div>
      </section>

      {/* Filing Status */}
      <section className="mb-8 border-b pb-4">
        <h2 className="text-xl font-semibold mb-3">Filing Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { value: "single", label: "Single" },
            { value: "married_joint", label: "Married filing jointly" },
            { value: "married_separate", label: "Married filing separately" },
            { value: "head_household", label: "Head of household" },
            { value: "qualifying_widow", label: "Qualifying surviving spouse" }
          ].map((status) => (
            <div key={status.value}>
              <label>
                <input
                  type="radio"
                  value={status.value}
                  {...register("filingStatus")}
                  className="mr-2"
                />
                {status.label}
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Digital Assets */}
      <section className="mb-8 border-b pb-4">
        <h2 className="text-xl font-semibold mb-3">Digital Assets</h2>
        <p className="mb-2">At any time during 2025, did you:</p>
        <ul className="list-disc pl-5 mb-3">
          <li>Receive (as a reward, award, or payment for property or services); or</li>
          <li>Sell, exchange, or otherwise dispose of a digital asset?</li>
        </ul>
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              value="yes"
              {...register("digitalAssets")}
              className="mr-1"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              {...register("digitalAssets")}
              className="mr-1"
            />
            No
          </label>
        </div>
      </section>

      {/* Dependents */}
      <section className="mb-8 border-b pb-4">
        <h2 className="text-xl font-semibold mb-3">Dependents</h2>
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 mb-4 rounded">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <input 
                {...register(`dependents.${index}.firstName`)} 
                placeholder="First Name"
                className="p-2 border rounded"
              />
              <input 
                {...register(`dependents.${index}.lastName`)} 
                placeholder="Last Name"
                className="p-2 border rounded"
              />
              <input 
                {...register(`dependents.${index}.ssn`)} 
                placeholder="SSN"
                className="p-2 border rounded"
              />
              <input 
                {...register(`dependents.${index}.relationship`)} 
                placeholder="Relationship"
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <label>
                <input 
                  type="checkbox" 
                  {...register(`dependents.${index}.livedWithYou`)} 
                  className="mr-1"
                />
                Lived with you >50% of 2025
              </label>
              <label>
                <input 
                  type="checkbox" 
                  {...register(`dependents.${index}.isStudent`)} 
                  className="mr-1"
                />
                Full-time student
              </label>
              <label>
                <input 
                  type="checkbox" 
                  {...register(`dependents.${index}.isDisabled`)} 
                  className="mr-1"
                />
                Permanently disabled
              </label>
              <div>
                <span className="mr-2">Credits:</span>
                <label className="mr-2">
                  <input 
                    type="checkbox" 
                    {...register(`dependents.${index}.credits.childTaxCredit`)} 
                    className="mr-1"
                  />
                  Child Tax Credit
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    {...register(`dependents.${index}.credits.otherDependents`)} 
                    className="mr-1"
                  />
                  Other Dependents
                </label>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => remove(index)}
              className="mt-2 text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        
        <button 
          type="button" 
          onClick={() => append({
            firstName: "",
            lastName: "",
            ssn: "",
            relationship: "",
            livedWithYou: false,
            isStudent: false,
            isDisabled: false,
            credits: { childTaxCredit: false, otherDependents: false }
          })}
          disabled={fields.length >= 4}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add Dependent
        </button>
      </section>

      {/* Income Section */}
      <section className="mb-8 border-b pb-4">
        <h2 className="text-xl font-semibold mb-3">Income</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <label className="w-64">1a. Wages, salaries, tips (from Form W-2)</label>
            <input 
              type="number" 
              step="0.01"
              {...register("income.wages", { valueAsNumber: true })} 
              className="w-32 p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="w-64">2b. Taxable interest</label>
            <input 
              type="number" 
              step="0.01"
              {...register("income.taxableInterest", { valueAsNumber: true })} 
              className="w-32 p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="w-64">3a. Qualified dividends</label>
            <input 
              type="number" 
              step="0.01"
              {...register("income.qualifiedDividends", { valueAsNumber: true })} 
              className="w-32 p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="w-64">3b. Ordinary dividends</label>
            <input 
              type="number" 
              step="0.01"
              {...register("income.ordinaryDividends", { valueAsNumber: true })} 
              className="w-32 p-2 border rounded"
            />
          </div>
          {/* Additional income fields would follow same pattern */}
        </div>
      </section>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-green-600 text-white py-3 rounded font-semibold"
      >
        Review and Submit
      </button>
    </form>
  );
}