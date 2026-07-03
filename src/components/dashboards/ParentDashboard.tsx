"use client";

import React from "react";
import { ClipboardCheck, BarChart3, CalendarDays, MessageSquare, GraduationCap, BookOpen, Bell } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatusChip, ProgressBar } from "@/components/shared";
import { academicPerformances, circulars, holidays } from "@/lib/mock-data/operations";

const childAttendanceData = [
  { month: "Jun", percentage: 95 },
  { month: "Jul", percentage: 88 },
  { month: "Aug", percentage: 92 },
  { month: "Sep", percentage: 90 },
  { month: "Oct", percentage: 85 },
  { month: "Nov", percentage: 94 },
  { month: "Dec", percentage: 82 },
  { month: "Jan", percentage: 93 },
];

export function ParentDashboard() {
  const performance = academicPerformances[0]; // Arun Kumar S

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Parent Dashboard</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Child: Arun Kumar S — Class 10-A, GHSS Nagercoil
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Attendance This Month" value="88%" icon={ClipboardCheck} iconColor="text-teal-600" iconBg="bg-teal-50" change={-3.2} changeType="decrease" changeLabel="vs last month" />
        <KPICard title="Academic Performance" value="68.2%" icon={BarChart3} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Pending Homework" value="3" icon={BookOpen} iconColor="text-warning-500" iconBg="bg-warning-50" />
        <KPICard title="School Notices" value="4" icon={Bell} iconColor="text-info-500" iconBg="bg-info-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance Chart */}
        <ChartCard title="Attendance Trend" subtitle="Monthly attendance percentage">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={childAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis domain={[70, 100]} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="percentage" fill="#0d9488" radius={[4, 4, 0, 0]} name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Academic Performance */}
        <ChartCard title="Latest Exam Results" subtitle={performance?.examName || "First Quarterly Exam"}>
          <div className="space-y-3">
            {performance?.subjects.map((sub) => (
              <div key={sub.subject} className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-surface-700">{sub.subject}</div>
                <div className="flex-1">
                  <ProgressBar
                    value={sub.obtainedMarks}
                    max={sub.maxMarks}
                    color={sub.obtainedMarks >= 75 ? "bg-success-500" : sub.obtainedMarks >= 50 ? "bg-warning-500" : "bg-danger-500"}
                    size="sm"
                  />
                </div>
                <span className="text-xs font-bold text-surface-700 w-12 text-right">{sub.obtainedMarks}/{sub.maxMarks}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-surface-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-surface-800">Total</span>
              <span className="text-sm font-bold text-primary-600">{performance?.obtainedMarks}/{performance?.totalMarks} ({performance?.percentage}%)</span>
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* School Notices */}
        <ChartCard title="School Notices" subtitle="Recent circulars">
          <div className="space-y-3">
            {circulars.filter(c => c.targetAudience.includes("parent")).slice(0, 4).map((c) => (
              <div key={c.id} className="p-3 rounded-lg border border-surface-100 hover:border-surface-200 cursor-pointer">
                <p className="text-sm font-medium text-surface-800 line-clamp-2">{c.title}</p>
                <p className="text-xs text-surface-500 mt-1">{new Date(c.issuedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Holiday Calendar */}
        <ChartCard title="Upcoming Holidays">
          <div className="space-y-2">
            {holidays.filter(h => new Date(h.date) > new Date("2026-07-01")).slice(0, 6).map((h) => (
              <div key={h.id} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-surface-50">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-primary-600">{new Date(h.date).toLocaleDateString("en", { month: "short" })}</span>
                  <span className="text-xs font-bold text-primary-800">{new Date(h.date).getDate()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-800">{h.name}</p>
                  <p className="text-xs text-surface-400">{h.type}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* AI Summary */}
        <ChartCard title="AI Performance Summary">
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary-50 to-teal-50 border border-primary-100">
            <p className="text-sm text-surface-700 leading-relaxed">
              {performance?.aiSummary || "Your child shows consistent performance across subjects. Areas of improvement include Mathematics where additional practice is recommended."}
            </p>
            <div className="mt-4 pt-3 border-t border-primary-100">
              <p className="text-xs font-semibold text-primary-700 mb-2">Recommendations:</p>
              <ul className="space-y-1">
                <li className="text-xs text-surface-600 flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary-400 mt-1.5" />
                  Additional practice in Mathematics - Trigonometry
                </li>
                <li className="text-xs text-surface-600 flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary-400 mt-1.5" />
                  Encourage reading English novels for language improvement
                </li>
                <li className="text-xs text-surface-600 flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary-400 mt-1.5" />
                  Monitor daily attendance regularly
                </li>
              </ul>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
