"use client";

import React, { useState } from "react";
import { Bell, Search, Filter, Plus, FileText, Download, ExternalLink } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { PriorityBadge } from "@/components/shared";
import { circulars } from "@/lib/mock-data/operations";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export default function CircularsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const filteredCirculars = circulars.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || !(c.readBy || []).includes(user?.id || "");
    return matchesSearch && matchesTab;
  });

  const unreadCount = circulars.filter(c => !(c.readBy || []).includes(user?.id || "")).length;
  const criticalCount = circulars.filter(c => c.priority === "critical" || c.priority === "high").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Circulars & Notices</h1>
          <p className="text-sm text-surface-500 mt-0.5">Official communications from the State and District</p>
        </div>
        {(user?.role === "state_admin" || user?.role === "ceo" || user?.role === "deo" || user?.role === "principal") && (
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
              <Plus className="h-4 w-4" /> Issue Circular
            </button>
          </div>
        )}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard title="Total Circulars (This Month)" value={circulars.length.toString()} icon={FileText} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Unread Notices" value={unreadCount.toString()} icon={Bell} iconColor="text-warning-600" iconBg="bg-warning-50" />
        <KPICard title="Critical Actions Required" value={criticalCount.toString()} icon={FileText} iconColor="text-danger-600" iconBg="bg-danger-50" />
      </div>

      {/* Main Content */}
      <ChartCard 
        title="" 
        noPadding 
        className="min-h-[500px]"
        action={
          <div className="flex items-center gap-3 px-4 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search circulars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 pl-9 pr-4 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none w-64"
              />
            </div>
          </div>
        }
      >
        <div className="border-b border-surface-200 mb-4 px-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative border-b-2",
                activeTab === "all" ? "text-primary-600 border-primary-600" : "text-surface-500 border-transparent hover:text-surface-700"
              )}
            >
              All Circulars
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative border-b-2",
                activeTab === "unread" ? "text-primary-600 border-primary-600" : "text-surface-500 border-transparent hover:text-surface-700"
              )}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center bg-danger-500 text-white text-[10px] font-bold h-4 min-w-4 px-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="divide-y divide-surface-100">
          {filteredCirculars.map((circular) => {
            const isUnread = !(circular.readBy || []).includes(user?.id || "");
            return (
              <div key={circular.id} className={cn("p-4 hover:bg-surface-50 transition-colors flex gap-4", isUnread && "bg-primary-50/30")}>
                <div className="flex-shrink-0 mt-1">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center border",
                    circular.priority === "critical" ? "bg-danger-50 border-danger-200 text-danger-600" :
                    circular.priority === "high" ? "bg-warning-50 border-warning-200 text-warning-600" :
                    "bg-primary-50 border-primary-100 text-primary-600"
                  )}>
                    <FileText className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                    <h3 className={cn("text-base font-semibold text-surface-900 flex items-center gap-2", isUnread && "font-bold text-primary-900")}>
                      {circular.title}
                      {isUnread && <span className="w-2 h-2 rounded-full bg-primary-600" />}
                    </h3>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-mono text-surface-500">{circular.id}</span>
                      <PriorityBadge priority={circular.priority} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-surface-500 mb-3">
                    <span>Issued By: <strong className="text-surface-700">{circular.issuedBy}</strong></span>
                    <span>•</span>
                    <span>Date: {circular.issuedDate}</span>
                    <span>•</span>
                    <span>Target: <span className="capitalize">{circular.targetAudience.map(t => t.replace('_', ' ')).join(', ')}</span></span>
                  </div>
                  <p className="text-sm text-surface-600 max-w-3xl line-clamp-2">{circular.content}</p>
                  
                  <div className="mt-4 flex items-center gap-3">
                    <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700">
                      <ExternalLink className="h-4 w-4" /> View Full Document
                    </button>
                    {circular.attachments && circular.attachments.length > 0 && (
                      <button className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-600 hover:text-surface-800">
                        <Download className="h-4 w-4" /> Download PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filteredCirculars.length === 0 && (
            <div className="py-12 text-center">
              <Bell className="h-10 w-10 text-surface-300 mx-auto mb-3" />
              <p className="text-surface-500 font-medium">No circulars found</p>
              <p className="text-sm text-surface-400 mt-1">You're all caught up with official communications.</p>
            </div>
          )}
        </div>
      </ChartCard>
    </div>
  );
}
