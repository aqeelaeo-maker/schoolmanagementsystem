import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  CalendarCheck,
  CreditCard,
  MessageSquare,
  Bus,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { NavTab } from '../Sidebar';

interface ParentDashboardProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenCopilot: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  onNavigateTab,
  onOpenCopilot
}) => {
  const { students, fees, routes } = useSchool();
  const child = students[0]; // Alex Morgan
  const feeVoucher = fees[0];
  const bus = routes[0];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={child.photo}
            alt={child.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-400/30 shadow-md"
          />
          <div>
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Parent Guardian Portal 2026
            </span>
            <h2 className="text-2xl font-black mt-1 tracking-tight">Parent Portal • {child.name}</h2>
            <p className="text-xs text-amber-200 mt-0.5">
              Grade 10-A • St. Jude Academy • Guardian: Robert Morgan ({child.parentPhone})
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('fees')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-white rounded-2xl shadow-lg transition-all"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Fee Voucher (${feeVoucher.totalAmount})</span>
          </button>
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 backdrop-blur-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Progress Advisor</span>
          </button>
        </div>
      </div>

      {/* Child Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Child Attendance</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{child.attendancePercentage}%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Present Today at 08:05 AM</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Grade</span>
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">GPA {child.gpa}</h3>
          <p className="text-xs text-indigo-600 font-semibold mt-1">A+ Grade in Physics & Math</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Voucher Dues</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">${feeVoucher.totalAmount}</h3>
          <p className="text-xs text-amber-600 font-semibold mt-1">Due Date: {feeVoucher.dueDate}</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">School Bus GPS</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
              <Bus className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">En Route</h3>
          <p className="text-xs text-blue-600 font-semibold mt-1">Bus #{bus.vehicleNo} (Stop 2)</p>
        </div>
      </div>

      {/* Parent Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Payment Card */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Online Fee Payment Portal</h3>
              <p className="text-xs text-slate-400">Voucher No: {feeVoucher.voucherNo}</p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              {feeVoucher.status}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 space-y-2 text-xs mb-4">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Tuition Fee (August 2026):</span>
              <span className="font-bold">${feeVoucher.tuitionFee}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Transport Fee (Route 04):</span>
              <span className="font-bold">${feeVoucher.transportFee}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Exam & Annual Charges:</span>
              <span className="font-bold">${feeVoucher.examFee}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-600 flex justify-between text-sm font-black text-slate-900 dark:text-white">
              <span>Total Payable Amount:</span>
              <span className="text-amber-600">${feeVoucher.totalAmount}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('fees')}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Now with Credit Card / UPI / NetBanking</span>
          </button>
        </div>

        {/* Teacher Connect & Direct Chat */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Direct Class Teacher Connect</h3>
            <p className="text-xs text-slate-400 mb-4">Connect directly with Dr. Eleanor Vance (Physics & Class Incharge)</p>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-indigo-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">Instant School Broadcasts</h4>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                  Receive real-time automated SMS and WhatsApp updates for child attendance & report cards.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('communication')}
            className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Open WhatsApp / Message Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
