"use client";

import React from "react";
import { Building2, GraduationCap, ClipboardCheck, CalendarDays, AlertTriangle, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatusChip } from "@/components/shared";
import { kanyakumariBlocks } from "@/lib/mock-data/districts";
import { schools } from "@/lib/mock-data/schools";
import { recentActivities, inspections } from "@/lib/mock-data/operations";

const blockAttendanceData = kanyakumariBlocks.slice(0, 6).map((b) => ({
  name: b.name.length > 8 ? b.name.slice(0, 8) + "..." : b.name,
  attendance: b.avgAttendance,
  schools: b.totalSchools,
}));

export function BEODashboard() {
  const block = kanyakumariBlocks[0]; // Agastheeswaram
  const blockSchools = schools.filter((s) => s.blockId === "BLK001");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Block Dashboard</h1>
        <p className="text-sm text-surface-500 mt-0.5">Agastheeswaram Block — Kanyakumari District</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Schools in Block" value={block.totalSchools} icon={Building2} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Total Students" value={(block.totalStudents / 1000).toFixed(1) + "K"} icon={GraduationCap} iconColor="text-teal-600" iconBg="bg-teal-50" />
        <KPICard title="Block Attendance" value={block.avgAttendance + "%"} icon={ClipboardCheck} iconColor="text-success-500" iconBg="bg-success-50" change={1.1} changeType="increase" />
        <KPICard title="Pending Visits" value="3" icon={CalendarDays} iconColor="text-warning-500" iconBg="bg-warning-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Block-wise Attendance Comparison" subtitle="Kanyakumari district blocks">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={blockAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis domain={[82, 96]} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="attendance" fill="#0d9488" radius={[4, 4, 0, 0]} name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Schools in Agastheeswaram" subtitle={`${blockSchools.length} schools`} noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 bg-surface-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">School</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Students</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Health</th>
                </tr>
              </thead>
              <tbody>
                {blockSchools.map((s) => (
                  <tr key={s.id} className="border-b border-surface-100 hover:bg-surface-50 cursor-pointer">
                    <td className="px-4 py-2.5">
                      <p className="text-xs font-medium text-surface-800">{s.name}</p>
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs text-surface-600">{s.totalStudents}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`text-xs font-bold ${s.healthScore >= 85 ? "text-success-500" : "text-warning-500"}`}>{s.healthScore}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="School Rankings" subtitle="By health score">
          <div className="space-y-2">
            {[...blockSchools].sort((a, b) => b.healthScore - a.healthScore).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-50">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-teal-100 text-teal-700" : "bg-surface-100 text-surface-500"}`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-800 truncate">{s.name}</p>
                </div>
                <span className="text-sm font-bold text-surface-700">{s.healthScore}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Recent Activity">
          <ActivityFeed activities={recentActivities} maxItems={6} />
        </ChartCard>
      </div>
    </div>
  );
}
