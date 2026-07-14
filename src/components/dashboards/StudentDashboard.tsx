"use client";

import React from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  BookOpen,
  Calendar,
  Trophy,
  BarChart3,
  Bell,
  Clock,
  LayoutDashboard,
  MessageSquare,
  UserPlus,
  FileText,
  GraduationCap,
  CreditCard,
  ShieldAlert,
  Award,
  Building2,
  User
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ProgressBar, StatusChip } from "@/components/shared";
import { academicPerformances, holidays, circulars } from "@/lib/mock-data/operations";

const quickNavItems = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Course", href: "/dashboard/my-course", icon: BookOpen },
  { label: "My Course Feedback", href: "/dashboard/my-course-feedback", icon: MessageSquare },
  { label: "Enrollmentnew", href: "/dashboard/enrollmentnew", icon: UserPlus },
  { label: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck },
  { label: "Assignment", href: "/dashboard/assignment", icon: FileText },
  { label: "Examination", href: "/dashboard/examination", icon: GraduationCap },
  { label: "Disciplinary", href: "/dashboard/disciplinary", icon: ShieldAlert },
  { label: "Raise Infra Issue", href: "/dashboard/raise-infra-issue", icon: Building2 },
  { label: "My Profile", href: "/dashboard/my-profile", icon: User },
];

const timetable = [
  { time: "08:30", subject: "Tamil", teacher: "Mr. S. Rajendran" },
  { time: "09:15", subject: "English", teacher: "Mrs. P. Mercy" },
  { time: "10:15", subject: "Mathematics", teacher: "Mrs. K. Ranjitha" },
  { time: "11:00", subject: "Science", teacher: "Mr. D. Arul Selvan" },
  { time: "12:30", subject: "Social Science", teacher: "Mr. R. Kalidoss" },
  { time: "01:15", subject: "Physical Education", teacher: "Mr. A. Jayakumar" },
];

const subjectRadarData = [
  { subject: "Tamil", score: 78 },
  { subject: "English", score: 65 },
  { subject: "Maths", score: 45 },
  { subject: "Science", score: 72 },
  { subject: "Social", score: 81 },
];

const achievements = [
  { title: "District Level Essay Competition", date: "Nov 2025", type: "Gold Medal" },
  { title: "Science Exhibition - School Level", date: "Sep 2025", type: "Participation" },
  { title: "Sports Day - 200m Race", date: "Jan 2026", type: "Silver Medal" },
];

const homework = [
  { subject: "Mathematics", task: "Complete Exercise 5.3 - Trigonometry", dueDate: "2026-07-04", status: "pending" },
  { subject: "English", task: "Write an essay on 'Digital India'", dueDate: "2026-07-05", status: "pending" },
  { subject: "Science", task: "Lab report - Ohm's Law experiment", dueDate: "2026-07-03", status: "overdue" },
  { subject: "Tamil", task: "Poem memorization - Bharathiyar", dueDate: "2026-07-02", status: "completed" },
];

export function StudentDashboard() {
  const performance = academicPerformances[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">My Dashboard</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          Arun Kumar S — Class 10-A, Roll No. 1, GHSS Nagercoil
        </p>
      </div>

      {/* Quick Navigation Grid */}
      <div className="bg-white p-6 rounded-xl border border-surface-200 shadow-sm">
        <h2 className="text-base font-bold text-surface-900 mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {quickNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-surface-100 hover:border-teal-500/30 hover:bg-teal-50/10 transition-all duration-200 group text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 group-hover:bg-teal-100 flex items-center justify-center text-teal-600 transition-colors mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-surface-700 group-hover:text-teal-700 transition-colors leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="My Attendance" value="88%" icon={ClipboardCheck} iconColor="text-teal-600" iconBg="bg-teal-50" change={-2.1} changeType="decrease" />
        <KPICard title="Academic Score" value="68.2%" icon={BarChart3} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Pending Homework" value="3" icon={BookOpen} iconColor="text-warning-500" iconBg="bg-warning-50" />
        <KPICard title="Achievements" value="3" icon={Trophy} iconColor="text-purple-600" iconBg="bg-purple-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's Timetable */}
        <ChartCard title="Today's Timetable" subtitle="Thursday, July 3">
          <div className="space-y-2">
            {timetable.map((cls, i) => (
              <div key={i} className="flex items-center gap-4 py-2.5 px-3 rounded-lg hover:bg-surface-50 border-l-2 border-surface-200">
                <span className="text-xs font-mono text-surface-500 w-14">{cls.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-surface-800">{cls.subject}</p>
                  <p className="text-xs text-surface-400">{cls.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Subject Performance Radar */}
        <ChartCard title="Subject Performance" subtitle="First Quarterly Exam">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectRadarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="#0d9488" fill="#0d9488" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Homework */}
        <ChartCard title="Homework & Assignments" subtitle={`${homework.filter(h => h.status !== "completed").length} pending`}>
          <div className="space-y-3">
            {homework.map((hw, i) => (
              <div key={i} className="p-3 rounded-lg border border-surface-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-surface-800">{hw.subject}</p>
                    <p className="text-xs text-surface-500 mt-0.5">{hw.task}</p>
                  </div>
                  <StatusChip status={hw.status} />
                </div>
                <p className="text-[11px] text-surface-400 mt-2">Due: {new Date(hw.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Achievements */}
        <ChartCard title="My Achievements">
          <div className="space-y-3">
            {achievements.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-surface-100">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-800">{a.title}</p>
                  <p className="text-xs text-surface-500">{a.date} • {a.type}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Announcements */}
        <ChartCard title="Announcements">
          <div className="space-y-3">
            {circulars.filter(c => c.targetAudience.includes("student")).slice(0, 4).map((c) => (
              <div key={c.id} className="p-3 rounded-lg border border-surface-100 hover:border-surface-200 cursor-pointer">
                <p className="text-sm font-medium text-surface-800 line-clamp-2">{c.title}</p>
                <p className="text-xs text-surface-500 mt-1">{new Date(c.issuedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
