import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  School,
  Student,
  Teacher,
  Parent,
  ClassSection,
  AttendanceRecord,
  ExamResult,
  Homework,
  HomeworkSubmission,
  TimetableSlot,
  FeeVoucher,
  Book,
  BookBorrowing,
  TransportRoute,
  HostelRoom,
  PayrollRecord,
  InventoryItem,
  AccountTransaction,
  CommunicationMessage,
  AuditLog
} from '../types';
import {
  INITIAL_SCHOOLS,
  MOCK_USERS,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_CLASSES,
  INITIAL_ATTENDANCE,
  INITIAL_EXAMS,
  INITIAL_HOMEWORK,
  INITIAL_HOMEWORK_SUBMISSIONS,
  INITIAL_TIMETABLE,
  INITIAL_FEES,
  INITIAL_BOOKS,
  INITIAL_BORROWINGS,
  INITIAL_ROUTES,
  INITIAL_HOSTEL_ROOMS,
  INITIAL_PAYROLL,
  INITIAL_INVENTORY,
  INITIAL_TRANSACTIONS,
  INITIAL_MESSAGES,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';
import { testFirebaseConnection } from '../lib/firebase';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface SchoolContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
  activeSchool: School;
  setActiveSchool: (school: School) => void;
  
  // Datasets
  schools: School[];
  students: Student[];
  teachers: Teacher[];
  classes: ClassSection[];
  attendance: AttendanceRecord[];
  exams: ExamResult[];
  homeworks: Homework[];
  submissions: HomeworkSubmission[];
  timetable: TimetableSlot[];
  fees: FeeVoucher[];
  books: Book[];
  borrowings: BookBorrowing[];
  routes: TransportRoute[];
  hostelRooms: HostelRoom[];
  payroll: PayrollRecord[];
  inventory: InventoryItem[];
  transactions: AccountTransaction[];
  messages: CommunicationMessage[];
  auditLogs: AuditLog[];
  
  // UI & Modals State
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toasts: ToastNotification[];
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;
  
  // Actions
  addStudent: (student: Omit<Student, 'id' | 'admissionNo' | 'qrCode' | 'attendancePercentage' | 'gpa' | 'feeStatus'>) => Student;
  markAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  addHomework: (hw: Omit<Homework, 'id' | 'assignedDate' | 'totalSubmissions'>) => void;
  submitHomework: (sub: Omit<HomeworkSubmission, 'id' | 'submissionDate' | 'status'>) => void;
  gradeHomework: (submissionId: string, grade: string, feedback: string) => void;
  recordExamMarks: (result: Omit<ExamResult, 'id' | 'totalObtained' | 'maxTotal' | 'percentage' | 'gpa' | 'positionInClass'>) => void;
  payFeeVoucher: (voucherId: string, paymentMethod: 'Cash' | 'Credit Card' | 'Online Banking' | 'UPI') => void;
  issueBook: (bookId: string, borrowerId: string, borrowerName: string, borrowerRole: 'Student' | 'Teacher') => void;
  returnBook: (borrowingId: string) => void;
  sendBroadcastMessage: (msg: Omit<CommunicationMessage, 'id' | 'timestamp' | 'deliveredCount'>) => void;
  addTransaction: (tx: Omit<AccountTransaction, 'id' | 'date'>) => void;
  updateTimetableSlot: (slot: TimetableSlot) => void;
  firebaseOnline: boolean;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[1]); // Default to School Admin Dr. Sarah Jenkins
  const [activeRole, setActiveRole] = useState<UserRole>('school_admin');
  const [activeSchool, setActiveSchool] = useState<School>(INITIAL_SCHOOLS[0]);
  const [firebaseOnline, setFirebaseOnline] = useState<boolean>(true);

  // Core Data Stores
  const [schools, setSchools] = useState<School[]>(INITIAL_SCHOOLS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [classes, setClasses] = useState<ClassSection[]>(INITIAL_CLASSES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [exams, setExams] = useState<ExamResult[]>(INITIAL_EXAMS);
  const [homeworks, setHomeworks] = useState<Homework[]>(INITIAL_HOMEWORK);
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>(INITIAL_HOMEWORK_SUBMISSIONS);
  const [timetable, setTimetable] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [fees, setFees] = useState<FeeVoucher[]>(INITIAL_FEES);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [borrowings, setBorrowings] = useState<BookBorrowing[]>(INITIAL_BORROWINGS);
  const [routes, setRoutes] = useState<TransportRoute[]>(INITIAL_ROUTES);
  const [hostelRooms, setHostelRooms] = useState<HostelRoom[]>(INITIAL_HOSTEL_ROOMS);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(INITIAL_PAYROLL);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [transactions, setTransactions] = useState<AccountTransaction[]>(INITIAL_TRANSACTIONS);
  const [messages, setMessages] = useState<CommunicationMessage[]>(INITIAL_MESSAGES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Global Search & Toasts
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    testFirebaseConnection().then((online) => setFirebaseOnline(online));
  }, []);

  const addToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    const targetUser = MOCK_USERS.find((u) => u.role === role) || MOCK_USERS[0];
    setCurrentUser(targetUser);
    addToast('info', 'Role Switched', `Switched to ${role.replace('_', ' ').toUpperCase()} portal (${targetUser.name})`);
  };

  // Add Student Admission
  const addStudent = (studentData: Omit<Student, 'id' | 'admissionNo' | 'qrCode' | 'attendancePercentage' | 'gpa' | 'feeStatus'>) => {
    const newId = `std-${Date.now().toString().slice(-4)}`;
    const admNo = `STJ-2026-${Math.floor(100 + Math.random() * 900)}`;
    const qr = `QR-${admNo}`;
    
    const newStudent: Student = {
      ...studentData,
      id: newId,
      admissionNo: admNo,
      qrCode: qr,
      attendancePercentage: 100,
      gpa: 0.0,
      feeStatus: 'Pending'
    };

    setStudents((prev) => [newStudent, ...prev]);

    // Automatically generate initial Fee Voucher
    const newVoucher: FeeVoucher = {
      id: `fee-${Date.now()}`,
      voucherNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: newId,
      studentName: newStudent.name,
      className: newStudent.className,
      section: newStudent.section,
      monthYear: 'August 2026',
      tuitionFee: 450,
      transportFee: newStudent.busRouteId ? 80 : 0,
      hostelFee: newStudent.hostelRoomId ? 350 : 0,
      admissionFee: 150,
      examFee: 50,
      fine: 0,
      discount: 0,
      totalAmount: 650 + (newStudent.busRouteId ? 80 : 0) + (newStudent.hostelRoomId ? 350 : 0),
      dueDate: '2026-08-25',
      status: 'Pending'
    };
    setFees((prev) => [newVoucher, ...prev]);

    addAuditLog(`Enrolled student ${newStudent.name} (${admNo})`, 'Admissions');
    addToast('success', 'Admission Confirmed', `Generated Admission No: ${admNo} & ID Card with QR!`);
    return newStudent;
  };

  // Mark Attendance
  const markAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
    const existingIndex = attendance.findIndex(
      (a) => a.studentId === record.studentId && a.date === record.date
    );
    const newRecord: AttendanceRecord = {
      ...record,
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    };

    if (existingIndex >= 0) {
      setAttendance((prev) => {
        const updated = [...prev];
        updated[existingIndex] = newRecord;
        return updated;
      });
    } else {
      setAttendance((prev) => [newRecord, ...prev]);
    }

    if (record.status === 'Absent' || record.status === 'Late') {
      addToast('warning', 'Attendance Notification', `SMS alert triggered to ${record.studentName}'s parent.`);
    } else {
      addToast('success', 'Attendance Saved', `Recorded ${record.status} for ${record.studentName}`);
    }
  };

  // Homework Actions
  const addHomework = (hwData: Omit<Homework, 'id' | 'assignedDate' | 'totalSubmissions'>) => {
    const newHw: Homework = {
      ...hwData,
      id: `hw-${Date.now()}`,
      assignedDate: new Date().toISOString().split('T')[0],
      totalSubmissions: 0
    };
    setHomeworks((prev) => [newHw, ...prev]);
    addToast('success', 'Homework Assigned', `Published "${newHw.title}" to ${newHw.className}-${newHw.section}`);
  };

  const submitHomework = (subData: Omit<HomeworkSubmission, 'id' | 'submissionDate' | 'status'>) => {
    const newSub: HomeworkSubmission = {
      ...subData,
      id: `sub-${Date.now()}`,
      submissionDate: new Date().toLocaleString(),
      status: 'Submitted'
    };
    setSubmissions((prev) => [newSub, ...prev]);
    setHomeworks((prev) =>
      prev.map((h) =>
        h.id === subData.homeworkId ? { ...h, totalSubmissions: h.totalSubmissions + 1 } : h
      )
    );
    addToast('success', 'Homework Submitted', 'Your assignment has been submitted for teacher review.');
  };

  const gradeHomework = (submissionId: string, grade: string, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, grade, feedback, status: 'Graded' } : s))
    );
    addToast('success', 'Assignment Graded', `Grade ${grade} assigned with feedback.`);
  };

  // Record Exam Marks
  const recordExamMarks = (resultData: Omit<ExamResult, 'id' | 'totalObtained' | 'maxTotal' | 'percentage' | 'gpa' | 'positionInClass'>) => {
    const totalObtained = resultData.subjectMarks.reduce((acc, m) => acc + m.obtainedMarks, 0);
    const maxTotal = resultData.subjectMarks.reduce((acc, m) => acc + m.totalMarks, 0);
    const percentage = Number(((totalObtained / maxTotal) * 100).toFixed(1));
    const gpa = Number(((percentage / 100) * 4.0).toFixed(2));

    const newResult: ExamResult = {
      ...resultData,
      id: `res-${Date.now()}`,
      totalObtained,
      maxTotal,
      percentage,
      gpa,
      positionInClass: Math.floor(Math.random() * 5) + 1
    };

    setExams((prev) => [newResult, ...prev]);
    // Update student GPA
    setStudents((prev) =>
      prev.map((s) => (s.id === resultData.studentId ? { ...s, gpa } : s))
    );

    addAuditLog(`Recorded result card for ${resultData.studentName}`, 'Exams');
    addToast('success', 'Result Card Created', `GPA ${gpa} (${percentage}%) published successfully.`);
  };

  // Fee Payment
  const payFeeVoucher = (voucherId: string, paymentMethod: 'Cash' | 'Credit Card' | 'Online Banking' | 'UPI') => {
    const txnRef = `TXN-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const paidDate = new Date().toISOString().split('T')[0];

    setFees((prev) =>
      prev.map((f) =>
        f.id === voucherId
          ? { ...f, status: 'Paid', paidDate, paymentMethod, transactionRef: txnRef }
          : f
      )
    );

    const feeObj = fees.find((f) => f.id === voucherId);
    if (feeObj) {
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          date: paidDate,
          type: 'Income',
          category: 'Tuition Fees',
          description: `Fee Payment for ${feeObj.studentName} (${feeObj.voucherNo})`,
          amount: feeObj.totalAmount,
          paymentMode: paymentMethod === 'Cash' ? 'Cash' : 'Bank Transfer',
          referenceNo: txnRef
        },
        ...prev
      ]);
    }

    addToast('success', 'Payment Successful', `Receipt #${txnRef} generated with QR Verification.`);
  };

  // Library Actions
  const issueBook = (bookId: string, borrowerId: string, borrowerName: string, borrowerRole: 'Student' | 'Teacher') => {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.copiesAvailable <= 0) {
      addToast('error', 'Issue Failed', 'Book is currently out of stock.');
      return;
    }

    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, copiesAvailable: b.copiesAvailable - 1 } : b))
    );

    const issueDate = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];

    const newBorrowing: BookBorrowing = {
      id: `bor-${Date.now()}`,
      bookId,
      bookTitle: book.title,
      borrowerId,
      borrowerName,
      borrowerRole,
      issueDate,
      dueDate,
      fineAmount: 0,
      status: 'Issued'
    };

    setBorrowings((prev) => [newBorrowing, ...prev]);
    addToast('success', 'Book Issued', `"${book.title}" issued to ${borrowerName}. Due: ${dueDate}`);
  };

  const returnBook = (borrowingId: string) => {
    const bor = borrowings.find((b) => b.id === borrowingId);
    if (!bor) return;

    setBorrowings((prev) =>
      prev.map((b) =>
        b.id === borrowingId
          ? { ...b, status: 'Returned', returnDate: new Date().toISOString().split('T')[0] }
          : b
      )
    );

    setBooks((prev) =>
      prev.map((b) => (b.id === bor.bookId ? { ...b, copiesAvailable: b.copiesAvailable + 1 } : b))
    );

    addToast('success', 'Book Returned', `"${bor.bookTitle}" checked back into inventory.`);
  };

  // Communication Broadcast
  const sendBroadcastMessage = (msgData: Omit<CommunicationMessage, 'id' | 'timestamp' | 'deliveredCount'>) => {
    const newMsg: CommunicationMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      deliveredCount: 1240
    };

    setMessages((prev) => [newMsg, ...prev]);
    addToast('success', `${msgData.type} Sent`, `Broadcast delivered to ${msgData.receiverGroup} (${newMsg.deliveredCount} recipients).`);
  };

  // Accounts
  const addTransaction = (txData: Omit<AccountTransaction, 'id' | 'date'>) => {
    const newTx: AccountTransaction = {
      ...txData,
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions((prev) => [newTx, ...prev]);
    addToast('success', 'Transaction Recorded', `${txData.type}: $${txData.amount} logged under ${txData.category}.`);
  };

  // Timetable Update
  const updateTimetableSlot = (slot: TimetableSlot) => {
    setTimetable((prev) => prev.map((s) => (s.id === slot.id ? slot : s)));
    addToast('success', 'Timetable Updated', `Updated Period ${slot.period} on ${slot.day}`);
  };

  const addAuditLog = (action: string, module: string) => {
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        action,
        module,
        ipAddress: '192.168.1.102',
        timestamp: new Date().toLocaleString()
      },
      ...prev
    ]);
  };

  return (
    <SchoolContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeRole,
        switchRole,
        activeSchool,
        setActiveSchool,
        schools,
        students,
        teachers,
        classes,
        attendance,
        exams,
        homeworks,
        submissions,
        timetable,
        fees,
        books,
        borrowings,
        routes,
        hostelRooms,
        payroll,
        inventory,
        transactions,
        messages,
        auditLogs,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        addToast,
        removeToast,
        addStudent,
        markAttendance,
        addHomework,
        submitHomework,
        gradeHomework,
        recordExamMarks,
        payFeeVoucher,
        issueBook,
        returnBook,
        sendBroadcastMessage,
        addTransaction,
        updateTimetableSlot,
        firebaseOnline
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
