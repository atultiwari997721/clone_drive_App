
'use client';

import { useState } from 'react';
import { LayoutDashboard, Users, Car, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

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
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                 <h3 className="text-3xl font-bold text-gray-900 mt-2">₹4.2L</h3>
                 <p className="text-xs text-green-500 mt-2">↑ 8% from last week</p>
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <p className="text-sm text-gray-500 font-medium">Pending Complaints</p>
                 <h3 className="text-3xl font-bold text-gray-900 mt-2">3</h3>
                 <p className="text-xs text-red-500 mt-2">Urgent Attention</p>
             </div>
         </div>

         {/* Rides Table */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-lg text-gray-800">Live Rides</h3>
                 <button className="text-sm text-blue-600 font-semibold">View All</button>
             </div>
             <div className="overflow-x-auto">
                 <table className="w-full text-left">
                     <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                         <tr>
                             <th className="px-6 py-4">Ride ID</th>
                             <th className="px-6 py-4">Passenger</th>
                             <th className="px-6 py-4">Driver</th>
                             <th className="px-6 py-4">Status</th>
                             <th className="px-6 py-4">Fare</th>
                             <th className="px-6 py-4">Action</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                         <tr className="hover:bg-gray-50">
                             <td className="px-6 py-4 font-mono text-sm text-gray-500">#R-9821</td>
                             <td className="px-6 py-4 font-medium text-gray-900">Anjali Singh</td>
                             <td className="px-6 py-4 text-gray-600">Rajesh Kumar</td>
                             <td className="px-6 py-4">
                                 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                     <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                     On Trip
                                 </span>
                             </td>
                             <td className="px-6 py-4 font-medium">₹240</td>
                             <td className="px-6 py-4">
                                 <button className="text-gray-400 hover:text-red-500 font-medium text-sm">Cancel</button>
                             </td>
                         </tr>
                         <tr className="hover:bg-gray-50">
                             <td className="px-6 py-4 font-mono text-sm text-gray-500">#R-9822</td>
                             <td className="px-6 py-4 font-medium text-gray-900">Vikram Malhotra</td>
                             <td className="px-6 py-4 text-gray-600">Sunil Yadav</td>
                             <td className="px-6 py-4">
                                 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                     <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                     Completed
                                 </span>
                             </td>
                             <td className="px-6 py-4 font-medium">₹185</td>
                             <td className="px-6 py-4">
                                 <button className="text-gray-400 hover:text-blue-500 font-medium text-sm">Details</button>
                             </td>
                         </tr>
                         <tr className="hover:bg-gray-50">
                             <td className="px-6 py-4 font-mono text-sm text-gray-500">#R-9823</td>
                             <td className="px-6 py-4 font-medium text-gray-900">Sneha Patel</td>
                             <td className="px-6 py-4 text-gray-600 md:italic text-gray-400">Searching...</td>
                             <td className="px-6 py-4">
                                 <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                                     <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                     Requested
                                 </span>
                             </td>
                             <td className="px-6 py-4 font-medium">₹500</td>
                             <td className="px-6 py-4">
                                 <button className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100">Assign Driver</button>
                             </td>
                         </tr>
                     </tbody>
                 </table>
             </div>
         </div>
      </div>
    </div>
  );
}
