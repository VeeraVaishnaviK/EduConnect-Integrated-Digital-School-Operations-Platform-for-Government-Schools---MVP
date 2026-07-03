"use client";

import React, { useState } from "react";
import { CalendarDays, Filter, Plus, Search, CheckCircle2, XCircle, Clock } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusChip } from "@/components/shared";
import { leaveRequests } from "@/lib/mock-data/operations";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export default function LeaveManagementPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"my_leaves" | "requests">("my_leaves");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter leaves based on role and tab
  const displayedLeaves = leaveRequests.filter((leave) => {
    if (statusFilter !== "all" && leave.status !== statusFilter) return false;
    
    if (activeTab === "my_leaves") {
      // In a real app, this would match user.id, but for mock we'll show a sample
      return leave.applicantRole === user?.role || leave.applicantId === user?.id;
    } else {
      // For the "Requests" tab, show pending approvals for admins/principals
      return leave.status === "pending" || leave.status === "approved" || leave.status === "rejected";
    }
  });

  const pendingCount = leaveRequests.filter(l => l.status === "pending").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Leave Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">Track balances and manage leave applications</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            <Plus className="h-4 w-4" /> Apply Leave
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Casual Leave (CL)" value="8" unit="/ 12" icon={CalendarDays} iconColor="text-teal-600" iconBg="bg-teal-50" />
        <KPICard title="Medical Leave (ML)" value="15" unit="/ 15" icon={CalendarDays} iconColor="text-info-600" iconBg="bg-info-50" />
        <KPICard title="Earned Leave (EL)" value="24" icon={CalendarDays} iconColor="text-purple-600" iconBg="bg-purple-50" />
        {(user?.role === "principal" || user?.role === "ceo" || user?.role === "deo") && (
          <KPICard title="Pending Approvals" value={pendingCount.toString()} icon={Clock} iconColor="text-warning-600" iconBg="bg-warning-50" />
        )}
      </div>

      {/* Main Content */}
      <ChartCard 
        title="" 
        noPadding 
        className="min-h-[500px]"
        action={
          <div className="flex items-center gap-4 px-4 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 pl-9 pr-4 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none w-64"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-surface-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="border-b border-surface-200 mb-4 px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("my_leaves")}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative border-b-2",
                activeTab === "my_leaves" ? "text-primary-600 border-primary-600" : "text-surface-500 border-transparent hover:text-surface-700"
              )}
            >
              My Leaves
            </button>
            {(user?.role === "principal" || user?.role === "ceo" || user?.role === "deo" || user?.role === "beo") && (
              <button
                onClick={() => setActiveTab("requests")}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors relative border-b-2",
                  activeTab === "requests" ? "text-primary-600 border-primary-600" : "text-surface-500 border-transparent hover:text-surface-700"
                )}
              >
                Team Requests
                {pendingCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center bg-danger-500 text-white text-[10px] font-bold h-4 min-w-4 px-1 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-y border-surface-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Applicant</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Leave Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Duration</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Reason</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                {activeTab === "requests" && <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {displayedLeaves.map((leave) => (
                <tr key={leave.id} className="border-b border-surface-100 hover:bg-surface-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-surface-800">{leave.applicantName}</p>
                    <p className="text-xs text-surface-500 capitalize">{leave.applicantRole.replace('_', ' ')}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex px-2 py-1 rounded bg-surface-100 text-xs font-medium text-surface-700 capitalize">
                      {leave.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-surface-800">{leave.startDate} to {leave.endDate}</p>
                    <p className="text-xs text-surface-500">{leave.days} Day{leave.days > 1 ? 's' : ''}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-surface-600 line-clamp-1 max-w-xs" title={leave.reason}>{leave.reason}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={leave.status} />
                  </td>
                  {activeTab === "requests" && (
                    <td className="px-4 py-3 text-right">
                      {leave.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <button className="p-1.5 rounded bg-success-50 text-success-600 hover:bg-success-100 transition-colors" title="Approve">
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 rounded bg-danger-50 text-danger-600 hover:bg-danger-100 transition-colors" title="Reject">
                            <XCircle className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-surface-400">Processed</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {displayedLeaves.length === 0 && (
                <tr>
                  <td colSpan={activeTab === "requests" ? 6 : 5} className="px-4 py-8 text-center text-surface-500">
                    No leave records found.
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
