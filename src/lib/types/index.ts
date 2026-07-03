// ============================================================
// EduConnect Kanyakumari - Core Type Definitions
// ============================================================

// --- Enums & Constants ---

export type UserRole =
  | 'state_admin'
  | 'directorate'
  | 'ceo'
  | 'deo'
  | 'beo'
  | 'principal'
  | 'teacher'
  | 'parent'
  | 'student';

export type SchoolType =
  | 'Government Higher Secondary School'
  | 'Government High School'
  | 'Government Middle School'
  | 'Government Primary School'
  | 'Adi Dravidar Welfare School'
  | 'Municipal School'
  | 'Corporation School';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'leave' | 'holiday';

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type LeaveType = 'casual' | 'sick' | 'earned' | 'maternity' | 'special' | 'duty';

export type Gender = 'male' | 'female' | 'other';

export type Medium = 'Tamil' | 'English';

export type ComplianceStatus = 'compliant' | 'partial' | 'non_compliant' | 'pending';

export type NotificationType = 'sms' | 'whatsapp' | 'email' | 'in_app';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export type InspectionStatus = 'scheduled' | 'in_progress' | 'completed' | 'overdue';

// --- Core Entities ---

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  designation?: string;
  department?: string;
  districtId?: string;
  blockId?: string;
  schoolId?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface District {
  id: string;
  name: string;
  code: string;
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  blocks: Block[];
  ceoName: string;
  ceoPhone: string;
  avgAttendance: number;
  complianceRate: number;
}

export interface Block {
  id: string;
  name: string;
  districtId: string;
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  beoName: string;
  beoPhone: string;
  avgAttendance: number;
}

export interface School {
  id: string;
  name: string;
  udiseCode: string;
  type: SchoolType;
  districtId: string;
  blockId: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
  principalName: string;
  principalPhone: string;
  medium: Medium[];
  classesFrom: number;
  classesTo: number;
  totalStudents: number;
  totalTeachers: number;
  totalClassrooms: number;
  hasLibrary: boolean;
  hasLab: boolean;
  hasPlayground: boolean;
  hasComputer: boolean;
  hasInternet: boolean;
  hasMidDayMeal: boolean;
  hasToilets: boolean;
  hasDrinkingWater: boolean;
  hasRamp: boolean;
  establishedYear: number;
  lastInspection?: string;
  complianceStatus: ComplianceStatus;
  healthScore: number;
  latitude?: number;
  longitude?: number;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  gender: Gender;
  phone: string;
  email: string;
  schoolId: string;
  qualification: string;
  specialization: string;
  subjects: string[];
  classesAssigned: string[];
  designation: string;
  joiningDate: string;
  experience: number;
  isClassTeacher: boolean;
  classTeacherOf?: string;
  avatar?: string;
  isActive: boolean;
  status?: 'active' | 'on_leave' | 'inactive';
  address: string;
}

export interface Student {
  id: string;
  emisId: string;
  name: string;
  gender: Gender;
  dateOfBirth: string;
  className: string;
  section: string;
  rollNumber: number;
  schoolId: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  address: string;
  medium: Medium;
  community: string;
  bloodGroup?: string;
  aadharNumber?: string;
  isActive: boolean;
  status?: 'active' | 'inactive' | 'at_risk';
  admissionDate: string;
  avatar?: string;
  scholarships?: string[];
}

export interface Parent {
  id: string;
  name: string;
  phone: string;
  email?: string;
  occupation: string;
  address: string;
  studentIds: string[];
  isActive: boolean;
}

// --- Operational Entities ---

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  className: string;
  section: string;
  status: AttendanceStatus;
  markedBy: string;
  markedAt: string;
  remarks?: string;
}

export interface TeacherAttendanceRecord {
  id: string;
  date: string;
  teacherId: string;
  teacherName: string;
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
  remarks?: string;
}

export interface LeaveRequest {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantRole: 'teacher' | 'student';
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  reviewedBy?: string;
  reviewedOn?: string;
  reviewerRemarks?: string;
  documents?: string[];
  schoolId: string;
}

export interface AcademicPerformance {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  section: string;
  examName: string;
  examDate: string;
  subjects: SubjectMark[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
  teacherRemarks?: string;
  aiSummary?: string;
}

export interface SubjectMark {
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  status: 'pass' | 'fail';
}

export interface Circular {
  id: string;
  title: string;
  content: string;
  issuedBy: string;
  issuedByRole: UserRole;
  issuedDate: string;
  category: 'academic' | 'administrative' | 'event' | 'holiday' | 'exam' | 'general';
  priority: Priority;
  targetAudience: UserRole[];
  attachments?: string[];
  schoolId?: string;
  districtId?: string;
  isRead?: boolean;
  readBy?: string[];
}

export interface Inspection {
  id: string;
  schoolId: string;
  schoolName: string;
  inspectorName: string;
  inspectorDesignation: string;
  date: string;
  status: InspectionStatus;
  overallRating: number;
  categories: InspectionCategory[];
  remarks: string;
  recommendations: string[];
  nextInspectionDate?: string;
}

export interface InspectionCategory {
  name: string;
  score: number;
  maxScore: number;
  remarks: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  recipientId: string;
  recipientRole: UserRole;
  sentAt: string;
  isRead: boolean;
  actionUrl?: string;
  category: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'national' | 'state' | 'local' | 'school';
  description?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  eligibility: string;
  deadline: string;
  status: 'open' | 'closed' | 'applied' | 'awarded';
  studentIds?: string[];
}

// --- AI Insights ---

export interface AIInsight {
  id: string;
  type: 'dropout_risk' | 'attendance_prediction' | 'weak_subject' | 'intervention' | 'workload' | 'health_score';
  title: string;
  description: string;
  category: string;
  severity: Priority;
  affectedEntities: string[];
  recommendation: string;
  confidence: number;
  generatedAt: string;
  data?: Record<string, unknown>;
}

// --- Dashboard Types ---

export interface KPIData {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  unit?: string;
  color?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ActivityItem {
  id: string;
  action: string;
  actor: string;
  actorRole: UserRole;
  timestamp: string;
  details?: string;
  icon?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  color?: string;
  description?: string;
}

// --- Form Types ---

export interface LoginFormData {
  identifier: string;
  password: string;
  role: UserRole;
  rememberMe: boolean;
}

export interface LeaveFormData {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  documents?: File[];
}

export interface AttendanceFormData {
  date: string;
  className: string;
  section: string;
  records: {
    studentId: string;
    status: AttendanceStatus;
    remarks?: string;
  }[];
}

// --- Navigation ---

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  children?: NavItem[];
  roles: UserRole[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// --- Table Types ---

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  column: string;
  value: string;
  operator: 'eq' | 'contains' | 'gt' | 'lt' | 'between';
}

// --- Audit ---

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  timestamp: string;
  details: string;
  ipAddress?: string;
  module: string;
  status: 'success' | 'failure';
}

// --- Settings ---

export interface AppSettings {
  language: 'en' | 'ta';
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    inApp: boolean;
  };
  academicYear: string;
  dateFormat: string;
  timezone: string;
}
