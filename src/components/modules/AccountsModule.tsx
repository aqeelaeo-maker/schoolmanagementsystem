import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { DollarSign, Plus, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';

export const AccountsModule: React.FC = () => {
  const { transactions, addTransaction } = useSchool();
  const [type, setType] = useState<'Income' | 'Expense'>('Expense');
  const [category, setCategory] = useState('Laboratory Supplies');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState(1200);

  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc) return;

    addTransaction({
      type,
      category,
      description: desc,
      amount,
      paymentMode: 'Bank Transfer',
      referenceNo: `REF-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setDesc('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Accounts & General Ledger 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Financial Accounts & P&L Ledger</h2>
          <p className="text-xs text-emerald-200 mt-1">
            Track real-time tuition income, vendor expenses, payroll overhead, and profit margins.
          </p>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Income</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-2">${totalIncome}</h3>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Tuition & Transport Receipts
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Operational Expense</span>
          <h3 className="text-2xl font-black text-rose-600 mt-2">${totalExpense}</h3>
          <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
            <ArrowDownRight className="w-3.5 h-3.5" /> Salaries & Utility Maintenance
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Profit Surplus</span>
          <h3 className="text-2xl font-black text-indigo-600 mt-2">${netProfit}</h3>
          <p className="text-xs text-indigo-600 font-semibold mt-1">✓ Balanced Audit Books</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Record Transaction Form */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" /> Record Ledger Transaction
          </h3>

          <form onSubmit={handleAdd} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Transaction Type</label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
              >
                <option value="Expense">Expense Outflow</option>
                <option value="Income">Income Inflow</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <input
                type="text"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="e.g. Science Lab Microscope Purchase"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Amount ($)</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-md transition-all"
            >
              Post to General Ledger
            </button>
          </form>
        </div>

        {/* Transactions Table */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Financial Ledger Entries</h3>

          <div className="space-y-2 max-h-[360px] overflow-y-auto">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{tx.description}</span>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-indigo-100 text-indigo-700">
                      {tx.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Date: {tx.date} • Mode: {tx.paymentMode} • Ref: {tx.referenceNo}
                  </p>
                </div>

                <span
                  className={`font-black text-sm ${
                    tx.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {tx.type === 'Income' ? '+' : '-'}${tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
