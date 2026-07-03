"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Plus, MoreVertical, Mail, Phone, GraduationCap, AlertTriangle } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusChip } from "@/components/shared";
import { students } from "@/lib/mock-data/people";

export default function StudentsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.emisId.includes(searchTerm);
    const matchesClass = classFilter === "all" || s.className === classFilter;
    return matchesSearch && matchesClass;
  });

  const activeCount = students.filter(s => (s.status || 'active') === "active").length;
  const atRiskCount = students.filter(s => s.status === "at_risk" || s.status === "inactive").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Student Directory</h1>
          <p className="text-sm text-surface-500 mt-0.5">Manage and view all enrolled students</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-surface-200 bg-white text-sm text-surface-700 hover:bg-surface-50 transition-colors">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            <Plus className="h-4 w-4" /> Add Student
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Enrolled" value={students.length.toString()} icon={GraduationCap} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Active Students" value={activeCount.toString()} icon={GraduationCap} iconColor="text-success-600" iconBg="bg-success-50" />
        <KPICard title="At-Risk Students" value={atRiskCount.toString()} icon={AlertTriangle} iconColor="text-warning-600" iconBg="bg-warning-50" />
      </div>

      {/* Data Table */}
      <ChartCard 
        title="All Students" 
        subtitle={`${filteredStudents.length} records found`}
        noPadding 
        className="min-h-[500px]"
        action={
          <div className="flex items-center gap-3 px-4 pt-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search by name or EMIS ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-9 pr-4 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-surface-400" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50"
              >
                <option value="all">All Classes</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-y border-surface-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Student Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">EMIS ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Class & Section</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Guardian</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors cursor-pointer group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-[10px] font-bold">
                        {student.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                      </div>
                      <div>
                        <p className="font-medium text-surface-800 group-hover:text-primary-600 transition-colors">{student.name}</p>
                        <p className="text-xs text-surface-400">DOB: {student.dateOfBirth}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-surface-600">{student.emisId}</td>
                  <td className="px-4 py-3">
                    <p className="text-surface-800 font-medium">Class {student.className}-{student.section}</p>
                    <p className="text-xs text-surface-500">Roll: {student.rollNumber}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-surface-800">{student.parentName}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Phone className="h-3 w-3 text-surface-400" />
                      <span className="text-xs text-surface-500">{student.parentPhone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={student.status || 'active'} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 rounded text-surface-400 hover:bg-surface-200 hover:text-surface-700 transition-colors" title="Message Parent">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded text-surface-400 hover:bg-surface-200 hover:text-surface-700 transition-colors" title="More options">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-surface-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-surface-100 flex items-center justify-between bg-surface-50">
          <p className="text-xs text-surface-500">Showing {filteredStudents.length} of {students.length} students</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-surface-200 bg-white text-xs text-surface-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 rounded border border-surface-200 bg-white text-xs text-surface-700 hover:bg-surface-50">Next</button>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
