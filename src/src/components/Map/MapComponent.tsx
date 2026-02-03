
'use client';

export default function MapComponent() {
  return (
    <div className="w-full h-full bg-gray-200 relative flex items-center justify-center">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#aeaeae_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl text-center z-10">
        <h3 className="text-lg font-bold text-gray-800">Map Loading...</h3>
        <p className="text-gray-600 text-sm mt-2">
          (Mapbox/Google Maps integration placeholder)
        </p>
      </div>
    </div>
  );
}
