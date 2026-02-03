
'use client';

import { useState } from 'react';
import { LayoutDashboard, Users, Car } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('rides');

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            Pan<span className="text-blue-500">Vel</span> Admin
        </h2>
        <nav className="space-y-4">
            <button 
                onClick={() => setActiveTab('rides')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'rides' ? 'bg-blue-600 shadow-lg font-bold' : 'text-gray-400 hover:bg-slate-800'}`}
            >
                <Car size={20} />
                Live Rides
            </button>
            <button 
                onClick={() => setActiveTab('drivers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'drivers' ? 'bg-blue-600 shadow-lg font-bold' : 'text-gray-400 hover:bg-slate-800'}`}
            >
                <Users size={20} />
                Partners
            </button>
            <button 
                onClick={() => setActiveTab('stats')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-blue-600 shadow-lg font-bold' : 'text-gray-400 hover:bg-slate-800'}`}
            >
                <LayoutDashboard size={20} />
                Analytics
            </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
         <div className="flex justify-between items-center mb-8">
             <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
             <div className="flex items-center gap-4">
                 <div className="text-right">
                     <p className="text-sm font-medium text-gray-900">Admin User</p>
                     <p className="text-xs text-gray-500">Super Admin</p>
                 </div>
                 <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
             </div>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <p className="text-sm text-gray-500 font-medium">Total Rides Today</p>
                 <h3 className="text-3xl font-bold text-gray-900 mt-2">1,248</h3>
                 <p className="text-xs text-green-500 mt-2">↑ 12% from yesterday</p>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <p className="text-sm text-gray-500 font-medium">Active Partners</p>
                 <h3 className="text-3xl font-bold text-gray-900 mt-2">142</h3>
                 <div className="flex gap-2 mt-2">
                     <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">85 Online</span>
                     <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">57 Offline</span>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
}
