import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Home, Users, BedDouble, CheckCircle2 } from 'lucide-react';

export const HostelModule: React.FC = () => {
  const { hostelRooms } = useSchool();

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Residential Hostel & Room Allocation 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Hostel Buildings & Bed Allocation</h2>
          <p className="text-xs text-purple-200 mt-1">
            Manage residential halls, warden contacts, room capacities, and student allocations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hostelRooms.map((room) => (
          <div
            key={room.id}
            className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                  {room.buildingName}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">Room #{room.roomNumber}</span>
              </div>

              <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                Room #{room.roomNumber} ({room.roomType})
              </h4>
              <p className="text-xs text-slate-400 mb-3">Warden: {room.wardenName}</p>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Occupancy:</span>
                  <span className="font-bold text-indigo-600">
                    {room.occupiedBeds} / {room.capacity} Beds Occupied
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Term Fee:</span>
                  <span className="font-bold text-slate-900 dark:text-white">${room.feePerTerm} / term</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Air Conditioned • High-Speed Wi-Fi</span>
              <button className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-xs">
                Manage Beds
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
