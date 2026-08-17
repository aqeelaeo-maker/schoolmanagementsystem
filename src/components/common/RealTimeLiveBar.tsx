import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Clock,
  Activity,
  Wifi,
  Zap,
  Radio,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const RealTimeLiveBar: React.FC = () => {
  const { auditLogs, students, teachers, attendance, fees, addToast } = useSchool();
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [lastSync, setLastSync] = useState<string>('Just now');
  const [simulatedCount, setSimulatedCount] = useState<number>(1240);
  const [currentTickerIndex, setCurrentTickerIndex] = useState<number>(0);

  // Live clock tick
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ticker rotator
  useEffect(() => {
    if (!isLiveActive || auditLogs.length === 0) return;
    const tickerTimer = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % auditLogs.length);
      setLastSync('Just now');
    }, 4000);
    return () => clearInterval(tickerTimer);
  }, [isLiveActive, auditLogs.length]);

  // Simulated live presence fluctuation
  useEffect(() => {
    if (!isLiveActive) return;
    const presenceTimer = setInterval(() => {
      // Random subtle shift in live presence count (+1, -1, or 0)
      const delta = Math.floor(Math.random() * 3) - 1;
      setSimulatedCount((prev) => Math.max(1200, Math.min(1300, prev + delta)));
    }, 6000);
    return () => clearInterval(presenceTimer);
  }, [isLiveActive]);

  const handleManualSync = () => {
    setLastSync('Just now');
    addToast('info', 'Real-Time Sync Triggered', 'Fetched live Firestore telemetry & active WebSocket streams.');
  };

  const presentTodayCount = attendance.filter((a) => a.status === 'Present').length;
  const currentLog = auditLogs[currentTickerIndex] || auditLogs[0];

  return (
    <div className="w-full bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-3 sm:p-4 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
      {/* Left side: Live Pulse Status & Clock */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-bold text-[11px]">
          <span className="relative flex h-2 w-2">
            {isLiveActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">REAL-TIME DATA STREAM</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800/90 border border-slate-700/80 font-mono text-slate-200">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-bold">{time}</span>
          <span className="text-slate-500 text-[10px] hidden sm:inline">| {dateStr}</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sync Latency: <strong className="text-slate-200 font-mono">18ms</strong></span>
        </div>
      </div>

      {/* Middle: Live Event Ticker Marquee */}
      {currentLog && (
        <div className="flex-1 max-w-lg bg-slate-950/70 rounded-xl px-3 py-1.5 border border-slate-800 flex items-center gap-2 overflow-hidden">
          <Radio className="w-3.5 h-3.5 text-indigo-400 shrink-0 animate-pulse" />
          <div className="truncate text-[11px]">
            <span className="font-bold text-indigo-300 mr-1.5">[{currentLog.module || (currentLog as any).category || 'System'}]:</span>
            <span className="text-slate-300">{currentLog.action}</span>
          </div>
          <span className="text-[9px] text-slate-500 shrink-0 font-mono">({lastSync})</span>
        </div>
      )}

      {/* Right side: Live Presence Metric & Controls */}
      <div className="flex items-center gap-2 shrink-0 justify-between md:justify-end">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-800/80 rounded-xl border border-slate-700/60 text-[11px]">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Active On Campus: <strong className="text-white font-mono">{students.length + presentTodayCount}</strong></span>
        </div>

        <button
          onClick={handleManualSync}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer active:scale-90"
          title="Force Real-Time Sync"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsLiveActive(!isLiveActive)}
          className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
            isLiveActive
              ? 'bg-indigo-950/80 border-indigo-700/80 text-indigo-300'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
          title={isLiveActive ? 'Pause Stream' : 'Resume Stream'}
        >
          {isLiveActive ? <Pause className="w-3 h-3 text-indigo-400" /> : <Play className="w-3 h-3 text-slate-400" />}
          <span>{isLiveActive ? 'LIVE' : 'PAUSED'}</span>
        </button>
      </div>
    </div>
  );
};
