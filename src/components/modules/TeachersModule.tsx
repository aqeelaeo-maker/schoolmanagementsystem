import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Search, Users, Mail, Phone, BookOpen, Award } from 'lucide-react';

export const TeachersModule: React.FC = () => {
  const { teachers } = useSchool();
  const [search, setSearch] = useState('');

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.some((sub) => sub.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Faculty Directory 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Teachers & Academic Staff Roster</h2>
          <p className="text-xs text-blue-200 mt-1">
            Displaying {filtered.length} faculty educators across STEM, Humanities, Languages, and Arts.
          </p>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teacher name, department, or subject..."
          className="bg-transparent border-none text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tch) => (
          <div
            key={tch.id}
            className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={tch.photo} alt={tch.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-500/20" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{tch.name}</h4>
                  <p className="text-[11px] text-indigo-600 font-medium">{tch.designation} • {tch.department}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/80 pt-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>Subjects: {tch.subjects.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  <span>Classes: {tch.classesAssigned.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tch.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{tch.phone}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-400">Monthly Salary Grade:</span>
              <span className="font-black text-slate-900 dark:text-white">${tch.salary}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
