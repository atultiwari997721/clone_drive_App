
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Car } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isPartner, setIsPartner] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Authenticating as', isPartner ? 'Partner' : 'User');
    
    // Mock redirect
    if (isPartner) {
      router.push('/partner'); 
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Pan<span className='text-blue-600'>Vel</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isPartner ? 'Partner Portal' : 'Ride with us'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Role Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setIsPartner(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  !isPartner ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User size={16} />
                  User
                </div>
              </button>
              <button
                onClick={() => setIsPartner(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isPartner ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Car size={16} />
                  Partner
                </div>
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleAuth}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  suppressHydrationWarning
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
