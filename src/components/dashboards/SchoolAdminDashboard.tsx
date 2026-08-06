import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  Users,
  CalendarCheck,
  CreditCard,
  UserPlus,
  Send,
  Award,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { NavTab } from '../Sidebar';

interface SchoolAdminDashboardProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenCopilot: () => void;
}

export const SchoolAdminDashboard: React.FC<SchoolAdminDashboardProps> = ({
  onNavigateTab,
  onOpenCopilot
}) => {
  const { students, teachers, fees, attendance, activeSchool } = useSchool();

  const totalCollected = fees
    .filter((f) => f.status === 'Paid')
    .reduce((acc, f) => acc + f.totalAmount, 0);

  const revenueData = [
    { month: 'Jan', revenue: 42000, expenses: 28000 },
    { month: 'Feb', revenue: 48000, expenses: 29500 },
    { month: 'Mar', revenue: 51000, expenses: 31000 },
    { month: 'Apr', revenue: 46000, expenses: 27000 },
    { month: 'May', revenue: 58000, expenses: 33000 },
    { month: 'Jun', revenue: 64000, expenses: 35000 },
    { month: 'Jul', revenue: 61000, expenses: 34000 },
    { month: 'Aug', revenue: 68000, expenses: 36000 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            School Principal Dashboard 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">
            Welcome back, {activeSchool.principal} 👋
          </h2>
          <p className="text-xs text-indigo-200 mt-1 max-w-xl">
            Here is your daily executive intelligence digest for {activeSchool.name}. Attendance is running at 96.2% with 0 pending security alerts today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('admissions')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Admission</span>
          </button>
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Co-Pilot</span>
          </button>
        </div>
      </div>

      {/* 4 Core KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('students')}
          className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Students</span>
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{students.length + 1236}</h3>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% from last term
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('teachers')}
          className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faculty Teachers</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{teachers.length + 81}</h3>
          <p className="text-xs text-blue-600 font-semibold flex items-center gap-1 mt-1">
            <Clock className="w-3.5 h-3.5" /> 100% Classes Covered
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('attendance')}
          className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Attendance</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">96.2%</h3>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> QR / Biometric Live
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('fees')}
          className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fees Collected</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">${totalCollected + 418000}</h3>
          <p className="text-xs text-amber-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 92% Recovery Rate
          </p>
        </div>
      </div>

      {/* Main Charts & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Expenses Area Chart */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Financial Revenue & Expense Matrix (2026)</h3>
              <p className="text-xs text-slate-400">Monthly Tuition Fee Inflow vs Operational Overhead</p>
            </div>
            <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
              Live Accounts Ledger
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} name="Income ($)" />
                <Area type="monotone" dataKey="expenses" stroke="#06b6d4" fillOpacity={1} fill="url(#colorExp)" strokeWidth={2} name="Expenses ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Administrative Quick Actions</h3>
            <p className="text-xs text-slate-400 mb-4">Execute high-priority workflows in 1 click</p>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigateTab('admissions')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-900 dark:text-indigo-200 text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <UserPlus className="w-4 h-4 text-indigo-600" />
                  <span>Online Student Admission Form</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-indigo-600" />
              </button>

              <button
                onClick={() => onNavigateTab('attendance')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  <span>Mark QR / Biometric Attendance</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                onClick={() => onNavigateTab('exams')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-900 dark:text-blue-200 text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Generate PDF Result Cards</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => onNavigateTab('communication')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4 text-amber-600" />
                  <span>Broadcast SMS / WhatsApp Alert</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-amber-600" />
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-100">AI Fee Recovery Watch</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">12 parents reminded via AI SMS automated agent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
