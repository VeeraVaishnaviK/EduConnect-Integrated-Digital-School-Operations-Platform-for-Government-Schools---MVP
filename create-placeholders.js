const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'leave', title: 'Leave Management' },
  { path: 'performance', title: 'Academic Performance' },
  { path: 'reports', title: 'Reports & Analytics' },
  { path: 'notifications', title: 'Notifications' },
  { path: 'school-profile', title: 'School Profile' },
  { path: 'students', title: 'Student Directory' },
  { path: 'teachers', title: 'Teacher Directory' },
  { path: 'users', title: 'User Management' },
  { path: 'roles', title: 'Role Management' },
  { path: 'circulars', title: 'Circulars & Notices' },
  { path: 'settings', title: 'Settings' },
  { path: 'audit', title: 'Audit Logs' }
];

routes.forEach(route => {
  const dir = path.join(__dirname, 'src/app/dashboard', route.path);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const content = `"use client";\n\nimport { ComingSoon } from "@/components/shared";\n\nexport default function Page() {\n  return <ComingSoon title="${route.title}" />;\n}\n`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});
console.log('Placeholders created');
