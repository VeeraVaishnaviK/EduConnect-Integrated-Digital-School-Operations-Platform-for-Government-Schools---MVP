"use client";

import React, { useState } from "react";
import { Search, Filter, ShieldAlert, Activity, CheckCircle2, XCircle, Download } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";

const auditLogs = [
  { id: "LOG001", timestamp: "2026-07-03 10:42:15", user: "S. Murugan", role: "CEO", action: "Updated Role Permissions", module: "Security", status: "success", ip: "117.218.45.12" },
  { id: "LOG002", timestamp: "2026-07-03 10:15:00", user: "T. Selvi", role: "Principal", action: "Approved Leave Request (LR001)", module: "Leave Management", status: "success", ip: "117.218.45.22" },
  { id: "LOG003", timestamp: "2026-07-03 09:30:11", user: "Unknown", role: "Guest", action: "Failed Login Attempt (Invalid Password)", module: "Authentication", status: "failure", ip: "192.168.1.105" },
  { id: "LOG004", timestamp: "2026-07-02 16:20:45", user: "K. Rajan", role: "State Admin", action: "Generated Infrastructure Report", module: "Reports", status: "success", ip: "117.218.12.9" },
  { id: "LOG005", timestamp: "2026-07-02 14:10:33", user: "P. Karthik", role: "Teacher", action: "Deleted Attendance Record (Class 10-A)", module: "Attendance", status: "success", ip: "117.218.45.55" },
  { id: "LOG006", timestamp: "2026-07-02 09:05:12", user: "M. Deepa", role: "BEO", action: "Created New User (USR008)", module: "User Management", status: "success", ip: "117.218.33.11" },
];

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Audit Logs</h1>
          <p className="text-sm text-surface-500 mt-0.5">System-wide activity monitoring for compliance and security</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-surface-200 bg-white text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <ChartCard 
        title="Activity Log" 
        subtitle="Immutable record of system events"
        noPadding 
        className="min-h-[500px]"
        action={
          <div className="flex items-center gap-3 px-4 pt-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search events or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-surface-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50"
              >
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="failure">Failure (Warnings)</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-y border-surface-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider w-40">Timestamp</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">User & Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Action Details</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider w-32">IP Address</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider w-24">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 font-mono text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-50 transition-colors">
                  <td className="px-4 py-3 text-surface-500">{log.timestamp}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-surface-900 font-sans">{log.user}</div>
                    <div className="text-surface-500 font-sans text-xs">{log.role}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-surface-800 break-words font-sans">{log.action}</div>
                    <div className="text-surface-400 uppercase tracking-wider text-[10px] mt-1">{log.module} Module</div>
                  </td>
                  <td className="px-4 py-3 text-surface-500">{log.ip}</td>
                  <td className="px-4 py-3 text-right">
                    {log.status === "success" ? (
                      <span className="inline-flex items-center gap-1 text-success-600 font-medium font-sans bg-success-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="h-3 w-3" /> OK
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-danger-600 font-medium font-sans bg-danger-50 px-2 py-0.5 rounded">
                        <XCircle className="h-3 w-3" /> Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-surface-500 font-sans">
                    No audit records match the current filters.
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
