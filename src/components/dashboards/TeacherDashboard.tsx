"use client";

import React from "react";
import { Clock, BookOpen, ClipboardCheck, CalendarDays, MessageSquare, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatusChip, QuickAction } from "@/components/shared";
import { students, teachers } from "@/lib/mock-data/people";
import { leaveRequests, classWiseAttendance } from "@/lib/mock-data/operations";

const todayClasses = [
  { time: "08:30 - 09:15", subject: "Mathematics", class: "10-A", room: "Room 201", status: "completed" },
  { time: "09:15 - 10:00", subject: "Mathematics", class: "9-A", room: "Room 105", status: "completed" },
  { time: "10:15 - 11:00", subject: "Mathematics", class: "9-B", room: "Room 106", status: "in_progress" },
  { time: "11:00 - 11:45", subject: "Mathematics", class: "10-A", room: "Room 201", status: "upcoming" },
  { time: "12:30 - 01:15", subject: "Free Period", class: "-", room: "-", status: "upcoming" },
  { time: "01:15 - 02:00", subject: "Mathematics", class: "10-B", room: "Room 202", status: "upcoming" },
];

const studentsNeedingAttention = [
  { name: "Arun Kumar S", class: "10-A", issue: "Absent for 3 consecutive days", severity: "high" },
  { name: "Karthik Raja V", class: "10-A", issue: "Mathematics score below 40%", severity: "high" },
  { name: "Surya Prakash A", class: "10-B", issue: "Declining attendance trend", severity: "medium" },
];

export function TeacherDashboard() {
  const teacher = teachers[1]; // Mrs. K. Ranjitha
  const classStudents = students.filter((s) => s.className === "10" && s.section === "A");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">My Dashboard</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          {teacher.name} — {teacher.designation} • Class Teacher: {teacher.classTeacherOf}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Today's Classes" value="6" icon={Clock} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="My Students" value="45" icon={Users} iconColor="text-teal-600" iconBg="bg-teal-50" />
        <KPICard title="Pending Attendance" value="3" icon={ClipboardCheck} iconColor="text-warning-500" iconBg="bg-warning-50" />
        <KPICard title="Leave Balance" value="12" unit="days" icon={CalendarDays} iconColor="text-info-500" iconBg="bg-info-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's Timetable */}
        <ChartCard title="Today's Schedule" subtitle="Thursday, July 3, 2026">
          <div className="space-y-2">
            {todayClasses.map((cls, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-lg border ${
                cls.status === "in_progress" ? "border-teal-200 bg-teal-50/50" :
                cls.status === "completed" ? "border-surface-100 bg-surface-50/50" :
                "border-surface-100"
              }`}>
                <div className="text-xs font-mono text-surface-500 w-28 flex-shrink-0">{cls.time}</div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${cls.status === "in_progress" ? "text-teal-800" : "text-surface-800"}`}>
                    {cls.subject}
                  </p>
                  <p className="text-xs text-surface-400">Class {cls.class} • {cls.room}</p>
                </div>
                <StatusChip status={cls.status} label={
                  cls.status === "in_progress" ? "Now" :
                  cls.status === "completed" ? "Done" : "Upcoming"
                } />
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Quick Attendance */}
        <ChartCard title="Quick Attendance" subtitle="Class 10-A — Mark today's attendance" action={
          <button className="text-xs font-medium bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700 transition-colors">
            Mark All Present
          </button>
        }>
          <div className="space-y-1.5 max-h-72 overflow-y-auto">
            {classStudents.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-50">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-200 text-surface-600 text-[10px] font-bold flex items-center justify-center">
                    {s.rollNumber}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-surface-800">{s.name}</p>
                    <p className="text-[11px] text-surface-400">{s.emisId}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="w-7 h-7 rounded-md bg-success-50 text-success-600 text-xs font-bold hover:bg-success-100 transition-colors flex items-center justify-center">P</button>
                  <button className="w-7 h-7 rounded-md bg-danger-50 text-danger-600 text-xs font-bold hover:bg-danger-100 transition-colors flex items-center justify-center">A</button>
                  <button className="w-7 h-7 rounded-md bg-amber-50 text-amber-600 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center justify-center">L</button>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Students Needing Attention */}
        <ChartCard title="Students Needing Attention" subtitle="AI-flagged alerts">
          <div className="space-y-3">
            {studentsNeedingAttention.map((s, i) => (
              <div key={i} className="p-3 rounded-lg border border-surface-100">
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${s.severity === "high" ? "text-danger-500" : "text-warning-500"}`} />
                  <div>
                    <p className="text-sm font-medium text-surface-800">{s.name}</p>
                    <p className="text-xs text-surface-500">Class {s.class}</p>
                    <p className="text-xs text-surface-400 mt-1">{s.issue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Quick Actions */}
        <ChartCard title="Quick Actions">
          <div className="space-y-2">
            <QuickAction icon={ClipboardCheck} label="Mark Attendance" href="/dashboard/attendance" color="text-teal-600" iconBg="bg-teal-50" />
            <QuickAction icon={BookOpen} label="Enter Marks" href="/dashboard/performance" color="text-primary-600" iconBg="bg-primary-50" />
            <QuickAction icon={CalendarDays} label="Apply Leave" href="/dashboard/leave" color="text-info-500" iconBg="bg-info-50" />
            <QuickAction icon={MessageSquare} label="Parent Messages" href="/dashboard/notifications" color="text-purple-600" iconBg="bg-purple-50" />
          </div>
        </ChartCard>

        {/* Leave Requests */}
        <ChartCard title="My Leave History">
          <div className="space-y-3">
            {leaveRequests.filter(l => l.applicantRole === "student" || l.applicantId === "TCH002").slice(0, 4).map((l) => (
              <div key={l.id} className="p-3 rounded-lg border border-surface-100">
                <p className="text-sm font-medium text-surface-800">{l.applicantName}</p>
                <p className="text-xs text-surface-500">{l.type} leave • {l.days} day(s)</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-surface-400">{l.startDate}</span>
                  <StatusChip status={l.status} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
