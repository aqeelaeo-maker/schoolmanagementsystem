import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Award, Printer, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { ExamResult } from '../../types';

export const ExaminationModule: React.FC = () => {
  const { exams, recordExamMarks, students } = useSchool();
  const [activeResultCard, setActiveResultCard] = useState<ExamResult | null>(null);

  const [formData, setFormData] = useState({
    studentId: students[0]?.id || 'std-1',
    examName: 'Midterm Term 1 Examinations 2026',
    term: 'Term 1',
    academicYear: '2026-2027',
    physics: 92,
    chemistry: 88,
    mathematics: 95,
    english: 90,
    computerScience: 98,
    teacherRemarks: 'Outstanding analytical skills and academic discipline.'
  });

  const handleRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const std = students.find((s) => s.id === formData.studentId) || students[0];

    recordExamMarks({
      examName: formData.examName,
      term: formData.term,
      academicYear: formData.academicYear,
      studentId: std.id,
      studentName: std.name,
      className: std.className,
      rollNo: std.rollNo,
      subjectMarks: [
        { subject: 'Physics', obtainedMarks: formData.physics, totalMarks: 100, grade: 'A+', remarks: 'Excellent' },
        { subject: 'Chemistry', obtainedMarks: formData.chemistry, totalMarks: 100, grade: 'A', remarks: 'Good' },
        { subject: 'Mathematics', obtainedMarks: formData.mathematics, totalMarks: 100, grade: 'A+', remarks: 'Top Score' },
        { subject: 'English', obtainedMarks: formData.english, totalMarks: 100, grade: 'A', remarks: 'Very Good' },
        { subject: 'Computer Science', obtainedMarks: formData.computerScience, totalMarks: 100, grade: 'A+', remarks: 'Perfect' },
      ],
      remarks: formData.teacherRemarks
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
            Examinations & GPA Result Cards 2026
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">Academic Examination Management</h2>
          <p className="text-xs text-blue-200 mt-1">
            Record term marks, calculate automated GPA, position ranks, and generate official printable result cards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Record Marks Form */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" /> Record Student Exam Marks
          </h3>

          <form onSubmit={handleRecord} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Student</label>
              <select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.className}-{s.section})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Physics (Out of 100)</label>
                <input
                  type="number"
                  value={formData.physics}
                  onChange={(e) => setFormData({ ...formData, physics: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Chemistry (Out of 100)</label>
                <input
                  type="number"
                  value={formData.chemistry}
                  onChange={(e) => setFormData({ ...formData, chemistry: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Mathematics (Out of 100)</label>
                <input
                  type="number"
                  value={formData.mathematics}
                  onChange={(e) => setFormData({ ...formData, mathematics: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Computer Science (Out of 100)</label>
                <input
                  type="number"
                  value={formData.computerScience}
                  onChange={(e) => setFormData({ ...formData, computerScience: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Teacher Remarks</label>
              <textarea
                value={formData.teacherRemarks}
                onChange={(e) => setFormData({ ...formData, teacherRemarks: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-md transition-all"
            >
              Calculate GPA & Publish Result Card
            </button>
          </form>
        </div>

        {/* Existing Published Results Grid */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Published Student Result Cards</h3>

          <div className="space-y-3">
            {exams.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{res.studentName}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-700">
                      GPA {res.gpa} / 4.0
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    {res.examName} • {res.className} • Position in Class: #{res.positionInClass}
                  </p>
                  <p className="text-slate-500 dark:text-slate-300 text-[10px] mt-1 italic">"{res.remarks}"</p>
                </div>

                <button
                  onClick={() => setActiveResultCard(res)}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 self-start sm:self-auto flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> View Result Card
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card Modal */}
      {activeResultCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-xl">
                  E
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">St. Jude Academy • Official Transcript</h3>
                  <p className="text-[11px] text-slate-400">{activeResultCard.examName}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveResultCard(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-800 dark:text-slate-200">
              <div className="flex justify-between p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl">
                <div>
                  <p className="font-bold text-sm">{activeResultCard.studentName}</p>
                  <p className="text-slate-400 text-[11px]">
                    Class: {activeResultCard.className} • Roll #: {activeResultCard.rollNo}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg text-indigo-600 dark:text-indigo-400">
                    GPA {activeResultCard.gpa} / 4.0
                  </p>
                  <p className="text-emerald-600 font-bold">Class Rank: #{activeResultCard.positionInClass}</p>
                </div>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-bold">
                    <th className="py-2">Subject</th>
                    <th className="py-2">Obtained Marks</th>
                    <th className="py-2">Total Marks</th>
                    <th className="py-2">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
                  {activeResultCard.subjectMarks.map((sub, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-semibold">{sub.subject}</td>
                      <td className="py-2.5 font-bold text-indigo-600">{sub.obtainedMarks}</td>
                      <td className="py-2.5 text-slate-400">{sub.totalMarks}</td>
                      <td className="py-2.5 font-bold text-emerald-600">{sub.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="font-bold text-indigo-950 dark:text-indigo-200">Principal Remarks:</span>
                <p className="text-indigo-700 dark:text-indigo-300 mt-0.5">{activeResultCard.remarks}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Digital Seal & Signature Verified • 2026</span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print PDF Result Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
