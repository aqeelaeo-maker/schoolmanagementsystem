import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Activity,
  UserCheck,
  CreditCard,
  GraduationCap,
  FileText,
  Radio,
  Clock,
  Sparkles,
  Zap,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface RealTimeActivityFeedProps {
  maxItems?: number;
  showCategoryFilter?: boolean;
}

export const RealTimeActivityFeed: React.FC<RealTimeActivityFeedProps> = ({
  maxItems = 8,
  showCategoryFilter = true
}) => {
  const { auditLogs, attendance, fees, homeworks, students, messages } = useSchool();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [livePulse, setLivePulse] = useState<boolean>(true);

  // Pulse animation trigger
  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setLivePulse((prev) => !prev);
    }, 2000);
    return () => clearInterval(pulseTimer);
  }, []);

  // Compile real-time unified feed items from Context state
  const compiledFeed = React.useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      subtitle: string;
      timestamp: string;
      category: 'Attendance' | 'Fees' | 'Admissions' | 'Homework' | 'System';
      icon: React.ReactNode;
      badgeColor: string;
    }> = [];

    // Add Audit Logs
    auditLogs.forEach((log) => {
      let category: 'Attendance' | 'Fees' | 'Admissions' | 'Homework' | 'System' = 'System';
      let icon = <Activity className="w-3.5 h-3.5 text-indigo-500" />;
      let badgeColor = 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300';

      const logCategory = log.module || (log as any).category || '';
      const logUser = log.userName || (log as any).user || 'System';
      const logTime = log.timestamp || 'Just now';

      if (logCategory.includes('Admissions') || logCategory.includes('Student')) {
        category = 'Admissions';
        icon = <GraduationCap className="w-3.5 h-3.5 text-purple-500" />;
        badgeColor = 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300';
      } else if (logCategory.includes('Attendance')) {
        category = 'Attendance';
        icon = <UserCheck className="w-3.5 h-3.5 text-emerald-500" />;
        badgeColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300';
      } else if (logCategory.includes('Fees') || logCategory.includes('Financial') || logCategory.includes('Finance')) {
        category = 'Fees';
        icon = <CreditCard className="w-3.5 h-3.5 text-amber-500" />;
        badgeColor = 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300';
      } else if (logCategory.includes('Homework') || logCategory.includes('Academics')) {
        category = 'Homework';
        icon = <FileText className="w-3.5 h-3.5 text-blue-500" />;
        badgeColor = 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300';
      }

      items.push({
        id: log.id,
        title: log.action,
        subtitle: `User: ${logUser} • IP: ${log.ipAddress || '127.0.0.1'}`,
        timestamp: logTime.includes(' ') ? logTime.split(' ')[1] : logTime,
        category,
        icon,
        badgeColor
      });
    });

    // Add Recent Attendance Scans
    attendance.slice(0, 5).forEach((att) => {
      items.push({
        id: `att-feed-${att.id}`,
        title: `Biometric Scan: ${att.studentName} marked ${att.status}`,
        subtitle: `Method: ${att.method || 'QR Scanner'} • Class: ${att.className}`,
        timestamp: att.time || '10:15 AM',
        category: 'Attendance',
        icon: <UserCheck className="w-3.5 h-3.5 text-emerald-500" />,
        badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
      });
    });

    // Add Paid Fees
    fees
      .filter((f) => f.status === 'Paid')
      .slice(0, 4)
      .forEach((fee) => {
        items.push({
          id: `fee-feed-${fee.id}`,
          title: `Fee Receipt #${fee.voucherNo}: Paid $${fee.totalAmount}`,
          subtitle: `Student: ${fee.studentName} (${fee.className}) • Method: ${fee.paymentMethod || 'Online'}`,
          timestamp: 'Live Receipt',
          category: 'Fees',
          icon: <CreditCard className="w-3.5 h-3.5 text-amber-500" />,
          badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
        });
      });

    return items;
  }, [auditLogs, attendance, fees]);

  const categories = ['All', 'Attendance', 'Fees', 'Admissions', 'Homework', 'System'];

  const filteredItems = compiledFeed.filter(
    (item) => filterCategory === 'All' || item.category === filterCategory
  );

  return (
    <div className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Radio className="w-4 h-4 animate-pulse text-indigo-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Real-Time Campus Feed
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Live event stream from biometric scans, admissions, and financial ledger</p>
          </div>
        </div>

        {showCategoryFilter && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Activity List */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredItems.slice(0, maxItems).map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-600/60 transition-all flex items-start justify-between gap-3 text-xs"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs leading-tight">
                    {item.title}
                  </h4>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${item.badgeColor}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.subtitle}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 block">{item.timestamp}</span>
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tight flex items-center justify-end gap-1 mt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> LIVE SYNC
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
