import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Search,
  GraduationCap,
  Filter,
  Eye,
  QrCode,
  X,
  Phone,
  Calendar,
  Award,
  CheckCircle2
} from 'lucide-react';
import { Student } from '../../types';

export const StudentsModule: React.FC = () => {
  const { students, classes } = useSchool();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [activeStudentModal, setActiveStudentModal] = useState<Student | null>(null);

  const filtered = students.filter((s) => {
    const matchesSearch =
      (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.admissionNo || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.rollNo || '').toLowerCase().includes(search.toLowerCase());

    const matchesClass = selectedClass === 'All' || s.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Student Management Directory 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Active Student Database</h2>
          <p className="text-xs text-indigo-200 mt-1">
            Displaying {filtered.length} registered students with academic history, attendance meters, and QR codes.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3.5 py-2 bg-slate-50 dark:bg-slate-700/60 rounded-2xl w-full border border-slate-200 dark:border-slate-600">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student by name, admission no, or roll number..."
            className="bg-transparent border-none text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 dark:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-white focus:outline-none"
          >
            <option value="All">All Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((std) => (
          <div
            key={std.id}
            className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  {std.className} - {std.section}
                </span>
                <span className="text-[10px] font-bold text-slate-400">Roll #{std.rollNo}</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={std.photo}
                  alt={std.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {std.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">Adm: {std.admissionNo}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/80 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">GPA Score:</span>
                  <span className="font-bold text-indigo-600">{std.gpa} / 4.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Attendance:</span>
                  <span className="font-bold text-emerald-600">{std.attendancePercentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Parent:</span>
                  <span className="truncate max-w-[120px] font-medium">{std.parentName}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveStudentModal(std)}
              className="mt-4 w-full py-2 bg-slate-100 dark:bg-slate-700/60 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Profile & QR</span>
            </button>
          </div>
        ))}
      </div>

      {/* Student Profile Drawer Modal */}
      {activeStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-cyan-300" />
                <div>
                  <h3 className="font-bold text-base">{activeStudentModal.name}</h3>
                  <p className="text-[11px] text-white/80">
                    Admission #{activeStudentModal.admissionNo} • {activeStudentModal.className}-{activeStudentModal.section}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveStudentModal(null)}
                className="p-1.5 text-white/80 hover:text-white rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40">
                <img
                  src={activeStudentModal.photo}
                  alt={activeStudentModal.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500"
                />
                <div className="space-y-1">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Parent: {activeStudentModal.parentName} ({activeStudentModal.parentPhone})</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>DOB: {activeStudentModal.dateOfBirth} • Blood Group: {activeStudentModal.bloodGroup}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>House: {activeStudentModal.house} • Status: {activeStudentModal.status}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-indigo-950 dark:text-indigo-200">Digital Attendance QR Code</h4>
                  <p className="text-[11px] text-indigo-700 dark:text-indigo-300">Scan at school entry gate scanner</p>
                </div>
                <div className="w-14 h-14 bg-white rounded-xl p-1 shadow-sm flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-slate-900" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setActiveStudentModal(null)}
                className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
