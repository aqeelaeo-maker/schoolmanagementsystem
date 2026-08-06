import {
  School,
  User,
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

export const INITIAL_SCHOOLS: School[] = [
  {
    id: 'school-1',
    name: 'St. Jude International Academy',
    code: 'STJ-2026',
    address: '742 Evergreen Terrace, Metro West, NY 10001',
    logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=150&auto=format&fit=crop&q=80',
    principal: 'Dr. Sarah Jenkins',
    phone: '+1 (555) 234-5678',
    email: 'info@stjude.edu',
    plan: 'Enterprise',
    studentsCount: 1240,
    teachersCount: 84,
    status: 'active'
  },
  {
    id: 'school-2',
    name: 'Oakridge Science & Technology High',
    code: 'OST-2026',
    address: '1088 Innovation Way, Silicon Valley, CA 94025',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=150&auto=format&fit=crop&q=80',
    principal: 'Prof. Marcus Vance',
    phone: '+1 (555) 987-6543',
    email: 'admin@oakridge.edu',
    plan: 'Pro',
    studentsCount: 890,
    teachersCount: 62,
    status: 'active'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'usr-super',
    name: 'Dr. Arthur Vance',
    email: 'superadmin@edupulse.ai',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    schoolId: 'school-1',
    phone: '+1 (555) 000-1111',
    status: 'active'
  },
  {
    id: 'usr-admin',
    name: 'Dr. Sarah Jenkins',
    email: 'admin@stjude.edu',
    role: 'school_admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    schoolId: 'school-1',
    phone: '+1 (555) 234-5678',
    status: 'active'
  },
  {
    id: 'usr-teacher',
    name: 'David Miller',
    email: 'teacher.david@stjude.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    schoolId: 'school-1',
    phone: '+1 (555) 345-6789',
    status: 'active'
  },
  {
    id: 'usr-student',
    name: 'Alex Morgan',
    email: 'alex.morgan@stjude.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    schoolId: 'school-1',
    phone: '+1 (555) 456-7890',
    status: 'active'
  },
  {
    id: 'usr-parent',
    name: 'Robert Morgan',
    email: 'parent.morgan@gmail.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    schoolId: 'school-1',
    phone: '+1 (555) 567-8901',
    status: 'active'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-101',
    admissionNo: 'STJ-2026-101',
    rollNo: '1012',
    grNumber: 'GR-8841',
    emisCode: 'EMIS-99201',
    name: 'Alex Morgan',
    classId: 'cls-10',
    className: 'Grade 10',
    section: 'A',
    house: 'Blue House',
    gender: 'Male',
    dob: '2010-04-12',
    bloodGroup: 'O+',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    parentName: 'Robert Morgan',
    parentPhone: '+1 (555) 567-8901',
    parentEmail: 'parent.morgan@gmail.com',
    address: '42 Wallaby Way, Metro West',
    medicalInfo: 'Mild asthma (Inhaler kept at school clinic)',
    emergencyContact: '+1 (555) 999-0011',
    qrCode: 'QR-STJ-1012',
    attendancePercentage: 96.5,
    gpa: 3.92,
    feeStatus: 'Paid',
    busRouteId: 'route-01',
    hostelRoomId: 'room-201'
  },
  {
    id: 'std-102',
    admissionNo: 'STJ-2026-102',
    rollNo: '1013',
    grNumber: 'GR-8842',
    emisCode: 'EMIS-99202',
    name: 'Sophia Chen',
    classId: 'cls-10',
    className: 'Grade 10',
    section: 'A',
    house: 'Red House',
    gender: 'Female',
    dob: '2010-08-25',
    bloodGroup: 'A+',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    parentName: 'David Chen',
    parentPhone: '+1 (555) 678-9012',
    parentEmail: 'chen.family@gmail.com',
    address: '88 Lotus Grove, Suburb North',
    medicalInfo: 'Peanut allergy',
    emergencyContact: '+1 (555) 999-0022',
    qrCode: 'QR-STJ-1013',
    attendancePercentage: 98.2,
    gpa: 3.98,
    feeStatus: 'Paid',
    busRouteId: 'route-01'
  },
  {
    id: 'std-103',
    admissionNo: 'STJ-2026-103',
    rollNo: '1014',
    grNumber: 'GR-8843',
    emisCode: 'EMIS-99203',
    name: 'Ethan Rodriguez',
    classId: 'cls-10',
    className: 'Grade 10',
    section: 'B',
    house: 'Green House',
    gender: 'Male',
    dob: '2010-02-14',
    bloodGroup: 'B+',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80',
    parentName: 'Elena Rodriguez',
    parentPhone: '+1 (555) 789-0123',
    parentEmail: 'elena.rod@gmail.com',
    address: '12 Sunset Blvd, Downtown',
    medicalInfo: 'None',
    emergencyContact: '+1 (555) 999-0033',
    qrCode: 'QR-STJ-1014',
    attendancePercentage: 89.0,
    gpa: 3.45,
    feeStatus: 'Pending',
    busRouteId: 'route-02'
  },
  {
    id: 'std-104',
    admissionNo: 'STJ-2026-104',
    rollNo: '1015',
    grNumber: 'GR-8844',
    emisCode: 'EMIS-99204',
    name: 'Emily Watson',
    classId: 'cls-11',
    className: 'Grade 11',
    section: 'A',
    house: 'Yellow House',
    gender: 'Female',
    dob: '2009-11-03',
    bloodGroup: 'AB+',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    parentName: 'Thomas Watson',
    parentPhone: '+1 (555) 890-1234',
    parentEmail: 'twatson@corp.com',
    address: '500 Highland Avenue',
    medicalInfo: 'Lactose intolerant',
    emergencyContact: '+1 (555) 999-0044',
    qrCode: 'QR-STJ-1015',
    attendancePercentage: 94.0,
    gpa: 3.85,
    feeStatus: 'Paid'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-1',
    employeeId: 'EMP-T-001',
    name: 'David Miller',
    email: 'teacher.david@stjude.edu',
    phone: '+1 (555) 345-6789',
    designation: 'Senior Physics & Math Faculty',
    department: 'Science & Mathematics',
    subjects: ['Physics', 'Advanced Mathematics'],
    assignedClasses: ['Grade 10-A', 'Grade 11-A', 'Grade 12-B'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    qualification: 'M.Sc Physics (MIT), B.Ed',
    joiningDate: '2020-08-15',
    salary: 6800,
    status: 'active'
  },
  {
    id: 'tch-2',
    employeeId: 'EMP-T-002',
    name: 'Dr. Maria Santos',
    email: 'maria.santos@stjude.edu',
    phone: '+1 (555) 456-7891',
    designation: 'Head of Chemistry Department',
    department: 'Science',
    subjects: ['Organic Chemistry', 'General Science'],
    assignedClasses: ['Grade 10-B', 'Grade 11-A'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    qualification: 'Ph.D Chemistry (Stanford)',
    joiningDate: '2018-01-10',
    salary: 7500,
    status: 'active'
  },
  {
    id: 'tch-3',
    employeeId: 'EMP-T-003',
    name: 'James Anderson',
    email: 'j.anderson@stjude.edu',
    phone: '+1 (555) 567-8902',
    designation: 'English Literature Lecturer',
    department: 'Humanities',
    subjects: ['English Literature', 'Creative Writing'],
    assignedClasses: ['Grade 9-A', 'Grade 10-A'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    qualification: 'M.A. English (Oxford)',
    joiningDate: '2021-09-01',
    salary: 6200,
    status: 'active'
  }
];

export const INITIAL_CLASSES: ClassSection[] = [
  {
    id: 'cls-9',
    name: 'Grade 9',
    sections: ['A', 'B'],
    classTeacher: 'James Anderson',
    roomNo: 'Room 101',
    totalStudents: 58,
    subjects: ['English', 'Mathematics', 'General Science', 'History', 'Computer Science']
  },
  {
    id: 'cls-10',
    name: 'Grade 10',
    sections: ['A', 'B', 'C'],
    classTeacher: 'David Miller',
    roomNo: 'Room 202',
    totalStudents: 64,
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Biology', 'AI & Robotics']
  },
  {
    id: 'cls-11',
    name: 'Grade 11',
    sections: ['A', 'B'],
    classTeacher: 'Dr. Maria Santos',
    roomNo: 'Lab 301',
    totalStudents: 52,
    subjects: ['Advanced Physics', 'Organic Chemistry', 'Calculus', 'English Literature', 'Computer Science']
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    studentId: 'std-101',
    studentName: 'Alex Morgan',
    classId: 'cls-10',
    section: 'A',
    date: '2026-08-06',
    status: 'Present',
    timeIn: '08:12 AM',
    method: 'QR'
  },
  {
    id: 'att-02',
    studentId: 'std-102',
    studentName: 'Sophia Chen',
    classId: 'cls-10',
    section: 'A',
    date: '2026-08-06',
    status: 'Present',
    timeIn: '08:05 AM',
    method: 'Biometric'
  },
  {
    id: 'att-03',
    studentId: 'std-103',
    studentName: 'Ethan Rodriguez',
    classId: 'cls-10',
    section: 'B',
    date: '2026-08-06',
    status: 'Late',
    timeIn: '08:42 AM',
    remarks: 'Bus traffic delay',
    method: 'Manual'
  },
  {
    id: 'att-04',
    studentId: 'std-104',
    studentName: 'Emily Watson',
    classId: 'cls-11',
    section: 'A',
    date: '2026-08-06',
    status: 'Leave',
    remarks: 'Medical leave approved',
    method: 'Manual'
  }
];

export const INITIAL_EXAMS: ExamResult[] = [
  {
    id: 'res-101',
    studentId: 'std-101',
    studentName: 'Alex Morgan',
    rollNo: '1012',
    classId: 'cls-10',
    examTerm: 'Midterm',
    academicYear: '2025-2026',
    subjectMarks: [
      { subject: 'Physics', totalMarks: 100, obtainedMarks: 94, grade: 'A+', remarks: 'Outstanding problem solving' },
      { subject: 'Mathematics', totalMarks: 100, obtainedMarks: 98, grade: 'A+', remarks: 'Top score in algebra' },
      { subject: 'Chemistry', totalMarks: 100, obtainedMarks: 91, grade: 'A+', remarks: 'Great practical lab work' },
      { subject: 'English', totalMarks: 100, obtainedMarks: 88, grade: 'A', remarks: 'Good essay flow' },
      { subject: 'AI & Robotics', totalMarks: 100, obtainedMarks: 96, grade: 'A+', remarks: 'Innovative project' }
    ],
    totalObtained: 467,
    maxTotal: 500,
    percentage: 93.4,
    gpa: 3.92,
    positionInClass: 2,
    teacherRemarks: 'Alex displays exceptional dedication and analytical acumen. Recommended for the National Science Olympiad.',
    status: 'Published'
  },
  {
    id: 'res-102',
    studentId: 'std-102',
    studentName: 'Sophia Chen',
    rollNo: '1013',
    classId: 'cls-10',
    examTerm: 'Midterm',
    academicYear: '2025-2026',
    subjectMarks: [
      { subject: 'Physics', totalMarks: 100, obtainedMarks: 97, grade: 'A+', remarks: 'Flawless calculations' },
      { subject: 'Mathematics', totalMarks: 100, obtainedMarks: 100, grade: 'A+', remarks: 'Perfect score' },
      { subject: 'Chemistry', totalMarks: 100, obtainedMarks: 95, grade: 'A+', remarks: 'Excellent lab report' },
      { subject: 'English', totalMarks: 100, obtainedMarks: 92, grade: 'A+', remarks: 'Insightful literature critique' },
      { subject: 'AI & Robotics', totalMarks: 100, obtainedMarks: 98, grade: 'A+', remarks: 'Top code design' }
    ],
    totalObtained: 482,
    maxTotal: 500,
    percentage: 96.4,
    gpa: 3.98,
    positionInClass: 1,
    teacherRemarks: 'Sophia is an exemplary scholar who consistently sets benchmark standards across all STEM subjects.',
    status: 'Published'
  }
];

export const INITIAL_HOMEWORK: Homework[] = [
  {
    id: 'hw-1',
    title: 'Electromagnetic Induction & Faraday\'s Law',
    description: 'Solve problem set 4B on Page 142. Include vector flux diagrams for questions 3 and 7.',
    subject: 'Physics',
    className: 'Grade 10',
    section: 'A',
    teacherId: 'tch-1',
    teacherName: 'David Miller',
    assignedDate: '2026-08-04',
    dueDate: '2026-08-08',
    attachments: [{ name: 'Faraday_Law_Worksheet.pdf', url: '#', type: 'application/pdf' }],
    totalSubmissions: 28
  },
  {
    id: 'hw-2',
    title: 'Organic Reaction Mechanisms & Esterification',
    description: 'Draw mechanism steps for acid-catalyzed ester formation with full curved arrow notation.',
    subject: 'Chemistry',
    className: 'Grade 10',
    section: 'A',
    teacherId: 'tch-2',
    teacherName: 'Dr. Maria Santos',
    assignedDate: '2026-08-05',
    dueDate: '2026-08-09',
    totalSubmissions: 24
  }
];

export const INITIAL_HOMEWORK_SUBMISSIONS: HomeworkSubmission[] = [
  {
    id: 'sub-1',
    homeworkId: 'hw-1',
    studentId: 'std-101',
    studentName: 'Alex Morgan',
    submissionDate: '2026-08-05 06:30 PM',
    fileUrl: '#',
    comment: 'Completed all flux equations with diagrams attached.',
    status: 'Graded',
    grade: 'A+',
    feedback: 'Excellent clean diagram work, Alex!'
  },
  {
    id: 'sub-2',
    homeworkId: 'hw-1',
    studentId: 'std-102',
    studentName: 'Sophia Chen',
    submissionDate: '2026-08-05 04:15 PM',
    fileUrl: '#',
    status: 'Graded',
    grade: 'A+',
    feedback: 'Flawless mathematical step proof.'
  }
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  { id: 'tt-1', day: 'Monday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subject: 'Physics', teacherName: 'David Miller', teacherId: 'tch-1', roomNo: 'Room 202', className: 'Grade 10', section: 'A' },
  { id: 'tt-2', day: 'Monday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subject: 'Chemistry', teacherName: 'Dr. Maria Santos', teacherId: 'tch-2', roomNo: 'Lab 301', className: 'Grade 10', section: 'A' },
  { id: 'tt-3', day: 'Monday', period: 3, startTime: '10:15 AM', endTime: '11:00 AM', subject: 'Mathematics', teacherName: 'David Miller', teacherId: 'tch-1', roomNo: 'Room 202', className: 'Grade 10', section: 'A' },
  { id: 'tt-4', day: 'Tuesday', period: 1, startTime: '08:30 AM', endTime: '09:15 AM', subject: 'English', teacherName: 'James Anderson', teacherId: 'tch-3', roomNo: 'Room 202', className: 'Grade 10', section: 'A' },
  { id: 'tt-5', day: 'Wednesday', period: 2, startTime: '09:15 AM', endTime: '10:00 AM', subject: 'AI & Robotics', teacherName: 'David Miller', teacherId: 'tch-1', roomNo: 'Comp Lab 1', className: 'Grade 10', section: 'A' }
];

export const INITIAL_FEES: FeeVoucher[] = [
  {
    id: 'fee-1001',
    voucherNo: 'INV-2026-0801',
    studentId: 'std-101',
    studentName: 'Alex Morgan',
    className: 'Grade 10',
    section: 'A',
    monthYear: 'August 2026',
    tuitionFee: 450,
    transportFee: 80,
    hostelFee: 0,
    admissionFee: 0,
    examFee: 50,
    fine: 0,
    discount: 50,
    totalAmount: 530,
    dueDate: '2026-08-10',
    status: 'Paid',
    paidDate: '2026-08-02',
    paymentMethod: 'Credit Card',
    transactionRef: 'TXN-9981240'
  },
  {
    id: 'fee-1002',
    voucherNo: 'INV-2026-0802',
    studentId: 'std-103',
    studentName: 'Ethan Rodriguez',
    className: 'Grade 10',
    section: 'B',
    monthYear: 'August 2026',
    tuitionFee: 450,
    transportFee: 80,
    hostelFee: 0,
    admissionFee: 0,
    examFee: 50,
    fine: 20,
    discount: 0,
    totalAmount: 600,
    dueDate: '2026-08-05',
    status: 'Pending'
  }
];

export const INITIAL_BOOKS: Book[] = [
  { id: 'bk-1', title: 'Principles of Quantum Physics (12th Ed)', author: 'Halliday & Resnick', category: 'Science', isbn: '978-0470469088', copiesTotal: 25, copiesAvailable: 18, rackLocation: 'Rack B-4', status: 'Available' },
  { id: 'bk-2', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', category: 'Technology', isbn: '978-0134610993', copiesTotal: 15, copiesAvailable: 3, rackLocation: 'Rack C-1', status: 'Low Stock' },
  { id: 'bk-3', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Literature', isbn: '978-0060935467', copiesTotal: 30, copiesAvailable: 22, rackLocation: 'Rack A-2', status: 'Available' }
];

export const INITIAL_BORROWINGS: BookBorrowing[] = [
  { id: 'bor-1', bookId: 'bk-2', bookTitle: 'Artificial Intelligence: A Modern Approach', borrowerId: 'std-101', borrowerName: 'Alex Morgan', borrowerRole: 'Student', issueDate: '2026-08-01', dueDate: '2026-08-15', fineAmount: 0, status: 'Issued' }
];

export const INITIAL_ROUTES: TransportRoute[] = [
  {
    id: 'route-01',
    routeNumber: 'Route 04',
    routeName: 'Metro West Express -> School Campus',
    vehicleNo: 'BUS-2026-04',
    driverName: 'Robert Taylor',
    driverPhone: '+1 (555) 321-9876',
    capacity: 40,
    occupiedSeats: 32,
    stops: [
      { name: 'Evergreen Square', time: '07:20 AM', fee: 80 },
      { name: 'Highland Avenue Station', time: '07:35 AM', fee: 80 },
      { name: 'School Main Gate', time: '08:00 AM', fee: 80 }
    ],
    currentLocation: { lat: 40.7128, lng: -74.006, speed: 35, lastUpdated: 'Just now' },
    status: 'On Route'
  }
];

export const INITIAL_HOSTEL_ROOMS: HostelRoom[] = [
  { id: 'room-201', roomNumber: 'Block A - 201', block: 'East Wing', capacity: 2, occupiedBeds: 1, monthlyRent: 350, wardenName: 'Mr. Patrick Evans', facilities: ['AC', 'Study Desk', 'Attached Bath', 'Wi-Fi 6'] }
];

export const INITIAL_PAYROLL: PayrollRecord[] = [
  { id: 'pay-01', employeeId: 'EMP-T-001', employeeName: 'David Miller', role: 'Teacher', monthYear: 'July 2026', basicSalary: 6000, allowances: 1000, deductions: 200, netSalary: 6800, status: 'Paid', paymentDate: '2026-07-31' },
  { id: 'pay-02', employeeId: 'EMP-T-002', employeeName: 'Dr. Maria Santos', role: 'Teacher', monthYear: 'July 2026', basicSalary: 6500, allowances: 1200, deductions: 200, netSalary: 7500, status: 'Paid', paymentDate: '2026-07-31' }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', itemName: 'Interactive 75" Smart Display Board', category: 'Electronics', quantity: 24, unit: 'Units', location: 'Classrooms Block A & B', unitPrice: 2200, status: 'In Stock', lastUpdated: '2026-08-01' },
  { id: 'inv-2', itemName: 'Digital Compound Microscopes 1000x', category: 'Lab Equipment', quantity: 40, unit: 'Units', location: 'Biology Lab 302', unitPrice: 450, status: 'In Stock', lastUpdated: '2026-07-28' }
];

export const INITIAL_TRANSACTIONS: AccountTransaction[] = [
  { id: 'tx-101', date: '2026-08-02', type: 'Income', category: 'Tuition Fees', description: 'August Tuition Fee Collection (120 Students)', amount: 63600, paymentMode: 'Bank Transfer', referenceNo: 'BATCH-AUG-01' },
  { id: 'tx-102', date: '2026-08-03', type: 'Expense', category: 'Lab Supplies', description: 'Chemical Reagents & Microscope Slides', amount: 3400, paymentMode: 'Cheque', referenceNo: 'CHQ-88201' }
];

export const INITIAL_MESSAGES: CommunicationMessage[] = [
  { id: 'msg-1', senderId: 'usr-admin', senderName: 'Dr. Sarah Jenkins', senderRole: 'School Admin', receiverGroup: 'Parents', type: 'Circular', title: 'Parent-Teacher Olympiad Conference', message: 'Dear Parents, the Q1 Parent-Teacher Olympiad conference is scheduled for August 15. Please reserve your slot.', timestamp: '2026-08-05 10:00 AM', deliveredCount: 1240 }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'log-1', userId: 'usr-admin', userName: 'Dr. Sarah Jenkins', action: 'Published Midterm Exam Results', module: 'Exams', ipAddress: '192.168.1.45', timestamp: '2026-08-05 14:22:10' },
  { id: 'log-2', userId: 'usr-teacher', userName: 'David Miller', action: 'Uploaded Homework: Electromagnetic Induction', module: 'Homework', ipAddress: '192.168.1.88', timestamp: '2026-08-04 11:15:02' }
];
