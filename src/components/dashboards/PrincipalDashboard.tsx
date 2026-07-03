"use client";

import React, { useState } from "react";
import {
  Users,
  GraduationCap,
  UserCheck,
  CalendarDays,
  ClipboardCheck,
  TrendingUp,
  Bell,
  FileText,
  BarChart3,
  Brain,
  Building2,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard, DashboardSection } from "@/components/dashboard/ChartCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { StatusChip, QuickAction, ProgressBar } from "@/components/shared";
import {
  weeklyAttendanceData,
  classWiseAttendance,
  teacherAttendanceToday,
  leaveRequests,
  circulars,
  recentActivities,
  aiInsights,
} from "@/lib/mock-data/operations";

const COLORS = ["#0d9488", "#2563eb", "#d97706", "#dc2626", "#8b5cf6"];

const complianceData = [
  { name: "Completed", value: 18, color: "#16a34a" },
  { name: "In Progress", value: 5, color: "#d97706" },
  { name: "Pending", value: 3, color: "#dc2626" },
];

export function PrincipalDashboard() {
  const [attendanceView, setAttendanceView] = useState<"weekly" | "classwise">("weekly");

  const pendingLeaves = leaveRequests.filter((l) => l.status === "pending");
  const criticalInsights = aiInsights.filter((i) => i.severity === "critical" || i.severity === "high");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900">School Dashboard</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Govt. Higher Secondary School, Nagercoil — Academic Year 2025-26
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Today's Attendance"
          value="91.2%"
          change={1.8}
          changeType="increase"
          changeLabel="vs yesterday"
          icon={ClipboardCheck}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <KPICard
          title="Teacher Attendance"
          value="10/11"
          change={0}
          changeType="neutral"
          changeLabel="1 on leave"
          icon={UserCheck}
          iconColor="text-primary-600"
          iconBg="bg-primary-50"
        />
        <KPICard
          title="Pending Leave Requests"
          value={pendingLeaves.length.toString()}
          icon={CalendarDays}
          iconColor="text-warning-500"
          iconBg="bg-warning-50"
        />
        <KPICard
          title="Active Students"
          value="1,250"
          change={2.3}
          changeType="increase"
          changeLabel="this month"
          icon={GraduationCap}
          iconColor="text-success-500"
          iconBg="bg-success-50"
        />
      </div>

      {/* AI Alert Banner */}
      {criticalInsights.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <div className="rounded-full bg-amber-100 p-2 flex-shrink-0 mt-0.5">
            <Brain className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-900">
              AI Alert: {criticalInsights[0].title}
            </h3>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              {criticalInsights[0].description}
            </p>
            <button className="text-xs font-semibold text-amber-800 hover:text-amber-900 mt-2 underline underline-offset-2">
              View Details →
            </button>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Attendance Trend Chart */}
        <ChartCard
          title="Attendance Overview"
          subtitle="Student attendance this week"
          className="lg:col-span-2"
          action={
            <div className="flex gap-1 bg-surface-100 rounded-lg p-0.5">
              <button
                onClick={() => setAttendanceView("weekly")}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                  attendanceView === "weekly"
                    ? "bg-white text-surface-900 shadow-sm"
                    : "text-surface-500 hover:text-surface-700"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setAttendanceView("classwise")}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                  attendanceView === "classwise"
                    ? "bg-white text-surface-900 shadow-sm"
                    : "text-surface-500 hover:text-surface-700"
                }`}
              >
                By Class
              </button>
            </div>
          }
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {attendanceView === "weekly" ? (
                <AreaChart data={weeklyAttendanceData}>
                  <defs>
                    <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="#0d9488"
                    fill="url(#presentGrad)"
                    strokeWidth={2}
                    name="Present"
                  />
                  <Area
                    type="monotone"
                    dataKey="absent"
                    stroke="#dc2626"
                    fill="#fef2f2"
                    strokeWidth={2}
                    name="Absent"
                  />
                </AreaChart>
              ) : (
                <BarChart data={classWiseAttendance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="className" tick={{ fill: "#64748b", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} domain={[80, 100]} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="percentage" fill="#0d9488" radius={[4, 4, 0, 0]} name="Attendance %" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Compliance Donut */}
        <ChartCard title="Compliance Status" subtitle="26 items total">
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  iconSize={8}
                  iconType="circle"
                  formatter={(value: string) => (
                    <span className="text-xs text-surface-600">{value}</span>
                  )}
                />
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Middle Row: Teacher Attendance + Leave Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Teacher Attendance Today */}
        <ChartCard title="Teacher Attendance" subtitle="Today's status">
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {teacherAttendanceToday.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
                    {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-800">{t.name}</p>
                    <p className="text-xs text-surface-400">Check-in: {t.checkIn}</p>
                  </div>
                </div>
                <StatusChip status={t.status} />
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Pending Leave Requests */}
        <ChartCard
          title="Leave Requests"
          subtitle={`${pendingLeaves.length} pending approval`}
          action={
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          }
        >
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {leaveRequests.slice(0, 5).map((leave) => (
              <div
                key={leave.id}
                className="p-3 rounded-lg border border-surface-100 hover:border-surface-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-surface-800">
                      {leave.applicantName}
                    </p>
                    <p className="text-xs text-surface-500 mt-0.5">
                      {leave.type.charAt(0).toUpperCase() + leave.type.slice(1)} Leave •{" "}
                      {leave.days} day{leave.days > 1 ? "s" : ""} • {leave.startDate}
                    </p>
                    <p className="text-xs text-surface-400 mt-1 line-clamp-1">
                      {leave.reason}
                    </p>
                  </div>
                  <StatusChip status={leave.status} />
                </div>
                {leave.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 h-7 rounded-md bg-success-500 text-white text-xs font-medium hover:bg-success-600 transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 h-7 rounded-md border border-surface-200 text-surface-700 text-xs font-medium hover:bg-surface-50 transition-colors">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row: Quick Actions + Circulars + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <ChartCard title="Quick Actions" subtitle="Common tasks">
          <div className="grid grid-cols-1 gap-2">
            <QuickAction
              icon={ClipboardCheck}
              label="Mark Attendance"
              href="/dashboard/attendance"
              color="text-teal-600"
              iconBg="bg-teal-50"
              description="Daily attendance entry"
            />
            <QuickAction
              icon={FileText}
              label="Post Circular"
              href="/dashboard/circulars"
              color="text-primary-600"
              iconBg="bg-primary-50"
              description="Publish announcement"
            />
            <QuickAction
              icon={BarChart3}
              label="View Reports"
              href="/dashboard/reports"
              color="text-info-500"
              iconBg="bg-info-50"
              description="Monthly analytics"
            />
            <QuickAction
              icon={Brain}
              label="AI Insights"
              href="/dashboard/ai-insights"
              color="text-purple-600"
              iconBg="bg-purple-50"
              description="Smart recommendations"
            />
            <QuickAction
              icon={Building2}
              label="School Profile"
              href="/dashboard/school-profile"
              color="text-amber-600"
              iconBg="bg-amber-50"
              description="Update school details"
            />
          </div>
        </ChartCard>

        {/* Recent Circulars */}
        <ChartCard
          title="Recent Circulars"
          subtitle="Government & school notices"
          action={
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          }
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {circulars.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-lg border border-surface-100 hover:border-surface-200 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    c.priority === "critical" ? "bg-danger-500" :
                    c.priority === "high" ? "bg-warning-500" : "bg-surface-300"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-800 line-clamp-2">
                      {c.title}
                    </p>
                    <p className="text-xs text-surface-500 mt-1">
                      {c.issuedBy} • {new Date(c.issuedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Activity Feed */}
        <ChartCard
          title="Recent Activity"
          subtitle="Latest actions"
          action={
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
              View All
            </button>
          }
        >
          <ActivityFeed activities={recentActivities} maxItems={6} />
        </ChartCard>
      </div>
    </div>
  );
}
