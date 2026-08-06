import React, { useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';
import { Search, GraduationCap, Users, BookOpen, CreditCard, Bus, X, ArrowRight } from 'lucide-react';
import { NavTab } from './Sidebar';

interface GlobalSearchModalProps {
  onNavigateTab: (tab: NavTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ onNavigateTab }) => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    students,
    teachers,
    books,
    fees,
    routes
  } = useSchool();

  // Keyboard shortcut listener Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const filteredStudents = query
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.admissionNo.toLowerCase().includes(query) ||
          s.rollNo.toLowerCase().includes(query) ||
          s.className.toLowerCase().includes(query)
      )
    : students.slice(0, 3);

  const filteredTeachers = query
    ? teachers.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.department.toLowerCase().includes(query) ||
          t.subjects.some((sub) => sub.toLowerCase().includes(query))
      )
    : teachers.slice(0, 2);

  const filteredBooks = query
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          b.isbn.toLowerCase().includes(query)
      )
    : books.slice(0, 2);

  const filteredFees = query
    ? fees.filter(
        (f) =>
          f.studentName.toLowerCase().includes(query) ||
          f.voucherNo.toLowerCase().includes(query)
      )
    : fees.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/80 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type a student name, roll number, teacher, book ISBN, or fee voucher..."
            className="flex-1 bg-transparent border-none text-slate-800 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Students Section */}
          {filteredStudents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Students</span>
              </div>
              <div className="space-y-1">
                {filteredStudents.map((std) => (
                  <div
                    key={std.id}
                    onClick={() => {
                      onNavigateTab('students');
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={std.photo} alt={std.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                          {std.name}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {std.className} - {std.section} • Roll #{std.rollNo} • Adm #{std.admissionNo}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teachers Section */}
          {filteredTeachers.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faculty & Staff</span>
              </div>
              <div className="space-y-1">
                {filteredTeachers.map((tch) => (
                  <div
                    key={tch.id}
                    onClick={() => {
                      onNavigateTab('teachers');
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-blue-50/80 dark:hover:bg-blue-950/40 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={tch.photo} alt={tch.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                          {tch.name}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {tch.designation} • {tch.department}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Books Section */}
          {filteredBooks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Library Books</span>
              </div>
              <div className="space-y-1">
                {filteredBooks.map((bk) => (
                  <div
                    key={bk.id}
                    onClick={() => {
                      onNavigateTab('library');
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 cursor-pointer group transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                        {bk.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Author: {bk.author} • ISBN: {bk.isbn} • {bk.copiesAvailable} copies in stock
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fees Section */}
          {filteredFees.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fee Vouchers</span>
              </div>
              <div className="space-y-1">
                {filteredFees.map((fee) => (
                  <div
                    key={fee.id}
                    onClick={() => {
                      onNavigateTab('fees');
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-amber-50/80 dark:hover:bg-amber-950/40 cursor-pointer group transition-colors"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                        {fee.studentName} - Voucher #{fee.voucherNo}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Amount: ${fee.totalAmount} • Status: {fee.status} • Due: {fee.dueDate}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Press ESC to exit</span>
          <span>Instant Command Palette • EduPulse 2026</span>
        </div>
      </div>
    </div>
  );
};
