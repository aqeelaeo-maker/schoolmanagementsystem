import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { FileText, Plus, Upload, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const HomeworkModule: React.FC = () => {
  const { homeworks, submissions, addHomework, submitHomework, gradeHomework, currentUser, activeRole } = useSchool();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newClass, setNewClass] = useState('Grade 10');
  const [newDesc, setNewDesc] = useState('');
  const [newDueDate, setNewDueDate] = useState('2026-08-28');

  const [submissionText, setSubmissionText] = useState('');
  const [activeHomeworkForSubmission, setActiveHomeworkForSubmission] = useState<string | null>(null);

  const handleCreateHW = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    addHomework({
      title: newTitle,
      subject: newSubject,
      className: newClass,
      section: 'A',
      teacherName: currentUser.name,
      dueDate: newDueDate,
      description: newDesc,
      attachments: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600']
    });

    setNewTitle('');
    setNewDesc('');
    setIsAssignModalOpen(false);
  };

  const handleStudentSubmit = (homeworkId: string) => {
    if (!submissionText.trim()) return;

    submitHomework({
      homeworkId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      attachmentUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600',
      textResponse: submissionText
    });

    setSubmissionText('');
    setActiveHomeworkForSubmission(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Homework & Digital Submissions 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Assignment Portal & Grading Hub</h2>
          <p className="text-xs text-blue-200 mt-1">
            Publish assignments with media attachments, submit online essays, and grade with AI feedback assistance.
          </p>
        </div>

        {(activeRole === 'teacher' || activeRole === 'school_admin' || activeRole === 'super_admin') && (
          <button
            onClick={() => setIsAssignModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded-2xl shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Homework Assignment</span>
          </button>
        )}
      </div>

      {/* Homework Creation Modal */}
      {isAssignModalOpen && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-4 animate-in slide-in-from-top-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" /> New Assignment Details
          </h3>

          <form onSubmit={handleCreateHW} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Quantum Mechanics Problem Set"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600"
                >
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English Literature">English Literature</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Instructions / Description</label>
              <textarea
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                placeholder="Explain assignment requirements..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md"
              >
                Publish Assignment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Homework Items List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {homeworks.map((hw) => (
          <div
            key={hw.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                  {hw.subject} • {hw.className}-{hw.section}
                </span>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Due: {hw.dueDate}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">{hw.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">{hw.description}</p>

              {hw.attachments && hw.attachments.length > 0 && (
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3 mb-4">
                  <img src={hw.attachments[0]} alt="Attachment" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Lab Reference Worksheet.pdf</p>
                    <p className="text-[10px] text-indigo-600 font-medium">Click to preview document</p>
                  </div>
                </div>
              )}
            </div>

            {/* Submission Section */}
            {activeHomeworkForSubmission === hw.id ? (
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={3}
                  placeholder="Type your homework answer or paste solution link..."
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setActiveHomeworkForSubmission(null)}
                    className="px-3 py-1.5 text-slate-600 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStudentSubmit(hw.id)}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-xs"
                  >
                    Submit Assignment
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/80">
                <span className="text-xs text-slate-400 font-semibold">{hw.totalSubmissions} Submissions Received</span>

                {activeRole === 'student' && (
                  <button
                    onClick={() => setActiveHomeworkForSubmission(hw.id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl shadow-xs flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" /> Submit Solution
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
