'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AtSymbolIcon, KeyIcon, UserIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { signup } from '@/app/lib/actions'; // Import your signup function

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    const formData = new FormData(e.currentTarget);

    try {
      const response = await signup(formData); // Call signup action

      if (response?.errors) {
        setErrorMessage(Object.values(response.errors).join(', '));
        setIsLoading(false);
      } else if (response?.error) {
        setErrorMessage(response.error);
        setIsLoading(false);
      } else {
        // If no errors, the user is automatically redirected to the profile page
      }
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-serif">Please sign up to continue.</h1>

        {/* Name Input */}
        <div>
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">
            Name
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-4 w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md ${
          isLoading ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Sign up'}
        {!isLoading && <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />}
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-2 flex items-center space-x-1 text-red-500">
          <ExclamationCircleIcon className="h-5 w-5" />
          <p>{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
