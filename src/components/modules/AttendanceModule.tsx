import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CalendarCheck, QrCode, CheckCircle2, XCircle, Clock, AlertTriangle, Camera } from 'lucide-react';

export const AttendanceModule: React.FC = () => {
  const { students, attendance, markAttendance, classes } = useSchool();
  const [selectedClass, setSelectedClass] = useState('Grade 10');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const classStudents = students.filter((s) => s.className === selectedClass);

  const handleStatusChange = (
    studentId: string,
    studentName: string,
    className: string,
    status: 'Present' | 'Absent' | 'Late' | 'On Leave'
  ) => {
    markAttendance({
      studentId,
      studentName,
      className,
      date: selectedDate,
      status,
      method: 'Manual Entry'
    });
  };

  const handleSimulateScan = (studentId: string, studentName: string, className: string) => {
    markAttendance({
      studentId,
      studentName,
      className,
      date: selectedDate,
      status: 'Present',
      method: 'QR Camera Scanner',
      timeIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setScanResult(`Scanned & Verified: ${studentName} (${className}) marked Present!`);
    setTimeout(() => setScanResult(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Attendance Register & QR Scanner 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Daily Student Attendance Management</h2>
          <p className="text-xs text-emerald-200 mt-1">
            Mark attendance via manual grid register, live camera QR scanner, or RFID gate logger.
          </p>
        </div>
        <button
          onClick={() => setIsScannerOpen(!isScannerOpen)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl shadow-lg transition-all"
        >
          <Camera className="w-4 h-4" />
          <span>{isScannerOpen ? 'Close QR Scanner' : 'Launch QR Scanner'}</span>
        </button>
      </div>

      {/* QR Scanner Simulation Box */}
      {isScannerOpen && (
        <div className="p-6 bg-slate-900 text-white rounded-3xl border border-slate-700 shadow-xl space-y-4 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-400" /> Live Optical QR Barcode Gate Scanner
            </h3>
            <span className="text-xs text-emerald-400 font-mono animate-pulse">● Camera Feed Live</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-dashed border-emerald-500/40 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <QrCode className="w-10 h-10 text-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-300 font-semibold">Align Student QR ID Badge in center frame to verify</p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {classStudents.map((std) => (
                <button
                  key={std.id}
                  onClick={() => handleSimulateScan(std.id, std.name, std.className)}
                  className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 rounded-xl text-xs font-semibold transition-all"
                >
                  Scan {std.name}'s ID Badge
                </button>
              ))}
            </div>
          </div>

          {scanResult && (
            <div className="p-3 bg-emerald-900/60 border border-emerald-500 text-emerald-200 rounded-xl text-xs font-bold text-center animate-in fade-in">
              {scanResult}
            </div>
          )}
        </div>
      )}

      {/* Attendance Register Controls */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-500">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 dark:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-white"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-500">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 dark:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* Attendance Register Table Grid */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          Attendance Roster for {selectedClass} ({selectedDate})
        </h3>

        <div className="space-y-2">
          {classStudents.map((std) => {
            const currentRec = attendance.find(
              (a) => a.studentId === std.id && a.date === selectedDate
            );
            const currentStatus = currentRec ? currentRec.status : 'Present';

            return (
              <div
                key={std.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={std.photo} alt={std.name} className="w-10 h-10 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{std.name}</h4>
                    <p className="text-[10px] text-slate-400">Roll #{std.rollNo} • Adm #{std.admissionNo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => handleStatusChange(std.id, std.name, std.className, 'Present')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                      currentStatus === 'Present'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Present
                  </button>

                  <button
                    onClick={() => handleStatusChange(std.id, std.name, std.className, 'Absent')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                      currentStatus === 'Absent'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> Absent
                  </button>

                  <button
                    onClick={() => handleStatusChange(std.id, std.name, std.className, 'Late')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                      currentStatus === 'Late'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> Late
                  </button>

                  <button
                    onClick={() => handleStatusChange(std.id, std.name, std.className, 'On Leave')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                      currentStatus === 'On Leave'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" /> Leave
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
