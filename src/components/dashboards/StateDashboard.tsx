"use client";

import React from "react";
import {
  Building2, GraduationCap, Users, MapPin, TrendingUp,
  AlertTriangle, CheckCircle, BarChart3, ClipboardCheck,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatusChip, QuickAction } from "@/components/shared";
import { getStateStats, tamilNaduDistricts } from "@/lib/mock-data/districts";
import { districtPerformanceData, recentActivities, circulars } from "@/lib/mock-data/operations";

export function StateDashboard() {
  const stats = getStateStats();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Tamil Nadu Education Overview</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          State Education Dashboard — Academic Year 2025-26
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total Districts" value={stats.totalDistricts} icon={MapPin} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Total Schools" value={stats.totalSchools.toLocaleString()} icon={Building2} iconColor="text-teal-600" iconBg="bg-teal-50" change={3.2} changeType="increase" changeLabel="vs last year" />
        <KPICard title="Total Students" value={(stats.totalStudents / 100000).toFixed(1) + "L"} icon={GraduationCap} iconColor="text-info-500" iconBg="bg-info-50" change={1.5} changeType="increase" />
        <KPICard title="Total Teachers" value={(stats.totalTeachers / 1000).toFixed(1) + "K"} icon={Users} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <KPICard title="Avg. Attendance" value={stats.avgAttendance + "%"} icon={ClipboardCheck} iconColor="text-success-500" iconBg="bg-success-50" change={0.8} changeType="increase" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="District-wise Attendance" subtitle="Top 10 districts" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtPerformanceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[80, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
                <Bar dataKey="attendance" fill="#0d9488" radius={[0, 4, 4, 0]} name="Attendance %" barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Compliance Rate" subtitle="District compliance status">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtPerformanceData.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} angle={-20} textAnchor="end" height={50} />
                <YAxis domain={[75, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="compliance" fill="#2563eb" radius={[4, 4, 0, 0]} name="Compliance %" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* District Table + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="District Summary" subtitle="All 38 districts" className="lg:col-span-2" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-200 bg-surface-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">District</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Schools</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Students</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Attendance</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {tamilNaduDistricts.slice(0, 10).map((d, i) => (
                  <tr key={d.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="font-medium text-surface-800">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-surface-600">{d.totalSchools}</td>
                    <td className="px-4 py-3 text-right text-surface-600">{(d.totalStudents / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${d.avgAttendance >= 90 ? "text-success-500" : d.avgAttendance >= 85 ? "text-warning-500" : "text-danger-500"}`}>
                        {d.avgAttendance}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${d.complianceRate >= 88 ? "text-success-500" : d.complianceRate >= 84 ? "text-warning-500" : "text-danger-500"}`}>
                        {d.complianceRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 text-center border-t border-surface-100">
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
              View All 38 Districts →
            </button>
          </div>
        </ChartCard>

        <div className="space-y-4">
          <ChartCard title="Recent Circulars">
            <div className="space-y-3">
              {circulars.slice(0, 3).map((c) => (
                <div key={c.id} className="p-3 rounded-lg border border-surface-100 hover:border-surface-200 cursor-pointer transition-colors">
                  <p className="text-sm font-medium text-surface-800 line-clamp-2">{c.title}</p>
                  <p className="text-xs text-surface-500 mt-1">{c.issuedBy} • {new Date(c.issuedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
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
