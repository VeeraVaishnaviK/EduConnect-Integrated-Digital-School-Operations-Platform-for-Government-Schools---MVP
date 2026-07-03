"use client";

import React, { useState } from "react";
import { Download, Filter, FileText, Calendar, Users, TrendingUp, Search } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";

const reportsList = [
  { id: "REP01", title: "Monthly Attendance Summary", category: "Attendance", lastGenerated: "2026-07-01", type: "PDF", size: "1.2 MB" },
  { id: "REP02", title: "Quarterly Academic Performance", category: "Academics", lastGenerated: "2026-06-30", type: "Excel", size: "3.4 MB" },
  { id: "REP03", title: "Staff Leave Balance Report", category: "HR", lastGenerated: "2026-07-02", type: "PDF", size: "0.8 MB" },
  { id: "REP04", title: "Infrastructure Compliance Audit", category: "Infrastructure", lastGenerated: "2026-05-15", type: "PDF", size: "4.5 MB" },
  { id: "REP05", title: "At-Risk Students List", category: "AI Analytics", lastGenerated: "2026-07-03", type: "Excel", size: "0.5 MB" },
  { id: "REP06", title: "Mid-Day Meal Consumption", category: "Operations", lastGenerated: "2026-06-30", type: "CSV", size: "1.8 MB" },
];

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredReports = reportsList.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Reports & Analytics</h1>
          <p className="text-sm text-surface-500 mt-0.5">Generate and download official school reports</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Reports Generated" value="142" icon={FileText} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Scheduled Reports" value="5" icon={Calendar} iconColor="text-teal-600" iconBg="bg-teal-50" />
        <KPICard title="Data Exported (Month)" value="45 GB" icon={Download} iconColor="text-info-600" iconBg="bg-info-50" />
        <KPICard title="Active Data Sources" value="12" icon={TrendingUp} iconColor="text-purple-600" iconBg="bg-purple-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <ChartCard 
          title="Report Repository" 
          subtitle="Recent and standard reports" 
          className="lg:col-span-2"
          noPadding
          action={
            <div className="flex items-center gap-3 px-4 pt-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-surface-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50"
                >
                  <option value="All">All Categories</option>
                  <option value="Attendance">Attendance</option>
                  <option value="Academics">Academics</option>
                  <option value="HR">HR</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="AI Analytics">AI Analytics</option>
                </select>
              </div>
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-y border-surface-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Report Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Format</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Last Generated</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-surface-900">{report.title}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-1 rounded bg-surface-100 text-xs font-medium text-surface-700">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-surface-600">
                      {report.type} <span className="text-xs text-surface-400">({report.size})</span>
                    </td>
                    <td className="px-4 py-3 text-surface-600">{report.lastGenerated}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center justify-center h-8 w-8 rounded bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors" title="Download">
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        {/* Generate Custom Report */}
        <ChartCard title="Custom Report Builder" subtitle="Generate a new report">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Data Source</label>
              <select className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none">
                <option>Student Attendance</option>
                <option>Staff Attendance</option>
                <option>Academic Performance</option>
                <option>Infrastructure Checklist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="date" className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none" />
                <input type="date" className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Output Format</label>
              <select className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none">
                <option>PDF Document</option>
                <option>Excel Spreadsheet (.xlsx)</option>
                <option>CSV Data (.csv)</option>
              </select>
            </div>
            <div className="pt-2">
              <button type="button" className="w-full h-10 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" /> Generate Report
              </button>
            </div>
          </form>
        </ChartCard>
      </div>
    </div>
  );
}
