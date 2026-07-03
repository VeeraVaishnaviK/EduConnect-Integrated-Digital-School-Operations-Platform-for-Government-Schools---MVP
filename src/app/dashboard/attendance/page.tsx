"use client";

import React, { useState } from "react";
import {
  ClipboardCheck, Search, Download, Filter, ChevronDown,
  CheckCircle, XCircle, Clock, Calendar,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from "recharts";
import { ChartCard, DashboardSection } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusChip, ProgressBar } from "@/components/shared";
import { students } from "@/lib/mock-data/people";
import { classWiseAttendance, monthlyAttendanceData, weeklyAttendanceData } from "@/lib/mock-data/operations";
import { cn } from "@/lib/utils";

type MarkingStatus = Record<string, "present" | "absent" | "late" | "leave">;

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedDate, setSelectedDate] = useState("2026-07-03");
  const [view, setView] = useState<"mark" | "history" | "analytics">("mark");
  const [markings, setMarkings] = useState<MarkingStatus>(() => {
    const initial: MarkingStatus = {};
    students.filter((s) => s.className === "10" && s.section === "A").forEach((s) => {
      initial[s.id] = "present";
    });
    return initial;
  });

  const filteredStudents = students.filter(
    (s) => s.className === selectedClass && s.section === selectedSection
  );

  const presentCount = Object.values(markings).filter((v) => v === "present").length;
  const absentCount = Object.values(markings).filter((v) => v === "absent").length;
  const lateCount = Object.values(markings).filter((v) => v === "late").length;
  const leaveCount = Object.values(markings).filter((v) => v === "leave").length;

  const handleMarkAll = (status: "present" | "absent") => {
    const updated: MarkingStatus = {};
    filteredStudents.forEach((s) => { updated[s.id] = status; });
    setMarkings(updated);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Attendance Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">Mark, track, and analyze student attendance</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-surface-200 bg-white text-sm text-surface-700 hover:bg-surface-50">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-1 bg-surface-100 rounded-lg p-1 w-fit">
        {[
          { key: "mark", label: "Mark Attendance" },
          { key: "history", label: "History" },
          { key: "analytics", label: "Analytics" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setView(tab.key as typeof view)}
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-md transition-colors",
              view === tab.key
                ? "bg-white text-surface-900 shadow-sm"
                : "text-surface-500 hover:text-surface-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === "mark" && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-surface-200">
            <div>
              <label className="text-xs font-medium text-surface-500 mb-1 block">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-9 px-3 rounded-lg border border-surface-200 text-sm bg-surface-50 focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-surface-500 mb-1 block">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="h-9 px-3 rounded-lg border border-surface-200 text-sm bg-surface-50 focus:border-primary-500 focus:outline-none"
              >
                {["6", "7", "8", "9", "10", "11", "12"].map((c) => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-surface-500 mb-1 block">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="h-9 px-3 rounded-lg border border-surface-200 text-sm bg-surface-50 focus:border-primary-500 focus:outline-none"
              >
                {["A", "B"].map((s) => (
                  <option key={s} value={s}>Section {s}</option>
                ))}
              </select>
            </div>
            <div className="flex-1" />
            <div className="flex gap-2 self-end">
              <button
                onClick={() => handleMarkAll("present")}
                className="h-9 px-3 rounded-lg bg-success-50 text-success-700 text-xs font-medium hover:bg-success-100 transition-colors"
              >
                Mark All Present
              </button>
              <button
                onClick={() => handleMarkAll("absent")}
                className="h-9 px-3 rounded-lg bg-danger-50 text-danger-700 text-xs font-medium hover:bg-danger-100 transition-colors"
              >
                Mark All Absent
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-emerald-700">{presentCount}</p>
              <p className="text-xs text-emerald-600 font-medium">Present</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-red-700">{absentCount}</p>
              <p className="text-xs text-red-600 font-medium">Absent</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-amber-700">{lateCount}</p>
              <p className="text-xs text-amber-600 font-medium">Late</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-700">{leaveCount}</p>
              <p className="text-xs text-blue-600 font-medium">On Leave</p>
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-surface-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-surface-900">
                Class {selectedClass}-{selectedSection} • {filteredStudents.length} students
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  placeholder="Search student..."
                  className="h-8 pl-9 pr-3 rounded-lg border border-surface-200 bg-surface-50 text-xs w-48 focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase w-12">Roll</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Student Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">EMIS ID</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => {
                    const status = markings[s.id] || "present";
                    return (
                      <tr key={s.id} className="border-b border-surface-50 hover:bg-surface-50 transition-colors">
                        <td className="px-4 py-3 text-surface-500 font-mono text-xs">{s.rollNumber}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-[10px] font-bold">
                              {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </div>
                            <span className="font-medium text-surface-800">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-surface-500 text-xs font-mono">{s.emisId}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1.5">
                            {(["present", "absent", "late", "leave"] as const).map((st) => (
                              <button
                                key={st}
                                onClick={() => setMarkings((prev) => ({ ...prev, [s.id]: st }))}
                                className={cn(
                                  "w-8 h-8 rounded-md text-[10px] font-bold transition-all",
                                  status === st
                                    ? st === "present" ? "bg-emerald-500 text-white shadow-sm" :
                                      st === "absent" ? "bg-red-500 text-white shadow-sm" :
                                      st === "late" ? "bg-amber-500 text-white shadow-sm" :
                                      "bg-blue-500 text-white shadow-sm"
                                    : "bg-surface-100 text-surface-500 hover:bg-surface-200"
                                )}
                              >
                                {st[0].toUpperCase()}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-surface-100 flex items-center justify-between">
              <p className="text-xs text-surface-400">
                {presentCount} present, {absentCount} absent, {lateCount} late, {leaveCount} on leave
              </p>
              <button className="h-9 px-6 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
                Submit Attendance
              </button>
            </div>
          </div>
        </>
      )}

      {view === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Monthly Attendance Trend" subtitle="Student & teacher attendance">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis domain={[80, 100]} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="students" stroke="#0d9488" fill="#0d948820" strokeWidth={2} name="Students" />
                  <Area type="monotone" dataKey="teachers" stroke="#2563eb" fill="#2563eb20" strokeWidth={2} name="Teachers" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Class-wise Attendance" subtitle="Today's attendance by class">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classWiseAttendance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="className" tick={{ fill: "#64748b", fontSize: 11 }} />
                  <YAxis domain={[80, 100]} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="percentage" fill="#0d9488" radius={[4, 4, 0, 0]} name="Attendance %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Class-wise Summary" className="lg:col-span-2" noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Class</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Total</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Present</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Absent</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Percentage</th>
                    <th className="px-4 py-3 text-xs font-semibold text-surface-500 uppercase w-32">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {classWiseAttendance.map((c) => (
                    <tr key={c.className} className="border-b border-surface-50 hover:bg-surface-50">
                      <td className="px-4 py-3 font-medium text-surface-800">{c.className}</td>
                      <td className="px-4 py-3 text-right text-surface-600">{c.total}</td>
                      <td className="px-4 py-3 text-right text-success-600 font-medium">{c.present}</td>
                      <td className="px-4 py-3 text-right text-danger-600 font-medium">{c.absent}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={cn("font-bold", c.percentage >= 90 ? "text-success-500" : c.percentage >= 85 ? "text-warning-500" : "text-danger-500")}>
                          {c.percentage}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ProgressBar
                          value={c.percentage}
                          max={100}
                          color={c.percentage >= 90 ? "bg-success-500" : c.percentage >= 85 ? "bg-warning-500" : "bg-danger-500"}
                          showLabel={false}
                          size="sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>
      )}

      {view === "history" && (
        <ChartCard title="Attendance History" subtitle="Recent attendance records" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Class</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Present</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Absent</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase">%</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase">Marked By</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "03 Jul 2026", class: "10-A", present: 40, absent: 5, pct: "88.9%", by: "Mrs. K. Ranjitha" },
                  { date: "03 Jul 2026", class: "9-A", present: 44, absent: 4, pct: "91.7%", by: "Mrs. P. Mercy" },
                  { date: "02 Jul 2026", class: "10-A", present: 42, absent: 3, pct: "93.3%", by: "Mrs. K. Ranjitha" },
                  { date: "02 Jul 2026", class: "10-B", present: 39, absent: 4, pct: "90.7%", by: "Mrs. V. Girija" },
                  { date: "01 Jul 2026", class: "10-A", present: 38, absent: 7, pct: "84.4%", by: "Mrs. K. Ranjitha" },
                  { date: "01 Jul 2026", class: "9-A", present: 45, absent: 3, pct: "93.8%", by: "Mrs. P. Mercy" },
                  { date: "30 Jun 2026", class: "10-A", present: 41, absent: 4, pct: "91.1%", by: "Mrs. K. Ranjitha" },
                ].map((r, i) => (
                  <tr key={i} className="border-b border-surface-50 hover:bg-surface-50">
                    <td className="px-4 py-3 text-surface-700">{r.date}</td>
                    <td className="px-4 py-3 font-medium text-surface-800">{r.class}</td>
                    <td className="px-4 py-3 text-right text-success-600">{r.present}</td>
                    <td className="px-4 py-3 text-right text-danger-600">{r.absent}</td>
                    <td className="px-4 py-3 text-right font-bold text-surface-800">{r.pct}</td>
                    <td className="px-4 py-3 text-surface-500 text-xs">{r.by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      )}
    </div>
  );
}
