import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  ShieldCheck,
  Download,
  Plus,
  ArrowUpRight
} from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const { schools, auditLogs, addToast } = useSchool();

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Super Admin Control Center 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Multi-School Network Enterprise Overview</h2>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">
            Managing {schools.length} active educational institutions, 2,130 total enrolled students, 146 faculty members, and global audit compliance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast('success', 'System Backup Triggered', 'Full Firestore & PostgreSQL Database snapshot backed up to secure cloud vault.')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 backdrop-blur-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Cloud Backup</span>
          </button>
          <button
            onClick={() => addToast('info', 'New Campus Provisioning', 'School provisioning wizard initiated.')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-purple-500 hover:bg-purple-400 text-white rounded-2xl shadow-lg shadow-purple-500/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add School</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Campuses</span>
            <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{schools.length}</h3>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +100% active operational uptime
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Network Students</span>
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">2,130</h3>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% enrollment growth
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">MRR Revenue</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">$28,400</h3>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Enterprise SaaS Subscriptions
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Health</span>
            <div className="p-2.5 rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-300">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">99.98%</h3>
          <p className="text-xs text-cyan-600 font-semibold flex items-center gap-1 mt-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Zero Security Incidents
          </p>
        </div>
      </div>

      {/* Schools List & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Managed Schools */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Provisioned Campuses</h3>
          <div className="space-y-3">
            {schools.map((sch) => (
              <div
                key={sch.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img src={sch.logo} alt={sch.name} className="w-10 h-10 rounded-2xl object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{sch.name}</h4>
                    <p className="text-xs text-slate-400">
                      Code: {sch.code} • Principal: {sch.principal} • {sch.studentsCount} Students
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {sch.plan} Plan
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Stream */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">System Audit Logs</h3>
          <div className="space-y-3 max-h-[320px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/30 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                  <span>{log.userName}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp.split(' ')[1]}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">{log.action}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
                  {log.module}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
