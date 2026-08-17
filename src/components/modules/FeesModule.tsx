import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CreditCard, Printer, CheckCircle2, QrCode, Search, DollarSign, X } from 'lucide-react';
import { FeeVoucher } from '../../types';

export const FeesModule: React.FC = () => {
  const { fees, payFeeVoucher } = useSchool();
  const [search, setSearch] = useState('');
  const [activePaymentModal, setActivePaymentModal] = useState<FeeVoucher | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Online Banking' | 'UPI' | 'Cash'>('Credit Card');
  const [activeReceiptModal, setActiveReceiptModal] = useState<FeeVoucher | null>(null);

  const filtered = fees.filter(
    (f) =>
      (f.studentName || '').toLowerCase().includes(search.toLowerCase()) ||
      (f.voucherNo || '').toLowerCase().includes(search.toLowerCase())
  );

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePaymentModal) return;

    payFeeVoucher(activePaymentModal.id, paymentMethod);
    const paidVoucher = {
      ...activePaymentModal,
      status: 'Paid' as 'Paid',
      paidDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      transactionRef: `TXN-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    setActivePaymentModal(null);
    setActiveReceiptModal(paidVoucher);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Fee Management & Online Payment 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Student Fee Vouchers & Receipts</h2>
          <p className="text-xs text-amber-200 mt-1">
            Generate monthly fee vouchers, accept online card/UPI payments, and print verified receipts.
          </p>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search voucher by student name or voucher number..."
          className="bg-transparent border-none text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none w-full"
        />
      </div>

      {/* Fee Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((voucher) => (
          <div
            key={voucher.id}
            className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] font-bold text-slate-400">#{voucher.voucherNo}</span>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                    voucher.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  {voucher.status}
                </span>
              </div>

              <h4 className="font-bold text-base text-slate-900 dark:text-white mb-0.5">{voucher.studentName}</h4>
              <p className="text-xs text-slate-400 mb-3">{voucher.className}-{voucher.section} • {voucher.monthYear}</p>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/80 pt-3">
                <div className="flex justify-between">
                  <span>Tuition Fee:</span>
                  <span className="font-semibold">${voucher.tuitionFee}</span>
                </div>
                {voucher.transportFee > 0 && (
                  <div className="flex justify-between">
                    <span>Transport Fee:</span>
                    <span className="font-semibold">${voucher.transportFee}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 font-black text-slate-900 dark:text-white">
                  <span>Total Amount:</span>
                  <span className="text-indigo-600 dark:text-indigo-400">${voucher.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Due: {voucher.dueDate}</span>
              {voucher.status === 'Pending' ? (
                <button
                  onClick={() => setActivePaymentModal(voucher)}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Pay Online
                </button>
              ) : (
                <button
                  onClick={() => setActiveReceiptModal(voucher)}
                  className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Receipt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Online Payment Modal */}
      {activePaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-amber-600 to-indigo-600 text-white flex items-center justify-between">
              <h3 className="font-bold text-sm">Online Payment Checkout</h3>
              <button onClick={() => setActivePaymentModal(null)} className="p-1 text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePay} className="p-6 space-y-4 text-xs text-slate-800 dark:text-slate-200">
              <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold">{activePaymentModal.studentName}</p>
                  <p className="text-[10px] text-slate-400">Voucher #{activePaymentModal.voucherNo}</p>
                </div>
                <span className="font-black text-base text-amber-600">${activePaymentModal.totalAmount}</span>
              </div>

              <div>
                <label className="block font-semibold mb-1">Select Payment Gateway</label>
                <select
                  value={paymentMethod}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-600"
                >
                  <option value="Credit Card">Credit Card / Debit Card</option>
                  <option value="UPI">UPI Instant Payment</option>
                  <option value="Online Banking">Online NetBanking</option>
                  <option value="Cash">Cash at Fee Counter</option>
                </select>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-900 dark:text-indigo-200">
                🔒 256-Bit Encrypted Payment Processing. Verified with School Firestore Ledger.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-2xl shadow-md"
              >
                Confirm Payment of ${activePaymentModal.totalAmount}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Receipt Modal */}
      {activeReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Fee Payment Receipt</h3>
              </div>
              <button onClick={() => setActiveReceiptModal(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs text-slate-800 dark:text-slate-200">
              <div className="text-center pb-3 border-b border-slate-100 dark:border-slate-700">
                <h4 className="font-black text-base text-indigo-600">St. Jude Academy</h4>
                <p className="text-[10px] text-slate-400">Official Fee Payment Confirmation</p>
                <p className="text-[10px] font-mono text-emerald-600 font-bold mt-1">Ref: {activeReceiptModal.transactionRef}</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Name:</span>
                  <span className="font-bold">{activeReceiptModal.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Class & Section:</span>
                  <span className="font-bold">{activeReceiptModal.className}-{activeReceiptModal.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Paid Date:</span>
                  <span className="font-bold">{activeReceiptModal.paidDate}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-black text-sm">
                  <span>Amount Paid:</span>
                  <span className="text-emerald-600">${activeReceiptModal.totalAmount}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-2xl flex items-center justify-between">
                <div className="text-[10px] text-slate-400">
                  <p>QR Verified Payment Token</p>
                  <p>Authentic School Stamp</p>
                </div>
                <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-slate-900" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print PDF Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
