export type UserRole = 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  schoolId: string;
  phone?: string;
  status: 'active' | 'inactive';
}

export interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  logo: string;
  principal: string;
  phone: string;
  email: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  studentsCount: number;
  teachersCount: number;
  status: 'active' | 'suspended';
}

export interface Student {
  id: string;
  admissionNo: string;
  rollNo: string;
  grNumber: string;
  emisCode: string;
  name: string;
  classId: string;
  className: string;
  section: string;
  house: 'Red House' | 'Blue House' | 'Green House' | 'Yellow House';
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  photo: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  medicalInfo: string;
  emergencyContact: string;
  qrCode: string;
  attendancePercentage: number;
  gpa: number;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  busRouteId?: string;
  hostelRoomId?: string;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  subjects: string[];
  assignedClasses: string[];
  photo: string;
  qualification: string;
  joiningDate: string;
  salary: number;
  status: 'active' | 'on_leave';
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  occupation: string;
  address: string;
  studentIds: string[];
  relation: 'Father' | 'Mother' | 'Guardian';
  avatar: string;
}

export interface ClassSection {
  id: string;
  name: string; // e.g. "Grade 10"
  sections: string[]; // ["A", "B", "C"]
  classTeacher: string;
  roomNo: string;
  totalStudents: number;
  subjects: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  section: string;
  date: string; // YYYY-MM-DD
  status: 'Present' | 'Absent' | 'Leave' | 'Late';
  timeIn?: string;
  remarks?: string;
  method: 'Manual' | 'QR' | 'Biometric' | 'RFID';
}

export interface SubjectMark {
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  remarks: string;
}

export interface ExamResult {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  classId: string;
  examTerm: 'Term 1' | 'Midterm' | 'Final Exam';
  academicYear: string;
  subjectMarks: SubjectMark[];
  totalObtained: number;
  maxTotal: number;
  percentage: number;
  gpa: number;
  positionInClass: number;
  teacherRemarks: string;
  status: 'Published' | 'Draft';
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  attachments?: { name: string; url: string; type: string }[];
  totalSubmissions: number;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName: string;
  submissionDate: string;
  fileUrl?: string;
  comment?: string;
  status: 'Submitted' | 'Graded' | 'Late';
  grade?: string;
  feedback?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number; // 1 to 8
  startTime: string;
  endTime: string;
  subject: string;
  teacherName: string;
  teacherId: string;
  roomNo: string;
  className: string;
  section: string;
  isConflict?: boolean;
}

export interface FeeVoucher {
  id: string;
  voucherNo: string;
  studentId: string;
  studentName: string;
  className: string;
  section: string;
  monthYear: string;
  tuitionFee: number;
  transportFee: number;
  hostelFee: number;
  admissionFee: number;
  examFee: number;
  fine: number;
  discount: number;
  totalAmount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  paymentMethod?: 'Cash' | 'Credit Card' | 'Online Banking' | 'UPI';
  transactionRef?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  copiesTotal: number;
  copiesAvailable: number;
  rackLocation: string;
  status: 'Available' | 'Low Stock' | 'Out of Stock';
}

export interface BookBorrowing {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowerRole: 'Student' | 'Teacher';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fineAmount: number;
  status: 'Issued' | 'Returned' | 'Overdue';
}

export interface TransportRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  occupiedSeats: number;
  stops: { name: string; time: string; fee: number }[];
  currentLocation?: { lat: number; lng: number; speed: number; lastUpdated: string };
  status: 'On Route' | 'At Station' | 'Maintenance';
}

export interface HostelRoom {
  id: string;
  roomNumber: string;
  block: string;
  capacity: number;
  occupiedBeds: number;
  monthlyRent: number;
  wardenName: string;
  facilities: string[];
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  monthYear: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Processing' | 'Pending';
  paymentDate?: string;
}

export interface InventoryItem {
  id: string;
  itemName: string;
  category: 'Furniture' | 'Electronics' | 'Lab Equipment' | 'Sports' | 'Stationery';
  quantity: number;
  unit: string;
  location: string;
  unitPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Needs Repair';
  lastUpdated: string;
}

export interface AccountTransaction {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: 'Tuition Fees' | 'Salaries' | 'Utilities' | 'Maintenance' | 'Lab Supplies' | 'Events' | 'Other';
  description: string;
  amount: number;
  paymentMode: 'Bank Transfer' | 'Cash' | 'Cheque';
  referenceNo: string;
}

export interface CommunicationMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  receiverGroup: 'All' | 'Teachers' | 'Students' | 'Parents' | string;
  type: 'SMS' | 'WhatsApp' | 'Push Notification' | 'Circular';
  title: string;
  message: string;
  timestamp: string;
  deliveredCount: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  ipAddress: string;
  timestamp: string;
}

export interface AIInsight {
  type: 'performance' | 'attendance' | 'fee' | 'timetable' | 'chat';
  title: string;
  summary: string;
  confidence: number;
  recommendation: string;
}
