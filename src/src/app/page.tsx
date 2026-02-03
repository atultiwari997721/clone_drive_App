
'use client';

import MapComponent from '@/components/Map/MapComponent';
import { MapPin, Car, User } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [showRideOptions, setShowRideOptions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(pickup && drop) {
        setShowRideOptions(true);
    }
  };

  return (
    <main className="relative h-screen w-full overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 z-0">
            <MapComponent />
        </div>

        {/* Top Floating Navbar (Mobile Friendly) */}
        <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-center pointer-events-none">
             <div className="bg-white/90 backdrop-blur shadow-md p-2 rounded-full pointer-events-auto cursor-pointer">
                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                     U
                 </div>
             </div>
             <Link href="/auth" className="pointer-events-auto bg-black/80 text-white px-4 py-2 rounded-full text-xs font-medium backdrop-blur">
                 Login
             </Link>
        </div>

        {/* Bottom Sheet / Ride Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-50 transition-all duration-300 ease-in-out max-h-[80vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-6"></div>
            
            <div className="px-6 pb-8">
                {!showRideOptions ? (
                    /* Search Form */
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-blue-600">
                                <div className="w-2 h-2 bg-blue-600 rounded-full ring-4 ring-blue-100"></div>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Current Location"
                                className="w-full bg-gray-100 p-3 pl-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="absolute right-3 top-2.5 text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md"
                                onClick={() => setPickup('Your Current Location')}
                            >
                                LOCATE
                            </button>
                        </div>
                        
                        {/* Connecting Line */}
                        <div className="absolute left-[31px] top-[60px] h-8 w-0.5 bg-gray-200 border-l border-dashed border-gray-300 z-10 text-transparent select-none">|</div>

                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-red-500">
                                <MapPin size={16} fill="currentColor" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Where to?"
                                className="w-full bg-gray-100 p-3 pl-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={drop}
                                onChange={(e) => setDrop(e.target.value)}
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg mt-4 shadow-lg active:scale-95 transition-transform"
                        >
                            Search Rides
                        </button>
                    </form>
                ) : (
                    /* Ride Options */
                    <div className="space-y-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
                        <div className="flex justify-between items-center mb-4">
                             <h3 className="font-bold text-lg text-gray-800">Choose a ride</h3>
                             <button onClick={() => setShowRideOptions(false)} className="text-sm text-gray-500">Back</button>
                        </div>

                        {/* Option 1 */}
                        <div className="flex items-center justify-between p-3 border-2 border-blue-500 bg-blue-50 rounded-xl cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                                     <Car size={24} className="text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                        PanVel Mini 
                                        <User size={12} className="text-gray-500"/> 4
                                    </h4>
                                    <p className="text-xs text-gray-500">5 min away • 15:42 drop-off</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">₹142</p>
                            </div>
                        </div>

                        {/* Option 2 */}
                        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                                     <Car size={24} className="text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                        PanVel Sedan
                                        <User size={12} className="text-gray-500"/> 4
                                    </h4>
                                    <p className="text-xs text-gray-500">7 min away • 15:40 drop-off</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">₹189</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2 py-3 border-t border-gray-100 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-100 p-2 rounded-full">
                                    <span className="text-lg">💵</span>
                                </div>
                                <span className="font-medium text-sm text-gray-700">Cash</span>
                            </div>
                            <span className="text-blue-600 text-sm font-semibold">Change</span>
                        </div>

                        <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform">
                            Confirm PanVel Mini
                        </button>
                    </div>
                )}
            </div>
        </div>
    </main>
  );
}
