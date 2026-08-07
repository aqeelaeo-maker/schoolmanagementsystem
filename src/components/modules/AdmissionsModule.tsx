import React, { useState, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { UserPlus, CheckCircle2, QrCode, Sparkles, Printer, Upload, Camera, Trash2, Image as ImageIcon } from 'lucide-react';
import { Student } from '../../types';

export const AdmissionsModule: React.FC = () => {
  const { addStudent, classes, routes, hostelRooms } = useSchool();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [photoFileName, setPhotoFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [admittedStudent, setAdmittedStudent] = useState<Student | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, photo: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, photo: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
            {/* Student Profile Picture Upload */}
            <div className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-600/80">
              <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Student Profile Picture
                </span>
                <span className="text-[10px] font-normal text-slate-400">Official Badge & ID Card Photo</span>
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Avatar Preview */}
                <div className="relative group shrink-0">
                  <img
                    src={formData.photo}
                    alt="Student Preview"
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-md bg-slate-200 dark:bg-slate-800"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    title="Change Photo"
                  >
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* File Upload Box */}
                <div className="flex-1 w-full space-y-2">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`p-3 rounded-xl border-2 border-dashed text-center transition-all ${
                      isDragging
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 scale-[1.01]'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer text-xs"
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload Student Picture
                      </button>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">or drag & drop file here</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
                  </div>

                  {photoFileName ? (
                    <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-lg text-[11px] border border-emerald-200 dark:border-emerald-800/50">
                      <span className="truncate font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Photo Uploaded: <span className="font-bold">{photoFileName}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoFileName('');
                          setFormData((prev) => ({
                            ...prev,
                            photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
                          }));
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Remove uploaded photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 pl-1">
                      <ImageIcon className="w-3 h-3 text-indigo-500" />
                      <span>Upload student passport-size picture for official records and QR badge.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
