

'use client';

import { MapPin, Car, User, Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { socket } from '@/lib/socket';
import { calculateDistance } from '@/lib/utils'; // Import Haversine logic
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';

const MapComponent = dynamic(() => import('@/components/Map/MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">Loading Map...</div>
});

export default function Home() {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [price, setPrice] = useState(0);
  const [rideStatus, setRideStatus] = useState('IDLE'); // IDLE, SEARCHING, ASSIGNED
  const [driverDetails, setDriverDetails] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | undefined>(undefined);

  const locateUser = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            setPickup('Your Current Location');
        }, (error) => {
            console.error("Error fetching location", error);
            alert("Could not fetch location. Please enable position access.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    socket.connect();
    
    socket.on('ride_update_ride_' + socket.id, (ride: any) => { // Limitation: using socket.id as ride ID suffix in mock
         // In real app we subscribe to ride ID returned from server
    }); 

    // General listener for demo purposes since we don't have dynamic ride IDs synced perfect yet
    // For demo: we will listen to any ride acceptance aimed at us (mocking)
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(pickup && drop) {
        // Mock Coords for Panvel
        const dist = calculateDistance(18.9894, 73.1175, 19.0330, 73.0297); // Random coords near Panvel
        const calculatedPrice = Math.max(50, Math.round(dist * 15)); // 15 Rs per km
        setPrice(calculatedPrice); 
        setShowRideOptions(true); // Show options
    }
  };

  const confirmRide = () => {
      setRideStatus('SEARCHING');
      socket.emit('request_ride', {
          userId: 'user_123', // Mock ID
          pickup,
          drop,
          price,
          userLocation: { lat: 18.9894, lng: 73.1175 }
      });
      
      // Listen for specific acceptance
      // Since we don't have the ride ID yet, we'd normally get it back from the emit acknowledgement
      // For this prototype, we'll simulate the UI state change immediately
      
      // Also listening to global broadcast for the prototype to work simply
      socket.on('new_ride_available', () => {
         // Keep searching state
      });
  };

  // Listen for assignment (hacky for prototype without proper user rooms)
  useEffect(() => {
     // We need to know OUR ride ID to listen. 
     // For prototype: we'll just wait for ANY 'ride_update' that matches our user ID if we were filtering.
     // Let's rely on the partner dashboard to emit 'accept_ride' which triggers 'ride_update_...'
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-gray-100">


        {/* Map Background */}
        <div className="absolute inset-0 z-0">
            <ErrorBoundary>
                <MapComponent 
                    userLocation={userLocation} 
                    onLocationSelect={(lat, lng) => {
                        const locString = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                        if (!pickup || pickup === 'Your Current Location') {
                           // If pickup is set to current location, we probably want to set drop
                           if (!drop) setDrop(locString);
                           else setPickup(locString); // User explicitly clicking to change pickup?
                        } else {
                           setDrop(locString);
                        }
                    }}
                />
            </ErrorBoundary>
        </div>


        {/* Top Floating Navbar (Mobile Friendly) */}
        <div className="absolute top-4 left-4 right-4 z-[500] flex justify-between items-center pointer-events-none">
             <div className="bg-white/90 backdrop-blur shadow-md p-2 rounded-full pointer-events-auto cursor-pointer">
                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                     U
                 </div>
             </div>
             <Link href="/auth" className="pointer-events-auto bg-black/80 text-white px-4 py-2 rounded-full text-xs font-medium backdrop-blur shadow-lg">
                 Partner Mode
             </Link>
        </div>

        {/* Bottom Sheet / Ride Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-[500] transition-all duration-300 ease-in-out max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-6"></div>
            
            <div className="px-6 pb-8">
                {!showRideOptions ? (
                    /* Search Form */
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="mb-2">
                             <h2 className="text-xl font-bold text-gray-800">Where to?</h2>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-blue-600">
                                <div className="w-2 h-2 bg-blue-600 rounded-full ring-4 ring-blue-100"></div>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Current Location"
                                className="w-full bg-gray-100 p-3 pl-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="absolute right-3 top-2.5 text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md"
                                onClick={locateUser}
                            >
                                LOCATE
                            </button>
                        </div>
                        
                        {/* Connecting Line */}
                        <div className="absolute left-[31px] top-[90px] h-8 w-0.5 bg-gray-200 border-l border-dashed border-gray-300 z-10 text-transparent select-none">|</div>

                        <div className="relative">
                            <div className="absolute left-3 top-3.5 text-red-500">
                                <MapPin size={16} fill="currentColor" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Enter Drop Location"
                                className="w-full bg-gray-100 p-3 pl-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                value={drop}
                                onChange={(e) => setDrop(e.target.value)}
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg mt-4 shadow-lg active:scale-95 transition-transform"
                        >
                            Find Driver
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
                                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center p-2">
                                     <Car className="w-full h-full text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                        PanVel Mini 
                                        <span className="flex items-center text-xs text-gray-500 font-normal ml-1"><User size={10} className="mr-0.5"/> 4</span>
                                    </h4>
                                    <p className="text-xs text-gray-500">3 min away</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">₹{price}</p>
                            </div>
                        </div>

                        {/* Option 2 */}
                        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center p-2">
                                     <Car className="w-full h-full text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                        PanVel Sedan
                                        <span className="flex items-center text-xs text-gray-500 font-normal ml-1"><User size={10} className="mr-0.5"/> 4</span>
                                    </h4>
                                    <p className="text-xs text-gray-500">5 min away</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">₹{Math.floor(price * 1.4)}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2 py-3 border-t border-gray-100 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-100 p-2 rounded-full">
                                    <DollarSignIcon />
                                </div>
                                <span className="font-medium text-sm text-gray-700">Cash Payment</span>
                            </div>
                            <span className="text-blue-600 text-sm font-semibold">Change</span>
                        </div>

                        <button 
                            onClick={confirmRide}
                            disabled={rideStatus === 'SEARCHING'}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:bg-gray-500"
                        >
                            {rideStatus === 'SEARCHING' ? 'Searching Drivers...' : 'Confirm Ride'} <Navigation size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    </main>
  );
}

function DollarSignIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote text-green-600"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
    )
}
