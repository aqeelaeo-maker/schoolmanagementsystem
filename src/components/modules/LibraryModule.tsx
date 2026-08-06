import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { BookOpen, Search, Plus, QrCode, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export const LibraryModule: React.FC = () => {
  const { books, borrowings, issueBook, returnBook, students } = useSchool();
  const [search, setSearch] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Digital Library Catalog & Issue Desk 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Library Books & Borrowing Desk</h2>
          <p className="text-xs text-emerald-200 mt-1">
            Browse 1,200+ textbooks & reference literature, track copies, issue books, and manage return fines.
          </p>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search book title, author, or ISBN barcode..."
          className="bg-transparent border-none text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Books Catalog Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Books Inventory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredBooks.map((bk) => (
              <div
                key={bk.id}
                className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {bk.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Rack: {bk.rackNo}</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">{bk.title}</h4>
                  <p className="text-xs text-slate-400 mb-2">Author: {bk.author}</p>
                  <p className="text-[10px] text-slate-400 font-mono">ISBN: {bk.isbn}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600">
                    {bk.copiesAvailable} / {bk.totalCopies} Available
                  </span>
                  <button
                    onClick={() => issueBook(bk.id, students[0].id, students[0].name, 'Student')}
                    disabled={bk.copiesAvailable <= 0}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Issue Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Borrowings Desk */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-emerald-600" /> Active Issued Borrowings
          </h3>

          <div className="space-y-3">
            {borrowings.map((bor) => (
              <div
                key={bor.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-2"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-800 dark:text-slate-100">{bor.bookTitle}</span>
                  <span
                    className={`px-2 py-0.5 text-[9px] rounded ${
                      bor.status === 'Issued'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {bor.status}
                  </span>
                </div>

                <p className="text-slate-400 text-[11px]">
                  Borrower: {bor.borrowerName} ({bor.borrowerRole}) • Due: {bor.dueDate}
                </p>

                {bor.status === 'Issued' && (
                  <button
                    onClick={() => returnBook(bor.id)}
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] rounded-xl"
                  >
                    Return Book to Library
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
