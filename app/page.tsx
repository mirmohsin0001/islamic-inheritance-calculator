'use client';

import { useState } from 'react';
import Footer from '@/app/components/Footer';

// Create a formatter for Indian number system with Rupee symbol
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Define interfaces
interface Result {
  sonShare: number;
  daughterShare: number;
}

interface State {
  error?: string;
  success?: boolean;
  result?: Result;
}

// Action function expects FormData from the form
async function calculateInheritance(prevState: State | null, formData: FormData): Promise<State> {
  const amount = parseFloat(formData.get('amount') as string);
  const sons = parseInt(formData.get('sons') as string) || 0;
  const daughters = parseInt(formData.get('daughters') as string) || 0;

  // Validation
  if (!amount || amount <= 0) {
    return { error: 'Please enter a valid positive amount' };
  }
  if (sons < 0 || daughters < 0) {
    return { error: 'Number of sons and daughters cannot be negative' };
  }
  if (sons === 0 && daughters === 0) {
    return { error: 'Please enter at least one son or daughter' };
  }

  // Calculate shares
  const totalShares = sons * 2 + daughters;
  const shareValue = amount / totalShares;
  const sonShare = shareValue * 2;
  const daughterShare = shareValue;

  return {
    success: true,
    result: {
      sonShare: sonShare,
      daughterShare: daughterShare,
    },
  };
}

export default function Home() {
  const [formData, setFormData] = useState({
    amount: '',
    sons: '',
    daughters: '',
  });
  const [state, setState] = useState<State | null>(null);

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await calculateInheritance(state, formData);
    setState(result);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Islamic Inheritance Calculator
        </h1>
        <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md mb-24">
          <form onSubmit={formAction} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Total Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                step="any"
                min="0"
                value={formData.amount}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter total amount"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="sons" className="block text-sm font-medium text-gray-700">
                Number of Sons
              </label>
              <input
                type="number"
                name="sons"
                id="sons"
                min="0"
                value={formData.sons}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of sons"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="daughters" className="block text-sm font-medium text-gray-700">
                Number of Daughters
              </label>
              <input
                type="number"
                name="daughters"
                id="daughters"
                min="0"
                value={formData.daughters}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of daughters"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Calculate
            </button>
          </form>

          {state?.error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
              {state.error}
            </div>
          )}

          {state?.success && state?.result && (
            <div className="p-4 bg-green-100 rounded-md space-y-2">
              <h2 className="text-lg font-semibold text-green-800">Results:</h2>
              <p className="text-green-700">
                Each Son&apos;s Share: {formatter.format(state.result.sonShare)}
              </p>
              <p className="text-green-700">
                Each Daughter&apos;s Share: {formatter.format(state.result.daughterShare)}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}