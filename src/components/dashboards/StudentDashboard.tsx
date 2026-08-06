import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  CalendarCheck,
  FileText,
  Award,
  Clock,
  CheckCircle2,
  Download,
  Bus,
  Sparkles
} from 'lucide-react';
import { NavTab } from '../Sidebar';

interface StudentDashboardProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenCopilot: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigateTab,
  onOpenCopilot
}) => {
  const { students, homeworks, exams, fees, routes } = useSchool();
  const student = students[0]; // Alex Morgan
  const result = exams[0];
  const bus = routes[0];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Student Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={student.photo}
            alt={student.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-cyan-400/30 shadow-md"
          />
          <div>
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Student Academic Portal 2026
            </span>
            <h2 className="text-2xl font-black mt-1 tracking-tight">Welcome, {student.name} 🎓</h2>
            <p className="text-xs text-cyan-200 mt-0.5">
              Grade 10-A • Roll #{student.rollNo} • Admission #{student.admissionNo} • {student.house}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('exams')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white rounded-2xl shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Result Card</span>
          </button>
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 backdrop-blur-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Study Tutor</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall GPA</span>
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{student.gpa} / 4.0</h3>
          <p className="text-xs text-indigo-600 font-semibold mt-1">Class Rank: #2 in Grade 10</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{student.attendancePercentage}%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Present 48 of 50 Days</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Homework</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{homeworks.length} Due Soon</h3>
          <p className="text-xs text-blue-600 font-semibold mt-1">Physics & Chemistry</p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Voucher</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{fees[0].status}</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Voucher #{fees[0].voucherNo}</p>
        </div>
      </div>

      {/* Homework Due & Midterm Result Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Homework Items */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Assigned Homework & Online Submissions</h3>
            <button
              onClick={() => onNavigateTab('homework')}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {homeworks.map((hw) => (
              <div
                key={hw.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                      {hw.subject}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{hw.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{hw.description}</p>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Due Date: {hw.dueDate} • Assigned by {hw.teacherName}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab('homework')}
                  className="px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-xs shrink-0 self-start sm:self-auto"
                >
                  Submit Online
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Bus Tracker Widget */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bus className="w-4 h-4 text-indigo-600" /> GPS Bus Location
              </h3>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-100 text-emerald-700">
                Live GPS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Route 04 ({bus.routeName}) • Driver: {bus.driverName}
            </p>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center animate-bounce">
                <Bus className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">Bus is 8 mins away from Stop 2</p>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400">Current Speed: {bus.currentLocation?.speed} mph</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('transport')}
            className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 rounded-xl transition-colors"
          >
            Open Full Interactive Map
          </button>
        </div>
      </div>
    </div>
  );
};
