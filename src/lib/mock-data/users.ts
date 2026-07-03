// ============================================================
// EduConnect Kanyakumari - User Profiles for Auth
// ============================================================
import { User } from '@/lib/types';

export const mockUsers: User[] = [
  { id: 'USR001', name: 'Dr. K. Ramachandran', email: 'ramachandran.k@tn.gov.in', phone: '9876540001', role: 'state_admin', designation: 'Director of School Education', department: 'School Education Department, TN', isActive: true, lastLogin: '2026-07-03T08:00:00', createdAt: '2024-01-01' },
  { id: 'USR002', name: 'Dr. M. Sundararajan', email: 'sundararajan.m@tn.gov.in', phone: '9876543200', role: 'ceo', designation: 'Chief Educational Officer', department: 'CEO Office, Kanyakumari', districtId: 'DST001', isActive: true, lastLogin: '2026-07-03T07:45:00', createdAt: '2024-01-15' },
  { id: 'USR003', name: 'Mrs. J. Victoria', email: 'victoria.j@tn.gov.in', phone: '9876543250', role: 'deo', designation: 'District Educational Officer', department: 'DEO Office, Kanyakumari', districtId: 'DST001', isActive: true, lastLogin: '2026-07-03T08:10:00', createdAt: '2024-02-01' },
  { id: 'USR004', name: 'Mrs. S. Lakshmi', email: 'lakshmi.s@tn.gov.in', phone: '9876543201', role: 'beo', designation: 'Block Educational Officer', department: 'BEO Office, Agastheeswaram', districtId: 'DST001', blockId: 'BLK001', isActive: true, lastLogin: '2026-07-03T08:05:00', createdAt: '2024-03-01' },
  { id: 'USR005', name: 'Mr. S. Rajendran', email: 'rajendran.s@tn.gov.in', phone: '9876501001', role: 'principal', designation: 'Headmaster', department: 'GHSS Nagercoil', districtId: 'DST001', blockId: 'BLK001', schoolId: 'SCH001', isActive: true, lastLogin: '2026-07-03T07:55:00', createdAt: '2024-01-10' },
  { id: 'USR006', name: 'Mrs. K. Ranjitha', email: 'ranjitha.k@tn.gov.in', phone: '9876502001', role: 'teacher', designation: 'PG Assistant - Mathematics', department: 'GHSS Nagercoil', districtId: 'DST001', blockId: 'BLK001', schoolId: 'SCH001', isActive: true, lastLogin: '2026-07-03T08:15:00', createdAt: '2024-01-10' },
  { id: 'USR007', name: 'Mr. Suresh Kumar', email: 'suresh.k@gmail.com', phone: '9876601001', role: 'parent', designation: 'Parent of Arun Kumar S', department: 'GHSS Nagercoil', districtId: 'DST001', schoolId: 'SCH001', isActive: true, lastLogin: '2026-07-02T19:30:00', createdAt: '2024-06-15' },
  { id: 'USR008', name: 'Arun Kumar S', email: 'arun.student@educonnect.tn', phone: '9876601001', role: 'student', designation: 'Class 10-A, Roll No. 1', department: 'GHSS Nagercoil', districtId: 'DST001', schoolId: 'SCH001', isActive: true, lastLogin: '2026-07-02T18:00:00', createdAt: '2024-06-15' },
];

export const getUserByRole = (role: string): User | undefined => 
  mockUsers.find((u) => u.role === role);

export const getUserById = (id: string): User | undefined =>
  mockUsers.find((u) => u.id === id);

export const demoCredentials = [
  { role: 'state_admin', label: 'State Education Department', identifier: 'state@educonnect.tn', password: 'demo123' },
  { role: 'ceo', label: 'Chief Educational Officer', identifier: 'ceo@educonnect.tn', password: 'demo123' },
  { role: 'deo', label: 'District Educational Officer', identifier: 'deo@educonnect.tn', password: 'demo123' },
  { role: 'beo', label: 'Block Educational Officer', identifier: 'beo@educonnect.tn', password: 'demo123' },
  { role: 'principal', label: 'School Principal', identifier: 'principal@educonnect.tn', password: 'demo123' },
  { role: 'teacher', label: 'Teacher', identifier: 'teacher@educonnect.tn', password: 'demo123' },
  { role: 'parent', label: 'Parent', identifier: 'parent@educonnect.tn', password: 'demo123' },
  { role: 'student', label: 'Student', identifier: 'student@educonnect.tn', password: 'demo123' },
];
