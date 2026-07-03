"use client";

import React from "react";
import { Building2, GraduationCap, Users, ClipboardCheck, AlertTriangle, FileText, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatusChip, QuickAction } from "@/components/shared";
import { getKanyakumariDistrict, kanyakumariBlocks } from "@/lib/mock-data/districts";
import { schools } from "@/lib/mock-data/schools";
import { monthlyAttendanceData, recentActivities, inspections, circulars } from "@/lib/mock-data/operations";

export function DEODashboard() {
  const district = getKanyakumariDistrict();
  const lowAttendanceSchools = schools.filter((s) => s.healthScore < 80);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">District Dashboard</h1>
        <p className="text-sm text-surface-500 mt-0.5">Kanyakumari District — DEO Office</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Schools in District" value={district.totalSchools} icon={Building2} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Total Students" value={(district.totalStudents / 1000).toFixed(0) + "K"} icon={GraduationCap} iconColor="text-teal-600" iconBg="bg-teal-50" change={1.2} changeType="increase" />
        <KPICard title="District Attendance" value={district.avgAttendance + "%"} icon={ClipboardCheck} iconColor="text-success-500" iconBg="bg-success-50" change={0.5} changeType="increase" />
        <KPICard title="Teacher Vacancies" value="12" icon={Users} iconColor="text-warning-500" iconBg="bg-warning-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Monthly Attendance Trend" subtitle="Student & teacher attendance" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAttendanceData}>
                <defs>
                  <linearGradient id="studentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="teacherGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis domain={[80, 100]} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                <Area type="monotone" dataKey="students" stroke="#0d9488" fill="url(#studentGrad)" strokeWidth={2} name="Students" />
                <Area type="monotone" dataKey="teachers" stroke="#2563eb" fill="url(#teacherGrad)" strokeWidth={2} name="Teachers" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Block-wise Overview" subtitle="9 educational blocks">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {kanyakumariBlocks.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-surface-50">
                <div>
                  <p className="text-sm font-medium text-surface-800">{b.name}</p>
                  <p className="text-xs text-surface-400">{b.totalSchools} schools</p>
                </div>
                <span className={`text-sm font-bold ${b.avgAttendance >= 90 ? "text-success-500" : "text-warning-500"}`}>
                  {b.avgAttendance}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Schools Table */}
        <ChartCard title="Schools Under District" subtitle={`${schools.length} schools`} className="lg:col-span-2" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 bg-surface-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">School</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Block</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Students</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Health</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {schools.slice(0, 8).map((s) => (
                  <tr key={s.id} className="border-b border-surface-100 hover:bg-surface-50 cursor-pointer">
                    <td className="px-4 py-3">
                      <p className="font-medium text-surface-800 text-xs">{s.name}</p>
                      <p className="text-[11px] text-surface-400">{s.type}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-surface-600">{kanyakumariBlocks.find((b) => b.id === s.blockId)?.name}</td>
                    <td className="px-4 py-3 text-right text-xs text-surface-600">{s.totalStudents}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-bold ${s.healthScore >= 85 ? "text-success-500" : s.healthScore >= 70 ? "text-warning-500" : "text-danger-500"}`}>
                        {s.healthScore}/100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center"><StatusChip status={s.complianceStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        <div className="space-y-4">
          <ChartCard title="Pending Inspections" subtitle={`${inspections.filter(i => i.status === 'scheduled').length} scheduled`}>
            <div className="space-y-3">
              {inspections.map((ins) => (
                <div key={ins.id} className="p-3 rounded-lg border border-surface-100">
                  <p className="text-sm font-medium text-surface-800">{ins.schoolName}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{ins.inspectorName}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-surface-400">{ins.date}</span>
                    <StatusChip status={ins.status} />
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Recent Activity">
            <ActivityFeed activities={recentActivities} maxItems={4} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
