import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { UserPlus, CheckCircle2, QrCode, Sparkles, Printer } from 'lucide-react';
import { Student } from '../../types';

export const AdmissionsModule: React.FC = () => {
  const { addStudent, classes, routes, hostelRooms } = useSchool();

  const [formData, setFormData] = useState({
    name: '',
    className: 'Grade 10',
    section: 'A',
    rollNo: '24',
    dateOfBirth: '2010-04-12',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    parentName: '',
    parentPhone: '+1 (555) 019-2831',
    parentEmail: '',
    address: '742 Evergreen Terrace, Springfield',
    bloodGroup: 'O+',
    house: 'Phoenix',
    busRouteId: '',
    hostelRoomId: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  });

  const [admittedStudent, setAdmittedStudent] = useState<Student | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.parentName) return;

    const newStd = addStudent({
      ...formData,
      status: 'Active'
    });

    setAdmittedStudent(newStd);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Admissions Module 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Online Student Admission & Enrollment</h2>
          <p className="text-xs text-indigo-200 mt-1">
            Enrolling new students automatically provisions Admission IDs, Digital QR Credentials, and Fee Vouchers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admission Form */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-indigo-600" /> Student Enrollment Registration
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Liam Henderson"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Parent / Guardian Name *</label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="e.g. Thomas Henderson"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Class & Grade</label>
                <select
                  value={formData.className}
                  onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Parent Phone (SMS/WhatsApp)</label>
                <input
                  type="text"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Transport Bus Route</label>
                <select
                  value={formData.busRouteId}
                  onChange={(e) => setFormData({ ...formData, busRouteId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                >
                  <option value="">No Transport Required</option>
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>
                      Route {r.routeNumber} ({r.routeName}) - ${r.monthlyFee}/mo
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Hostel Room Allocation</label>
                <select
                  value={formData.hostelRoomId}
                  onChange={(e) => setFormData({ ...formData, hostelRoomId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                >
                  <option value="">Day Scholar (No Hostel)</option>
                  {hostelRooms.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.buildingName} - Room #{h.roomNumber} (${h.feePerTerm}/term)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg transition-all"
            >
              Confirm Admission & Issue Digital Student ID Card
            </button>
          </form>
        </div>

        {/* Generated Student ID Card Preview */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <QrCode className="w-4 h-4 text-indigo-600" /> Digital Student ID Card Preview
            </h3>

            {admittedStudent ? (
              <div className="p-5 rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 text-white shadow-xl relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-black text-sm text-cyan-300 uppercase tracking-wider">St. Jude Academy</h4>
                    <p className="text-[9px] text-white/70">Official Student ID 2026</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={admittedStudent.photo}
                    alt={admittedStudent.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-400"
                  />
                  <div>
                    <h5 className="font-bold text-base text-white">{admittedStudent.name}</h5>
                    <p className="text-xs text-cyan-200">{admittedStudent.className} - {admittedStudent.section}</p>
                    <p className="text-[10px] text-white/80 mt-1 font-mono">Adm: {admittedStudent.admissionNo}</p>
                  </div>
                </div>

                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-between">
                  <div className="text-[10px]">
                    <p className="text-white/70">Parent Contact:</p>
                    <p className="font-semibold">{admittedStudent.parentPhone}</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-slate-900" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl text-center text-slate-400">
                <QrCode className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-semibold">Complete form to preview live generated Student ID Card with QR barcode.</p>
              </div>
            )}
          </div>

          {admittedStudent && (
            <button
              onClick={() => window.print()}
              className="mt-4 w-full py-2.5 bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Official Student ID Badge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
