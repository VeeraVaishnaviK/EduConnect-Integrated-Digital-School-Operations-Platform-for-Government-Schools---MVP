"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Plus, Mail, Phone, BookOpen, Users, Star } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusChip } from "@/components/shared";
import { teachers } from "@/lib/mock-data/people";

export default function TeachersDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.employeeId.includes(searchTerm);
    const matchesSubject = subjectFilter === "all" || t.subjects.includes(subjectFilter);
    return matchesSearch && matchesSubject;
  });

  const activeCount = teachers.filter(t => (t.status || 'active') === "active").length;
  const onLeaveCount = teachers.filter(t => t.status === "on_leave").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Teacher Directory</h1>
          <p className="text-sm text-surface-500 mt-0.5">Manage staff, subjects, and schedules</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-surface-200 bg-white text-sm text-surface-700 hover:bg-surface-50 transition-colors">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            <Plus className="h-4 w-4" /> Add Teacher
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Teachers" value={teachers.length.toString()} icon={Users} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Present Today" value={(activeCount - onLeaveCount).toString()} icon={Star} iconColor="text-success-600" iconBg="bg-success-50" />
        <KPICard title="On Leave" value={onLeaveCount.toString()} icon={Star} iconColor="text-warning-600" iconBg="bg-warning-50" />
      </div>

      {/* Data Table */}
      <ChartCard 
        title="Teaching Staff" 
        subtitle={`${filteredTeachers.length} records found`}
        noPadding 
        className="min-h-[500px]"
        action={
          <div className="flex items-center gap-3 px-4 pt-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-9 pr-4 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-surface-400" />
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50"
              >
                <option value="all">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-y border-surface-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Teacher Profile</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Employee ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Subjects Taught</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Contact Info</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors cursor-pointer group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold border border-teal-200">
                        {teacher.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                      </div>
                      <div>
                        <p className="font-medium text-surface-800 group-hover:text-primary-600 transition-colors">{teacher.name}</p>
                        <p className="text-xs text-surface-500">{teacher.qualification}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-surface-600">{teacher.employeeId}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((sub, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-surface-100 text-surface-700">
                          {sub}
                        </span>
                      ))}
                    </div>
                    {teacher.classesAssigned && (
                      <p className="text-[10px] text-surface-400 mt-1">Classes: {teacher.classesAssigned.join(", ")}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-surface-400" />
                        <span className="text-xs text-surface-600">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-surface-400" />
                        <span className="text-xs text-surface-600">{teacher.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={teacher.status || 'active'} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="h-8 px-3 rounded text-xs font-medium border border-surface-200 text-surface-600 hover:bg-surface-100 transition-colors">
                        View Schedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTeachers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-surface-500">
                    No teachers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
