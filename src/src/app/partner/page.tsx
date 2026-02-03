
'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react'; // You might need to install headlessui or use a simple button
import { MapPin, User, Navigation, DollarSign } from 'lucide-react';
import MapComponent from '@/components/Map/MapComponent';

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [rideRequest, setRideRequest] = useState<any>(null);

  // Simulate receiving a ride request
  useEffect(() => {
    if (isOnline) {
      const timer = setTimeout(() => {
        setRideRequest({
          id: 'ride_123',
          passenger: 'Rahul Sharma',
          pickup: 'Panvel Station',
          drop: 'Khandeshwar',
          price: 145,
          distance: '4.2 km'
        });
      }, 3000);
      return () => clearTimeout(timer);
    } else {
        setRideRequest(null);
    }
  }, [isOnline]);

  return (
    <div className="flex h-screen bg-gray-100 relative">
      <div className="absolute inset-0 z-0">
          <MapComponent />
      </div>

      {/* Online/Offline Toggle Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
        <span className={`font-bold ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
          {isOnline ? 'YOU ARE ONLINE' : 'YOU ARE OFFLINE'}
        </span>
        <button
            onClick={() => setIsOnline(!isOnline)}
            className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isOnline ? 'bg-green-500' : 'bg-gray-200'}
            `}
        >
            <span
                className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${isOnline ? 'translate-x-6' : 'translate-x-1'}
                `}
            />
        </button>
      </div>

      {/* Ride Request Card - Pop up when online and request comes */}
      {rideRequest && (
        <div className="absolute bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-500">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-blue-500">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">New Ride Request! 🚖</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                        ₹{rideRequest.price} (Cash)
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1"><User size={18} className="text-gray-500"/></div>
                        <div>
                            <p className="font-semibold text-gray-900">{rideRequest.passenger}</p>
                            <p className="text-xs text-gray-500">⭐ 4.8 Rating</p>
                        </div>
                    </div>

                    <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
                        <div className="relative">
                            <div className="absolute -left-[29px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white box-content"></div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Pickup</p>
                            <p className="text-sm font-medium text-gray-900">{rideRequest.pickup}</p>
                            <p className="text-xs text-blue-600 mt-1">~5 mins away</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[29px] top-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white box-content"></div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Drop</p>
                            <p className="text-sm font-medium text-gray-900">{rideRequest.drop}</p>
                            <p className="text-xs text-gray-500 mt-1">{rideRequest.distance}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button 
                        onClick={() => setRideRequest(null)}
                        className="flex-1 py-3 text-red-600 font-bold bg-red-50 rounded-xl hover:bg-red-100"
                    >
                        Reject (15s)
                    </button>
                    <button 
                        className="flex-[2] py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                        Accept Ride <Navigation size={18} />
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
