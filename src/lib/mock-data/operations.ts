// ============================================================
// EduConnect Kanyakumari - Operational Mock Data
// ============================================================
import { 
  LeaveRequest, Circular, Inspection, Notification, 
  Holiday, AIInsight, AcademicPerformance, ActivityItem, AuditLog
} from '@/lib/types';

// --- Attendance Summary Data (for charts & KPIs) ---
export const monthlyAttendanceData = [
  { name: 'Jun', students: 92.1, teachers: 96.5 },
  { name: 'Jul', students: 89.4, teachers: 95.8 },
  { name: 'Aug', students: 91.3, teachers: 97.2 },
  { name: 'Sep', students: 90.8, teachers: 96.1 },
  { name: 'Oct', students: 88.5, teachers: 94.9 },
  { name: 'Nov', students: 93.2, teachers: 97.8 },
  { name: 'Dec', students: 87.6, teachers: 95.2 },
  { name: 'Jan', students: 91.7, teachers: 96.9 },
  { name: 'Feb', students: 92.5, teachers: 97.1 },
  { name: 'Mar', students: 90.1, teachers: 96.4 },
];

export const weeklyAttendanceData = [
  { name: 'Mon', present: 1142, absent: 108, total: 1250 },
  { name: 'Tue', present: 1165, absent: 85, total: 1250 },
  { name: 'Wed', present: 1130, absent: 120, total: 1250 },
  { name: 'Thu', present: 1158, absent: 92, total: 1250 },
  { name: 'Fri', present: 1098, absent: 152, total: 1250 },
];

export const classWiseAttendance = [
  { className: '6-A', total: 42, present: 39, absent: 3, percentage: 92.9 },
  { className: '7-A', total: 45, present: 41, absent: 4, percentage: 91.1 },
  { className: '8-A', total: 44, present: 42, absent: 2, percentage: 95.5 },
  { className: '9-A', total: 48, present: 44, absent: 4, percentage: 91.7 },
  { className: '9-B', total: 46, present: 43, absent: 3, percentage: 93.5 },
  { className: '10-A', total: 45, present: 40, absent: 5, percentage: 88.9 },
  { className: '10-B', total: 43, present: 39, absent: 4, percentage: 90.7 },
  { className: '11-A', total: 40, present: 37, absent: 3, percentage: 92.5 },
  { className: '11-B', total: 38, present: 35, absent: 3, percentage: 92.1 },
  { className: '12-A', total: 42, present: 40, absent: 2, percentage: 95.2 },
  { className: '12-B', total: 40, present: 38, absent: 2, percentage: 95.0 },
];

export const teacherAttendanceToday = [
  { id: 'TCH002', name: 'Mrs. K. Ranjitha', status: 'present' as const, checkIn: '08:15 AM' },
  { id: 'TCH003', name: 'Mr. D. Arul Selvan', status: 'present' as const, checkIn: '08:10 AM' },
  { id: 'TCH004', name: 'Mrs. P. Mercy', status: 'present' as const, checkIn: '08:20 AM' },
  { id: 'TCH005', name: 'Mr. J. Christober', status: 'present' as const, checkIn: '08:05 AM' },
  { id: 'TCH006', name: 'Mrs. M. Tamilselvi', status: 'leave' as const, checkIn: '-' },
  { id: 'TCH007', name: 'Mr. R. Kalidoss', status: 'present' as const, checkIn: '08:25 AM' },
  { id: 'TCH008', name: 'Mrs. S. Angelin', status: 'present' as const, checkIn: '08:00 AM' },
  { id: 'TCH009', name: 'Mr. A. Jayakumar', status: 'present' as const, checkIn: '07:55 AM' },
  { id: 'TCH010', name: 'Mrs. V. Girija', status: 'present' as const, checkIn: '08:30 AM' },
  { id: 'TCH011', name: 'Mr. L. Bennet', status: 'late' as const, checkIn: '09:05 AM' },
  { id: 'TCH012', name: 'Mrs. N. Kavitha', status: 'present' as const, checkIn: '08:12 AM' },
];

// --- Leave Requests ---
export const leaveRequests: LeaveRequest[] = [
  { id: 'LV001', applicantId: 'TCH006', applicantName: 'Mrs. M. Tamilselvi', applicantRole: 'teacher', type: 'sick', startDate: '2026-07-03', endDate: '2026-07-04', days: 2, reason: 'Fever and cold. Under medication.', status: 'approved', appliedOn: '2026-07-02T08:30:00', reviewedBy: 'Mr. S. Rajendran', reviewedOn: '2026-07-02T10:15:00', reviewerRemarks: 'Approved. Get well soon.', schoolId: 'SCH001' },
  { id: 'LV002', applicantId: 'STU004', applicantName: 'Meena Kumari P', applicantRole: 'student', type: 'casual', startDate: '2026-07-05', endDate: '2026-07-05', days: 1, reason: 'Family function - Sister wedding', status: 'pending', appliedOn: '2026-07-03T07:45:00', schoolId: 'SCH001' },
  { id: 'LV003', applicantId: 'TCH011', applicantName: 'Mr. L. Bennet', applicantRole: 'teacher', type: 'casual', startDate: '2026-07-07', endDate: '2026-07-08', days: 2, reason: 'Personal work - Property registration', status: 'pending', appliedOn: '2026-07-03T09:00:00', schoolId: 'SCH001' },
  { id: 'LV004', applicantId: 'STU001', applicantName: 'Arun Kumar S', applicantRole: 'student', type: 'sick', startDate: '2026-07-01', endDate: '2026-07-02', days: 2, reason: 'Dengue fever, admitted to hospital', status: 'approved', appliedOn: '2026-07-01T06:00:00', reviewedBy: 'Mrs. K. Ranjitha', reviewedOn: '2026-07-01T08:00:00', reviewerRemarks: 'Approved. Take care.', documents: ['medical_certificate.pdf'], schoolId: 'SCH001' },
  { id: 'LV005', applicantId: 'TCH004', applicantName: 'Mrs. P. Mercy', applicantRole: 'teacher', type: 'earned', startDate: '2026-07-14', endDate: '2026-07-18', days: 5, reason: 'Family vacation - Annual leave', status: 'pending', appliedOn: '2026-07-02T14:30:00', schoolId: 'SCH001' },
  { id: 'LV006', applicantId: 'STU007', applicantName: 'Surya Prakash A', applicantRole: 'student', type: 'casual', startDate: '2026-06-30', endDate: '2026-06-30', days: 1, reason: 'Sports competition at district level', status: 'approved', appliedOn: '2026-06-28T10:00:00', reviewedBy: 'Mr. A. Jayakumar', reviewedOn: '2026-06-28T12:00:00', reviewerRemarks: 'Approved. All the best for competition.', schoolId: 'SCH001' },
];

// --- Government Circulars ---
export const circulars: Circular[] = [
  { id: 'CIR001', title: 'Quarterly Assessment Schedule - July 2026', content: 'As per the Directorate of School Education, Tamil Nadu, quarterly assessments for Classes 6-12 will be conducted from July 21-25, 2026. All schools are requested to prepare and submit the question papers to the DEO by July 10, 2026.', issuedBy: 'Directorate of School Education', issuedByRole: 'directorate', issuedDate: '2026-07-01', category: 'exam', priority: 'high', targetAudience: ['principal', 'teacher'] },
  { id: 'CIR002', title: 'Mid-Day Meal Menu Revision - Academic Year 2026-27', content: 'The revised mid-day meal menu including additional nutritional items such as eggs (4 days), millets (2 days) is effective from July 2026. Schools should update their menu boards and ensure compliance.', issuedBy: 'School Education Department, TN', issuedByRole: 'state_admin', issuedDate: '2026-06-28', category: 'administrative', priority: 'medium', targetAudience: ['principal', 'teacher'] },
  { id: 'CIR003', title: 'Independence Day Celebration Guidelines 2026', content: 'All government schools must organize cultural events, patriotic speeches, and flag hoisting ceremony on August 15, 2026. Detailed program schedule and participation guidelines enclosed.', issuedBy: 'CEO, Kanyakumari', issuedByRole: 'ceo', issuedDate: '2026-07-02', category: 'event', priority: 'medium', targetAudience: ['principal', 'teacher', 'student', 'parent'] },
  { id: 'CIR004', title: 'EMIS Data Update - Deadline July 15, 2026', content: 'All Headmasters are directed to update student enrollment data, teacher profiles, and infrastructure details in EMIS portal by July 15, 2026. Non-compliance will be reported to the District Collector.', issuedBy: 'DEO, Kanyakumari', issuedByRole: 'deo', issuedDate: '2026-07-03', category: 'administrative', priority: 'critical', targetAudience: ['principal'] },
  { id: 'CIR005', title: 'Free Laptop Distribution - Eligibility List', content: 'Students of Class 11 and 12 who have scored above 80% in previous examinations are eligible for free laptop distribution under the Government of Tamil Nadu scheme. List to be submitted by July 20, 2026.', issuedBy: 'School Education Department, TN', issuedByRole: 'state_admin', issuedDate: '2026-06-25', category: 'academic', priority: 'high', targetAudience: ['principal', 'teacher', 'student', 'parent'] },
  { id: 'CIR006', title: 'School Safety Audit - July 2026', content: 'All Block Educational Officers are directed to conduct safety audits of schools in their jurisdiction. Focus areas: building safety, fire safety, electrical safety, and disaster preparedness.', issuedBy: 'CEO, Kanyakumari', issuedByRole: 'ceo', issuedDate: '2026-07-01', category: 'administrative', priority: 'high', targetAudience: ['beo', 'principal'] },
];

// --- Inspections ---
export const inspections: Inspection[] = [
  { id: 'INS001', schoolId: 'SCH001', schoolName: 'GHSS Nagercoil', inspectorName: 'Mr. R. Murugan (BEO)', inspectorDesignation: 'Block Educational Officer', date: '2025-11-15', status: 'completed', overallRating: 4.2, categories: [
    { name: 'Infrastructure', score: 42, maxScore: 50, remarks: 'Good infrastructure. Needs painting.' },
    { name: 'Academic Standards', score: 38, maxScore: 50, remarks: 'Above average academic performance.' },
    { name: 'Teacher Attendance', score: 18, maxScore: 20, remarks: 'Regular teacher attendance observed.' },
    { name: 'Student Welfare', score: 16, maxScore: 20, remarks: 'Mid-day meal quality is good.' },
    { name: 'Administration', score: 9, maxScore: 10, remarks: 'Well-maintained records.' },
  ], remarks: 'Overall good performance. Minor improvements needed in infrastructure.', recommendations: ['Repaint classrooms', 'Add more computers to lab', 'Install CCTV cameras'], nextInspectionDate: '2026-08-15' },
  { id: 'INS002', schoolId: 'SCH004', schoolName: 'GHS Colachel', inspectorName: 'Mrs. K. Priya (BEO)', inspectorDesignation: 'Block Educational Officer', date: '2025-08-10', status: 'completed', overallRating: 3.5, categories: [
    { name: 'Infrastructure', score: 32, maxScore: 50, remarks: 'Needs major renovation. Leaking roof reported.' },
    { name: 'Academic Standards', score: 35, maxScore: 50, remarks: 'Average academic performance. Needs improvement.' },
    { name: 'Teacher Attendance', score: 15, maxScore: 20, remarks: 'Some irregular attendance noted.' },
    { name: 'Student Welfare', score: 14, maxScore: 20, remarks: 'Toilet facilities need improvement.' },
    { name: 'Administration', score: 7, maxScore: 10, remarks: 'Some records not up to date.' },
  ], remarks: 'Needs significant improvement in infrastructure and academics.', recommendations: ['Repair roof leakage', 'Improve toilet facilities', 'Conduct remedial classes', 'Update EMIS records'] },
  { id: 'INS003', schoolId: 'SCH006', schoolName: 'ADW HSS Arumanai', inspectorName: 'Mr. J. Selvam (BEO)', inspectorDesignation: 'Block Educational Officer', date: '2026-07-25', status: 'scheduled', overallRating: 0, categories: [], remarks: '', recommendations: [] },
];

// --- Notifications ---
export const notifications: Notification[] = [
  { id: 'NOT001', type: 'in_app', title: 'Leave Request Pending', message: 'Mrs. P. Mercy has applied for 5 days earned leave (Jul 14-18). Please review.', recipientId: 'TCH001', recipientRole: 'principal', sentAt: '2026-07-02T14:30:00', isRead: false, actionUrl: '/dashboard/leave', category: 'leave' },
  { id: 'NOT002', type: 'in_app', title: 'EMIS Update Deadline', message: 'EMIS data update deadline is July 15, 2026. Please ensure all records are updated.', recipientId: 'TCH001', recipientRole: 'principal', sentAt: '2026-07-03T08:00:00', isRead: false, actionUrl: '/dashboard/school-profile', category: 'compliance' },
  { id: 'NOT003', type: 'sms', title: 'Attendance Alert', message: 'Your child Arun Kumar S was marked absent on July 1-2 due to sick leave.', recipientId: 'PAR001', recipientRole: 'parent', sentAt: '2026-07-01T10:30:00', isRead: true, category: 'attendance' },
  { id: 'NOT004', type: 'in_app', title: 'New Circular Published', message: 'Quarterly Assessment Schedule for July 2026 has been published. Please review.', recipientId: 'TCH002', recipientRole: 'teacher', sentAt: '2026-07-01T11:00:00', isRead: false, actionUrl: '/dashboard/circulars', category: 'circular' },
  { id: 'NOT005', type: 'whatsapp', title: 'Leave Approved', message: 'Your leave request for July 3-4 has been approved by the Principal.', recipientId: 'TCH006', recipientRole: 'teacher', sentAt: '2026-07-02T10:20:00', isRead: true, category: 'leave' },
  { id: 'NOT006', type: 'in_app', title: 'Low Attendance Alert', message: 'Class 10-A attendance is below 90% this week. 5 students absent today.', recipientId: 'TCH001', recipientRole: 'principal', sentAt: '2026-07-03T09:30:00', isRead: false, actionUrl: '/dashboard/attendance', category: 'attendance' },
  { id: 'NOT007', type: 'in_app', title: 'Inspection Scheduled', message: 'School inspection for ADW HSS Arumanai is scheduled for July 25, 2026.', recipientId: 'BEO004', recipientRole: 'beo', sentAt: '2026-07-03T08:00:00', isRead: false, category: 'inspection' },
  { id: 'NOT008', type: 'in_app', title: 'Student Leave Request', message: 'Meena Kumari P (Class 10-A) has applied for 1 day casual leave on July 5.', recipientId: 'TCH002', recipientRole: 'teacher', sentAt: '2026-07-03T07:50:00', isRead: false, actionUrl: '/dashboard/leave', category: 'leave' },
];

// --- Holidays ---
export const holidays: Holiday[] = [
  { id: 'HOL001', name: 'Republic Day', date: '2026-01-26', type: 'national', description: 'National holiday' },
  { id: 'HOL002', name: 'Pongal', date: '2026-01-15', type: 'state', description: 'Tamil Nadu harvest festival' },
  { id: 'HOL003', name: 'Thai Pongal', date: '2026-01-16', type: 'state' },
  { id: 'HOL004', name: 'Mattu Pongal', date: '2026-01-17', type: 'state' },
  { id: 'HOL005', name: 'Independence Day', date: '2026-08-15', type: 'national', description: 'National holiday' },
  { id: 'HOL006', name: 'Gandhi Jayanthi', date: '2026-10-02', type: 'national' },
  { id: 'HOL007', name: 'Diwali', date: '2026-10-20', type: 'state', description: 'Festival of lights' },
  { id: 'HOL008', name: 'Christmas', date: '2026-12-25', type: 'national' },
  { id: 'HOL009', name: 'Thiruvalluvar Day', date: '2026-01-18', type: 'state' },
  { id: 'HOL010', name: 'Tamil New Year', date: '2026-04-14', type: 'state', description: 'Tamil Puthandu' },
  { id: 'HOL011', name: 'May Day', date: '2026-05-01', type: 'national' },
  { id: 'HOL012', name: 'Bakrid', date: '2026-06-17', type: 'national' },
  { id: 'HOL013', name: 'Summer Vacation', date: '2026-05-01', type: 'school', description: 'May 1 - June 5' },
  { id: 'HOL014', name: 'Quarterly Exam Break', date: '2026-07-26', type: 'school', description: 'Jul 26-27' },
];

// --- AI Insights ---
export const aiInsights: AIInsight[] = [
  { id: 'AI001', type: 'dropout_risk', title: 'Dropout Risk Alert', description: '3 students in Class 9 are showing patterns consistent with dropout risk: irregular attendance (below 70%), declining grades, and reduced parent engagement.', severity: 'critical', affectedEntities: ['STU009', 'STU011', 'STU012'], recommendation: 'Schedule parent-teacher meetings within this week. Assign mentor teachers. Consider providing additional academic support through remedial classes.', confidence: 87, generatedAt: '2026-07-03T06:00:00' },
  { id: 'AI002', type: 'attendance_prediction', title: 'Attendance Dip Predicted for Next Week', description: 'Based on historical patterns and local festival calendar, student attendance is predicted to drop to 82% during July 7-11 (Aadi month beginning). Schools near coastal areas may see higher absenteeism.', severity: 'high', affectedEntities: ['SCH001', 'SCH004', 'SCH010'], recommendation: 'Send advance SMS reminders to parents. Plan engaging classroom activities for the week. Consider rescheduling assessments.', confidence: 78, generatedAt: '2026-07-03T06:00:00' },
  { id: 'AI003', type: 'weak_subject', title: 'Mathematics Performance Declining in Class 10', description: 'Class 10-A average mathematics score dropped from 68% to 52% over the last 2 assessments. 12 out of 45 students scored below 35%. Topic areas: Trigonometry and Algebra showing maximum weakness.', severity: 'high', affectedEntities: ['STU001', 'STU002', 'STU003', 'STU004', 'STU005', 'STU006'], recommendation: 'Arrange special coaching classes for weak students. Use visual teaching aids for Trigonometry. Assign peer tutors from high-performing students.', confidence: 92, generatedAt: '2026-07-03T06:00:00' },
  { id: 'AI004', type: 'workload', title: 'Teacher Workload Imbalance', description: 'Mrs. K. Ranjitha (Mathematics) is handling 28 periods/week while the average is 22 periods/week. This may lead to burnout and reduced teaching quality.', severity: 'medium', affectedEntities: ['TCH002'], recommendation: 'Consider redistribution of periods. The vacant Mathematics teacher position should be filled urgently. Temporary arrangement with a substitute teacher is recommended.', confidence: 95, generatedAt: '2026-07-03T06:00:00' },
  { id: 'AI005', type: 'health_score', title: 'School Health Score Summary', description: 'GHSS Nagercoil overall health score is 92/100. Strong areas: Academic performance (88%), Teacher engagement (94%), Infrastructure (90%). Improvement areas: Digital resources (72%), Parent engagement (68%).', severity: 'low', affectedEntities: ['SCH001'], recommendation: 'Focus on improving digital infrastructure. Organize monthly parent-teacher interaction sessions. Consider implementing a parent mobile app for communication.', confidence: 90, generatedAt: '2026-07-03T06:00:00' },
  { id: 'AI006', type: 'intervention', title: 'Students Needing Academic Intervention', description: '8 students across classes 8-10 have scored below 40% in 3 or more subjects consecutively. Immediate academic intervention is needed.', severity: 'high', affectedEntities: ['STU003', 'STU007', 'STU013', 'STU015'], recommendation: 'Create individualized learning plans. Assign buddy system with high performers. Schedule extra classes during study hours. Involve parents in homework monitoring.', confidence: 85, generatedAt: '2026-07-03T06:00:00' },
];

// --- Academic Performance ---
export const academicPerformances: AcademicPerformance[] = [
  { id: 'AP001', studentId: 'STU001', studentName: 'Arun Kumar S', className: '10', section: 'A', examName: 'First Quarterly Exam', examDate: '2026-04-15', subjects: [
    { subject: 'Tamil', maxMarks: 100, obtainedMarks: 78, grade: 'B', status: 'pass' },
    { subject: 'English', maxMarks: 100, obtainedMarks: 65, grade: 'C', status: 'pass' },
    { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 45, grade: 'D', status: 'pass' },
    { subject: 'Science', maxMarks: 100, obtainedMarks: 72, grade: 'B', status: 'pass' },
    { subject: 'Social Science', maxMarks: 100, obtainedMarks: 81, grade: 'A', status: 'pass' },
  ], totalMarks: 500, obtainedMarks: 341, percentage: 68.2, grade: 'B', rank: 12, teacherRemarks: 'Needs improvement in Mathematics. Good in Social Science.', aiSummary: 'Arun shows strength in language and social sciences but struggles with mathematical concepts, particularly in algebra. Recommend additional practice with problem-solving exercises.' },
  { id: 'AP002', studentId: 'STU002', studentName: 'Divya Lakshmi M', className: '10', section: 'A', examName: 'First Quarterly Exam', examDate: '2026-04-15', subjects: [
    { subject: 'Tamil', maxMarks: 100, obtainedMarks: 92, grade: 'A+', status: 'pass' },
    { subject: 'English', maxMarks: 100, obtainedMarks: 88, grade: 'A', status: 'pass' },
    { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 85, grade: 'A', status: 'pass' },
    { subject: 'Science', maxMarks: 100, obtainedMarks: 90, grade: 'A+', status: 'pass' },
    { subject: 'Social Science', maxMarks: 100, obtainedMarks: 87, grade: 'A', status: 'pass' },
  ], totalMarks: 500, obtainedMarks: 442, percentage: 88.4, grade: 'A', rank: 2, teacherRemarks: 'Excellent performance across all subjects. Class topper potential.', aiSummary: 'Divya maintains consistent high performance across all subjects. Strong analytical skills in Science. Could benefit from participation in Olympiad programs.' },
];

// --- Activity Feed ---
export const recentActivities: ActivityItem[] = [
  { id: 'ACT001', action: 'Attendance marked for Class 10-A', actor: 'Mrs. K. Ranjitha', actorRole: 'teacher', timestamp: '2026-07-03T08:45:00', details: '40 present, 5 absent', type: 'success' },
  { id: 'ACT002', action: 'Leave request submitted', actor: 'Mrs. P. Mercy', actorRole: 'teacher', timestamp: '2026-07-02T14:30:00', details: 'Earned leave: Jul 14-18', type: 'info' },
  { id: 'ACT003', action: 'New circular published', actor: 'DEO Kanyakumari', actorRole: 'deo', timestamp: '2026-07-03T08:00:00', details: 'EMIS Data Update Deadline', type: 'warning' },
  { id: 'ACT004', action: 'Student leave approved', actor: 'Mrs. K. Ranjitha', actorRole: 'teacher', timestamp: '2026-07-01T08:00:00', details: 'Arun Kumar S - Sick leave', type: 'success' },
  { id: 'ACT005', action: 'Teacher leave approved', actor: 'Mr. S. Rajendran', actorRole: 'principal', timestamp: '2026-07-02T10:15:00', details: 'Mrs. M. Tamilselvi - Sick leave', type: 'success' },
  { id: 'ACT006', action: 'AI Alert generated', actor: 'EduConnect AI', actorRole: 'state_admin', timestamp: '2026-07-03T06:00:00', details: '3 students at dropout risk', type: 'error' },
  { id: 'ACT007', action: 'Attendance marked for Class 9-A', actor: 'Mrs. P. Mercy', actorRole: 'teacher', timestamp: '2026-07-03T08:50:00', details: '44 present, 4 absent', type: 'success' },
  { id: 'ACT008', action: 'Quarterly exam schedule published', actor: 'Directorate of School Education', actorRole: 'directorate', timestamp: '2026-07-01T11:00:00', details: 'July 21-25, 2026', type: 'info' },
  { id: 'ACT009', action: 'Marks entry completed', actor: 'Mr. D. Arul Selvan', actorRole: 'teacher', timestamp: '2026-07-02T16:00:00', details: 'Class 11-A Physics', type: 'success' },
  { id: 'ACT010', action: 'School inspection completed', actor: 'Mr. R. Murugan (BEO)', actorRole: 'beo', timestamp: '2025-11-15T15:00:00', details: 'GHSS Nagercoil - Rating: 4.2/5', type: 'info' },
];

// --- Audit Logs ---
export const auditLogs: AuditLog[] = [
  { id: 'AUD001', action: 'User Login', userId: 'TCH001', userName: 'Mr. S. Rajendran', userRole: 'principal', timestamp: '2026-07-03T07:55:00', details: 'Logged in from Chrome/Windows', module: 'Authentication', status: 'success' },
  { id: 'AUD002', action: 'Attendance Marked', userId: 'TCH002', userName: 'Mrs. K. Ranjitha', userRole: 'teacher', timestamp: '2026-07-03T08:45:00', details: 'Class 10-A: 40 present, 5 absent', module: 'Attendance', status: 'success' },
  { id: 'AUD003', action: 'Leave Approved', userId: 'TCH001', userName: 'Mr. S. Rajendran', userRole: 'principal', timestamp: '2026-07-02T10:15:00', details: 'Approved sick leave for Mrs. M. Tamilselvi', module: 'Leave Management', status: 'success' },
  { id: 'AUD004', action: 'Circular Published', userId: 'DEO001', userName: 'DEO Kanyakumari', userRole: 'deo', timestamp: '2026-07-03T08:00:00', details: 'EMIS Data Update Deadline circular published', module: 'Circulars', status: 'success' },
  { id: 'AUD005', action: 'Marks Entry', userId: 'TCH003', userName: 'Mr. D. Arul Selvan', userRole: 'teacher', timestamp: '2026-07-02T16:00:00', details: 'Class 11-A Physics quarterly marks entered', module: 'Performance', status: 'success' },
];

// --- District-wise data for State Dashboard ---
export const districtPerformanceData = [
  { name: 'Kanyakumari', attendance: 90.1, compliance: 87.5, schools: 258 },
  { name: 'Chennai', attendance: 88.5, compliance: 91.2, schools: 520 },
  { name: 'Coimbatore', attendance: 91.2, compliance: 89.8, schools: 480 },
  { name: 'Madurai', attendance: 87.9, compliance: 85.6, schools: 410 },
  { name: 'Salem', attendance: 89.3, compliance: 86.4, schools: 390 },
  { name: 'Trichy', attendance: 90.7, compliance: 88.9, schools: 370 },
  { name: 'Tirunelveli', attendance: 88.1, compliance: 84.7, schools: 350 },
  { name: 'Thanjavur', attendance: 91.5, compliance: 90.1, schools: 340 },
  { name: 'Tiruppur', attendance: 86.9, compliance: 83.5, schools: 310 },
  { name: 'Erode', attendance: 89.8, compliance: 87.2, schools: 320 },
];

// -- Subject-wise performance for charts --
export const subjectPerformanceData = [
  { subject: 'Tamil', classAvg: 74, schoolAvg: 72, districtAvg: 70 },
  { subject: 'English', classAvg: 65, schoolAvg: 63, districtAvg: 61 },
  { subject: 'Mathematics', classAvg: 52, schoolAvg: 58, districtAvg: 55 },
  { subject: 'Science', classAvg: 68, schoolAvg: 65, districtAvg: 62 },
  { subject: 'Social Science', classAvg: 71, schoolAvg: 69, districtAvg: 67 },
];
