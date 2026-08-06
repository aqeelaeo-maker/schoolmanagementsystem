import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  CalendarCheck,
  FileText,
  Award,
  BookOpen,
  Sparkles,
  Plus,
  Users
} from 'lucide-react';
import { NavTab } from '../Sidebar';

interface TeacherDashboardProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenCopilot: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onNavigateTab,
  onOpenCopilot
}) => {
  const { currentUser, homeworks, students } = useSchool();

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Teacher Faculty Portal
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Welcome, {currentUser.name} 👨‍🏫</h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xl">
            You have 3 scheduled periods today (Physics Grade 10-A, Chemistry Lab Grade 11-A). 2 homework assignments pending review.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('homework')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded-2xl shadow-lg shadow-blue-500/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Assign Homework</span>
          </button>
          <button
            onClick={onOpenCopilot}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Lesson Assistant</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('attendance')}
          className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">My Classes</span>
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Grade 10-A, 11-A</h3>
          <p className="text-xs text-indigo-600 font-semibold mt-1">64 Total Assigned Students</p>
        </div>

        <div
          onClick={() => onNavigateTab('homework')}
          className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Homework</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">{homeworks.length} Active</h3>
          <p className="text-xs text-blue-600 font-semibold mt-1">52 Submissions Received</p>
        </div>

        <div
          onClick={() => onNavigateTab('exams')}
          className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Midterm Evaluation</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Class Avg 3.88 GPA</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Results Published</p>
        </div>

        <div
          onClick={() => onNavigateTab('timetable')}
          className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Period</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">09:15 AM</h3>
          <p className="text-xs text-amber-600 font-semibold mt-1">Room 202 - Physics Lab</p>
        </div>
      </div>

      {/* Class Students & Quick Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Grade 10-A Student Roster</h3>
            <button
              onClick={() => onNavigateTab('attendance')}
              className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
            >
              <CalendarCheck className="w-3.5 h-3.5" /> Quick Attendance
            </button>
          </div>
          <div className="space-y-2">
            {students.slice(0, 4).map((std) => (
              <div
                key={std.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={std.photo} alt={std.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{std.name}</h4>
                    <p className="text-[10px] text-slate-400">Roll #{std.rollNo} • GPA: {std.gpa} • Attendance: {std.attendancePercentage}%</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 font-bold text-[10px] rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  Present
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Co-Pilot Assistant Shortcuts */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> AI Teacher Tools 2026
            </h3>
            <p className="text-xs text-slate-400 mb-4">Leverage Gemini 3.6 Flash to simplify grading & question paper design.</p>
            <div className="space-y-2">
              <button
                onClick={onOpenCopilot}
                className="w-full text-left p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-900 dark:text-indigo-200 text-xs font-semibold"
              >
                📝 Generate Exam Question Paper
              </button>
              <button
                onClick={onOpenCopilot}
                className="w-full text-left p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-900 dark:text-blue-200 text-xs font-semibold"
              >
                💬 Draft Parent Reply Assistant
              </button>
              <button
                onClick={onOpenCopilot}
                className="w-full text-left p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-900 dark:text-emerald-200 text-xs font-semibold"
              >
                🌟 Auto-Write Report Card Remarks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
