import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Briefcase, DollarSign, Printer, CheckCircle2 } from 'lucide-react';

export const HRModule: React.FC = () => {
  const { payroll } = useSchool();

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Human Resources & Payroll 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Staff Payroll & Salary Disbursal</h2>
          <p className="text-xs text-blue-200 mt-1">
            Faculty salary calculations, tax deductions, bonuses, direct bank transfers, and PDF salary slips.
          </p>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Monthly Staff Salary Disbursal Register</h3>

        <div className="space-y-3">
          {payroll.map((pay) => (
            <div
              key={pay.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{pay.staffName}</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-700">
                    {pay.status}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Designation: {pay.designation} • Month: {pay.monthYear}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-slate-400 text-[10px]">Net Salary Paid:</p>
                  <p className="font-black text-sm text-indigo-600 dark:text-indigo-400">${pay.netSalary}</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Salary Slip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
