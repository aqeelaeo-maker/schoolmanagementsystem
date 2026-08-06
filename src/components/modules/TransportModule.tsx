import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Bus, MapPin, Phone, Navigation, Clock } from 'lucide-react';

export const TransportModule: React.FC = () => {
  const { routes } = useSchool();
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const [busProgress, setBusProgress] = useState(35);

  // Animate GPS bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBusProgress((prev) => (prev >= 95 ? 10 : prev + 2));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Transport & Live GPS Fleet Tracking 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">School Bus Fleet & Route GPS Tracker</h2>
          <p className="text-xs text-blue-200 mt-1">
            Real-time telemetry tracking for school buses, driver contact rosters, and parent arrival notifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Selector & Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Transport Routes</h3>
          <div className="space-y-3">
            {routes.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedRoute(r)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                  selectedRoute.id === r.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-indigo-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-sm">Route {r.routeNumber}: {r.routeName}</span>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-white/20">
                    Bus #{r.vehicleNo}
                  </span>
                </div>
                <div className="space-y-1 text-xs opacity-90">
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Driver: {r.driverName} ({r.driverPhone})
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Pickup: {r.stops[0].time} • Fee: ${r.monthlyFee}/mo
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live GPS Interactive Route Map Canvas */}
        <div className="lg:col-span-2 p-6 bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-indigo-400 animate-spin" />
                <div>
                  <h3 className="font-bold text-sm">Live GPS Telemetry Canvas • Route {selectedRoute.routeNumber}</h3>
                  <p className="text-[10px] text-slate-400">Driver: {selectedRoute.driverName} • Vehicle: #{selectedRoute.vehicleNo}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-bold">
                Speed: 38 mph • Live
              </span>
            </div>

            {/* Visual Route Line & Moving Bus */}
            <div className="py-12 px-6 relative bg-slate-950 rounded-2xl border border-slate-800/80">
              {/* Route Line */}
              <div className="h-3 bg-slate-800 rounded-full w-full relative">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${busProgress}%` }}
                />

                {/* Animated Bus Icon */}
                <div
                  className="absolute -top-4 w-10 h-10 rounded-2xl bg-indigo-600 text-white border-2 border-cyan-300 shadow-xl flex items-center justify-center transition-all duration-500 -ml-5 z-20"
                  style={{ left: `${busProgress}%` }}
                >
                  <Bus className="w-5 h-5" />
                </div>
              </div>

              {/* Bus Stops along line */}
              <div className="flex justify-between items-center mt-6 text-[11px]">
                {selectedRoute.stops.map((st, idx) => (
                  <div key={idx} className="text-center space-y-1">
                    <div className="w-3 h-3 mx-auto rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
                    <p className="font-bold text-slate-200">{st.stopName}</p>
                    <p className="text-[10px] text-slate-400">{st.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <p className="font-bold text-slate-100">Next Destination: Stop 2 (Grand Avenue)</p>
                <p className="text-[10px] text-slate-400">Estimated Arrival in 6 minutes</p>
              </div>
            </div>
            <button
              onClick={() => alert(`Connecting call to driver ${selectedRoute.driverName} at ${selectedRoute.driverPhone}`)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xs"
            >
              Call Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
