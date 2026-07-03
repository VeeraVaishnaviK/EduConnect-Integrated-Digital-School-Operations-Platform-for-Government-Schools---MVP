// ============================================================
// EduConnect Kanyakumari - Districts & Blocks Mock Data
// ============================================================
import { District, Block } from '@/lib/types';

export const kanyakumariBlocks: Block[] = [
  { id: 'BLK001', name: 'Agastheeswaram', districtId: 'DST001', totalSchools: 42, totalStudents: 8400, totalTeachers: 520, beoName: 'Mrs. S. Lakshmi', beoPhone: '9876543201', avgAttendance: 91.2 },
  { id: 'BLK002', name: 'Kalkulam', districtId: 'DST001', totalSchools: 38, totalStudents: 7200, totalTeachers: 460, beoName: 'Mr. R. Murugan', beoPhone: '9876543202', avgAttendance: 89.8 },
  { id: 'BLK003', name: 'Vilavancode', districtId: 'DST001', totalSchools: 35, totalStudents: 6800, totalTeachers: 430, beoName: 'Mrs. K. Priya', beoPhone: '9876543203', avgAttendance: 90.5 },
  { id: 'BLK004', name: 'Killiyoor', districtId: 'DST001', totalSchools: 30, totalStudents: 5900, totalTeachers: 380, beoName: 'Mr. J. Selvam', beoPhone: '9876543204', avgAttendance: 88.7 },
  { id: 'BLK005', name: 'Thiruvattar', districtId: 'DST001', totalSchools: 28, totalStudents: 5400, totalTeachers: 350, beoName: 'Mrs. A. Meena', beoPhone: '9876543205', avgAttendance: 92.1 },
  { id: 'BLK006', name: 'Thovalai', districtId: 'DST001', totalSchools: 25, totalStudents: 4800, totalTeachers: 310, beoName: 'Mr. S. Kumar', beoPhone: '9876543206', avgAttendance: 87.3 },
  { id: 'BLK007', name: 'Melpuram', districtId: 'DST001', totalSchools: 22, totalStudents: 4200, totalTeachers: 280, beoName: 'Mrs. R. Devi', beoPhone: '9876543207', avgAttendance: 91.8 },
  { id: 'BLK008', name: 'Kurunthancode', districtId: 'DST001', totalSchools: 20, totalStudents: 3800, totalTeachers: 250, beoName: 'Mr. P. Raja', beoPhone: '9876543208', avgAttendance: 89.4 },
  { id: 'BLK009', name: 'Munchirai', districtId: 'DST001', totalSchools: 18, totalStudents: 3500, totalTeachers: 230, beoName: 'Mrs. V. Saroja', beoPhone: '9876543209', avgAttendance: 90.1 },
];

export const tamilNaduDistricts: District[] = [
  { id: 'DST001', name: 'Kanyakumari', code: 'KK', totalSchools: 258, totalStudents: 50000, totalTeachers: 3210, blocks: kanyakumariBlocks, ceoName: 'Dr. M. Sundararajan', ceoPhone: '9876543200', avgAttendance: 90.1, complianceRate: 87.5 },
  { id: 'DST002', name: 'Chennai', code: 'CH', totalSchools: 520, totalStudents: 185000, totalTeachers: 9800, blocks: [], ceoName: 'Dr. R. Kannan', ceoPhone: '9876543210', avgAttendance: 88.5, complianceRate: 91.2 },
  { id: 'DST003', name: 'Coimbatore', code: 'CB', totalSchools: 480, totalStudents: 142000, totalTeachers: 8200, blocks: [], ceoName: 'Mr. S. Venkatesh', ceoPhone: '9876543211', avgAttendance: 91.2, complianceRate: 89.8 },
  { id: 'DST004', name: 'Madurai', code: 'MD', totalSchools: 410, totalStudents: 128000, totalTeachers: 7400, blocks: [], ceoName: 'Mrs. K. Meenakshi', ceoPhone: '9876543212', avgAttendance: 87.9, complianceRate: 85.6 },
  { id: 'DST005', name: 'Salem', code: 'SL', totalSchools: 390, totalStudents: 115000, totalTeachers: 6800, blocks: [], ceoName: 'Mr. V. Palani', ceoPhone: '9876543213', avgAttendance: 89.3, complianceRate: 86.4 },
  { id: 'DST006', name: 'Tiruchirappalli', code: 'TC', totalSchools: 370, totalStudents: 108000, totalTeachers: 6500, blocks: [], ceoName: 'Dr. A. Saravanan', ceoPhone: '9876543214', avgAttendance: 90.7, complianceRate: 88.9 },
  { id: 'DST007', name: 'Tirunelveli', code: 'TN', totalSchools: 350, totalStudents: 98000, totalTeachers: 6100, blocks: [], ceoName: 'Mrs. P. Selvi', ceoPhone: '9876543215', avgAttendance: 88.1, complianceRate: 84.7 },
  { id: 'DST008', name: 'Thanjavur', code: 'TJ', totalSchools: 340, totalStudents: 95000, totalTeachers: 5900, blocks: [], ceoName: 'Mr. K. Raman', ceoPhone: '9876543216', avgAttendance: 91.5, complianceRate: 90.1 },
  { id: 'DST009', name: 'Tiruppur', code: 'TP', totalSchools: 310, totalStudents: 88000, totalTeachers: 5400, blocks: [], ceoName: 'Mr. M. Gopal', ceoPhone: '9876543217', avgAttendance: 86.9, complianceRate: 83.5 },
  { id: 'DST010', name: 'Erode', code: 'ED', totalSchools: 320, totalStudents: 92000, totalTeachers: 5600, blocks: [], ceoName: 'Mrs. L. Kavitha', ceoPhone: '9876543218', avgAttendance: 89.8, complianceRate: 87.2 },
  { id: 'DST011', name: 'Vellore', code: 'VL', totalSchools: 360, totalStudents: 102000, totalTeachers: 6200, blocks: [], ceoName: 'Mr. N. Babu', ceoPhone: '9876543219', avgAttendance: 88.6, complianceRate: 85.8 },
  { id: 'DST012', name: 'Kancheepuram', code: 'KC', totalSchools: 290, totalStudents: 82000, totalTeachers: 5100, blocks: [], ceoName: 'Dr. S. Murthy', ceoPhone: '9876543220', avgAttendance: 90.2, complianceRate: 88.4 },
  { id: 'DST013', name: 'Villupuram', code: 'VP', totalSchools: 380, totalStudents: 110000, totalTeachers: 6600, blocks: [], ceoName: 'Mr. G. Kumar', ceoPhone: '9876543221', avgAttendance: 86.5, complianceRate: 82.1 },
  { id: 'DST014', name: 'Cuddalore', code: 'CD', totalSchools: 340, totalStudents: 96000, totalTeachers: 5800, blocks: [], ceoName: 'Mrs. R. Jayanthi', ceoPhone: '9876543222', avgAttendance: 87.8, complianceRate: 84.3 },
  { id: 'DST015', name: 'Nagapattinam', code: 'NP', totalSchools: 260, totalStudents: 72000, totalTeachers: 4400, blocks: [], ceoName: 'Mr. T. Arun', ceoPhone: '9876543223', avgAttendance: 89.1, complianceRate: 86.7 },
  { id: 'DST016', name: 'Dharmapuri', code: 'DP', totalSchools: 280, totalStudents: 78000, totalTeachers: 4800, blocks: [], ceoName: 'Mr. K. Senthil', ceoPhone: '9876543224', avgAttendance: 85.4, complianceRate: 81.2 },
  { id: 'DST017', name: 'Krishnagiri', code: 'KG', totalSchools: 300, totalStudents: 85000, totalTeachers: 5200, blocks: [], ceoName: 'Mrs. M. Anitha', ceoPhone: '9876543225', avgAttendance: 86.7, complianceRate: 83.9 },
  { id: 'DST018', name: 'Dindigul', code: 'DG', totalSchools: 310, totalStudents: 87000, totalTeachers: 5300, blocks: [], ceoName: 'Mr. P. Murugesan', ceoPhone: '9876543226', avgAttendance: 88.9, complianceRate: 85.5 },
  { id: 'DST019', name: 'Karur', code: 'KR', totalSchools: 220, totalStudents: 58000, totalTeachers: 3600, blocks: [], ceoName: 'Mr. R. Suresh', ceoPhone: '9876543227', avgAttendance: 90.4, complianceRate: 87.8 },
  { id: 'DST020', name: 'Nilgiris', code: 'NL', totalSchools: 190, totalStudents: 42000, totalTeachers: 2800, blocks: [], ceoName: 'Mrs. S. Geetha', ceoPhone: '9876543228', avgAttendance: 92.3, complianceRate: 91.5 },
  { id: 'DST021', name: 'Sivagangai', code: 'SV', totalSchools: 240, totalStudents: 65000, totalTeachers: 4000, blocks: [], ceoName: 'Mr. A. Pandian', ceoPhone: '9876543229', avgAttendance: 87.6, complianceRate: 84.1 },
  { id: 'DST022', name: 'Thoothukudi', code: 'TK', totalSchools: 270, totalStudents: 75000, totalTeachers: 4600, blocks: [], ceoName: 'Mrs. V. Mary', ceoPhone: '9876543230', avgAttendance: 89.5, complianceRate: 86.3 },
  { id: 'DST023', name: 'Virudhunagar', code: 'VN', totalSchools: 260, totalStudents: 70000, totalTeachers: 4300, blocks: [], ceoName: 'Mr. L. Vel', ceoPhone: '9876543231', avgAttendance: 90.8, complianceRate: 88.6 },
  { id: 'DST024', name: 'Ramanathapuram', code: 'RM', totalSchools: 230, totalStudents: 62000, totalTeachers: 3800, blocks: [], ceoName: 'Mr. J. Ibrahim', ceoPhone: '9876543232', avgAttendance: 85.2, complianceRate: 80.9 },
  { id: 'DST025', name: 'Theni', code: 'TH', totalSchools: 210, totalStudents: 55000, totalTeachers: 3400, blocks: [], ceoName: 'Mrs. K. Malathi', ceoPhone: '9876543233', avgAttendance: 89.7, complianceRate: 86.1 },
  { id: 'DST026', name: 'Pudukkottai', code: 'PK', totalSchools: 290, totalStudents: 80000, totalTeachers: 4900, blocks: [], ceoName: 'Mr. S. Ravi', ceoPhone: '9876543234', avgAttendance: 87.3, complianceRate: 83.7 },
  { id: 'DST027', name: 'Namakkal', code: 'NK', totalSchools: 250, totalStudents: 68000, totalTeachers: 4200, blocks: [], ceoName: 'Mr. V. Palanisamy', ceoPhone: '9876543235', avgAttendance: 90.6, complianceRate: 88.2 },
  { id: 'DST028', name: 'Perambalur', code: 'PB', totalSchools: 150, totalStudents: 38000, totalTeachers: 2400, blocks: [], ceoName: 'Mrs. R. Uma', ceoPhone: '9876543236', avgAttendance: 91.1, complianceRate: 89.4 },
  { id: 'DST029', name: 'Ariyalur', code: 'AY', totalSchools: 160, totalStudents: 40000, totalTeachers: 2600, blocks: [], ceoName: 'Mr. M. Sakthivel', ceoPhone: '9876543237', avgAttendance: 88.4, complianceRate: 85.0 },
  { id: 'DST030', name: 'Tiruvannamalai', code: 'TV', totalSchools: 370, totalStudents: 105000, totalTeachers: 6400, blocks: [], ceoName: 'Mr. K. Anbalagan', ceoPhone: '9876543238', avgAttendance: 87.2, complianceRate: 84.5 },
  { id: 'DST031', name: 'Ranipet', code: 'RP', totalSchools: 200, totalStudents: 52000, totalTeachers: 3200, blocks: [], ceoName: 'Mrs. T. Sangeetha', ceoPhone: '9876543239', avgAttendance: 89.9, complianceRate: 87.0 },
  { id: 'DST032', name: 'Tirupathur', code: 'TU', totalSchools: 210, totalStudents: 56000, totalTeachers: 3500, blocks: [], ceoName: 'Mr. P. Velu', ceoPhone: '9876543240', avgAttendance: 88.0, complianceRate: 84.8 },
  { id: 'DST033', name: 'Tenkasi', code: 'TS', totalSchools: 220, totalStudents: 59000, totalTeachers: 3700, blocks: [], ceoName: 'Mrs. S. Rani', ceoPhone: '9876543241', avgAttendance: 89.2, complianceRate: 86.0 },
  { id: 'DST034', name: 'Chengalpattu', code: 'CP', totalSchools: 280, totalStudents: 79000, totalTeachers: 4800, blocks: [], ceoName: 'Mr. A. Karthik', ceoPhone: '9876543242', avgAttendance: 90.0, complianceRate: 87.3 },
  { id: 'DST035', name: 'Kallakurichi', code: 'KL', totalSchools: 240, totalStudents: 64000, totalTeachers: 3900, blocks: [], ceoName: 'Mrs. V. Padma', ceoPhone: '9876543243', avgAttendance: 86.8, complianceRate: 82.5 },
  { id: 'DST036', name: 'Mayiladuthurai', code: 'MY', totalSchools: 180, totalStudents: 45000, totalTeachers: 2900, blocks: [], ceoName: 'Mr. R. Senthil', ceoPhone: '9876543244', avgAttendance: 91.4, complianceRate: 89.7 },
  { id: 'DST037', name: 'Tiruvallur', code: 'TL', totalSchools: 330, totalStudents: 94000, totalTeachers: 5700, blocks: [], ceoName: 'Mr. G. Subramani', ceoPhone: '9876543245', avgAttendance: 88.3, complianceRate: 85.6 },
  { id: 'DST038', name: 'Sivakasi', code: 'SK', totalSchools: 170, totalStudents: 43000, totalTeachers: 2700, blocks: [], ceoName: 'Mrs. M. Lakshmi', ceoPhone: '9876543246', avgAttendance: 89.6, complianceRate: 86.9 },
];

export const getDistrictById = (id: string): District | undefined =>
  tamilNaduDistricts.find((d) => d.id === id);

export const getBlockById = (id: string): Block | undefined =>
  kanyakumariBlocks.find((b) => b.id === id);

export const getKanyakumariDistrict = (): District => tamilNaduDistricts[0];

export const getStateStats = () => ({
  totalDistricts: tamilNaduDistricts.length,
  totalSchools: tamilNaduDistricts.reduce((sum, d) => sum + d.totalSchools, 0),
  totalStudents: tamilNaduDistricts.reduce((sum, d) => sum + d.totalStudents, 0),
  totalTeachers: tamilNaduDistricts.reduce((sum, d) => sum + d.totalTeachers, 0),
  avgAttendance: Number((tamilNaduDistricts.reduce((sum, d) => sum + d.avgAttendance, 0) / tamilNaduDistricts.length).toFixed(1)),
  avgCompliance: Number((tamilNaduDistricts.reduce((sum, d) => sum + d.complianceRate, 0) / tamilNaduDistricts.length).toFixed(1)),
});
