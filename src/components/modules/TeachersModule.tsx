import React, { useState, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Search,
  Users,
  Mail,
  Phone,
  BookOpen,
  Award,
  Plus,
  UserCheck,
  Building2,
  Calendar,
  X,
  Upload,
  Camera,
  CheckCircle2,
  Trash2,
  Sparkles,
  Filter,
  Briefcase
} from 'lucide-react';
import { Teacher } from '../../types';

export const TeachersModule: React.FC = () => {
  const { teachers, addTeacher, activeRole } = useSchool();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoFileName, setPhotoFileName] = useState('');
  const [newTeacherData, setNewTeacherData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Senior Faculty Member',
    department: 'Science & Mathematics',
    subjects: 'Physics, Mathematics',
    assignedClasses: 'Grade 10-A, Grade 11-A',
    qualification: 'M.Sc Physics, B.Ed',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: 6500,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file must be under 5MB');
        return;
      }
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewTeacherData((prev) => ({ ...prev, photo: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherData.name || !newTeacherData.email) return;

    const subjectsArray = newTeacherData.subjects.split(',').map((s) => s.trim()).filter(Boolean);
    const classesArray = newTeacherData.assignedClasses.split(',').map((c) => c.trim()).filter(Boolean);

    addTeacher({
      name: newTeacherData.name,
      email: newTeacherData.email,
      phone: newTeacherData.phone || '+1 (555) 000-0000',
      designation: newTeacherData.designation,
      department: newTeacherData.department,
      subjects: subjectsArray.length > 0 ? subjectsArray : ['General'],
      assignedClasses: classesArray.length > 0 ? classesArray : ['Grade 10-A'],
      qualification: newTeacherData.qualification,
      joiningDate: newTeacherData.joiningDate,
      salary: Number(newTeacherData.salary) || 5000,
      photo: newTeacherData.photo
    });

    setIsAddModalOpen(false);
    setPhotoFileName('');
    setNewTeacherData({
      name: '',
      email: '',
      phone: '',
      designation: 'Senior Faculty Member',
      department: 'Science & Mathematics',
      subjects: 'Physics, Mathematics',
      assignedClasses: 'Grade 10-A, Grade 11-A',
      qualification: 'M.Sc Physics, B.Ed',
      joiningDate: new Date().toISOString().split('T')[0],
      salary: 6500,
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    });
  };

  const departments = ['All', ...Array.from(new Set(teachers.map((t) => t.department)))];

  const filtered = teachers.filter((t) => {
    const matchesSearch =
      (t.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.department || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.designation || '').toLowerCase().includes(search.toLowerCase()) ||
      (t.subjects && t.subjects.some((sub) => (sub || '').toLowerCase().includes(search.toLowerCase())));

    const matchesDept = selectedDept === 'All' || t.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const activeTeachersCount = teachers.filter((t) => t.status === 'active').length;
  const totalDepartments = new Set(teachers.map((t) => t.department)).size;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-amber-400" /> Faculty & Staff Directory
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Teachers & Academic Staff Roster</h2>
          <p className="text-xs text-blue-200 mt-1 max-w-2xl">
            Manage academic faculty, view department allocations, qualifications, assigned classes, and contact details.
          </p>
        </div>

        {(activeRole === 'super_admin' || activeRole === 'school_admin') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add New Teacher
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Faculty</p>
            <p className="text-lg font-black text-slate-900 dark:text-white">{teachers.length}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Status</p>
            <p className="text-lg font-black text-slate-900 dark:text-white">{activeTeachersCount}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Departments</p>
            <p className="text-lg font-black text-slate-900 dark:text-white">{totalDepartments}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Salary</p>
            <p className="text-lg font-black text-slate-900 dark:text-white">
              ${Math.round(teachers.reduce((acc, t) => acc + (t.salary || 0), 0) / (teachers.length || 1))}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="flex-1 w-full flex items-center gap-2.5 px-3.5 py-2 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teacher name, designation, department, or subject..."
            className="bg-transparent border-none text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none w-full"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 w-full md:w-auto">
            <Filter className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[11px] text-slate-400 hidden sm:inline">Dept:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-xs font-semibold text-slate-800 dark:text-white cursor-pointer w-full"
            >
              {departments.map((d) => (
                <option key={d} value={d} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 w-full md:w-auto">
            <span className="text-[11px] text-slate-400 hidden sm:inline">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-xs font-semibold text-slate-800 dark:text-white cursor-pointer w-full"
            >
              <option value="All" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">All Status</option>
              <option value="active" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">Active</option>
              <option value="on_leave" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teachers Roster Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">No faculty members found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            No matching teachers found for query "{search}". Try clearing filters or searching for another subject or department.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tch) => {
            const classesList = tch.assignedClasses || (tch as any).classesAssigned || [];
            const subjectsList = tch.subjects || [];

            return (
              <div
                key={tch.id}
                className="p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Header info */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={tch.photo}
                        alt={tch.name}
                        className="w-13 h-13 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-xs shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{tch.name}</h4>
                        <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">{tch.designation}</p>
                        <p className="text-[10px] text-slate-400">{tch.department} • {tch.employeeId}</p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        tch.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/40'
                      }`}
                    >
                      {tch.status === 'active' ? 'Active' : 'On Leave'}
                    </span>
                  </div>

                  {/* Qualification & Joining */}
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-3 text-[11px] space-y-1 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="font-medium truncate">{tch.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>Joined: {tch.joiningDate}</span>
                    </div>
                  </div>

                  {/* Details section */}
                  <div className="space-y-2 text-[11px] text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/80 pt-3">
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Subjects: </span>
                        <span className="text-slate-600 dark:text-slate-400">{subjectsList.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Classes: </span>
                        <span className="text-slate-600 dark:text-slate-400">{classesList.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-500">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <a href={`mailto:${tch.email}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 truncate">
                        {tch.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{tch.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Grade & Quick Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Monthly Grade</span>
                    <span className="font-black text-slate-900 dark:text-white">${tch.salary}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${tch.email}`}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-[10px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3 text-indigo-500" /> Email
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-700 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Add New Teacher / Staff</h3>
                  <p className="text-[11px] text-slate-400">Register new faculty educator in school directory</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              {/* Photo Upload Box */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                <img
                  src={newTeacherData.photo}
                  alt="Teacher Preview"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30 shrink-0"
                />
                <div className="space-y-1 flex-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block text-[11px]">Faculty Profile Picture</span>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-[10px] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" /> Upload Photo
                  </button>
                  {photoFileName && <p className="text-[10px] text-emerald-600 font-medium">Uploaded: {photoFileName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newTeacherData.name}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, name: e.target.value })}
                    placeholder="e.g. Dr. Robert Vance"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={newTeacherData.email}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, email: e.target.value })}
                    placeholder="e.g. r.vance@stjude.edu"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newTeacherData.phone}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, phone: e.target.value })}
                    placeholder="+1 (555) 234-5678"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={newTeacherData.department}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, department: e.target.value })}
                    placeholder="Science & Mathematics"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Designation</label>
                  <input
                    type="text"
                    value={newTeacherData.designation}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, designation: e.target.value })}
                    placeholder="Senior Physics Lecturer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Monthly Salary ($)</label>
                  <input
                    type="number"
                    value={newTeacherData.salary}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, salary: Number(e.target.value) })}
                    placeholder="6500"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={newTeacherData.qualification}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, qualification: e.target.value })}
                    placeholder="Ph.D Physics, B.Ed"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Joining Date</label>
                  <input
                    type="date"
                    value={newTeacherData.joiningDate}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, joiningDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subjects (comma separated)</label>
                <input
                  type="text"
                  value={newTeacherData.subjects}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, subjects: e.target.value })}
                  placeholder="Physics, Advanced Mathematics"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Classes (comma separated)</label>
                <input
                  type="text"
                  value={newTeacherData.assignedClasses}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, assignedClasses: e.target.value })}
                  placeholder="Grade 10-A, Grade 11-B"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
