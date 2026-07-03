"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, MessageSquare, AlertTriangle, Settings, Trash2 } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { cn } from "@/lib/utils";

const mockNotifications = [
  { id: "NOT001", type: "alert", title: "Attendance Not Marked", message: "Class 10-A attendance has not been marked for today. Please update immediately.", time: "10 mins ago", isRead: false },
  { id: "NOT002", type: "message", title: "New Leave Request", message: "Mrs. K. Ranjitha has requested Casual Leave for 2 days.", time: "1 hour ago", isRead: false },
  { id: "NOT003", type: "system", title: "System Update Scheduled", message: "EduConnect platform will undergo maintenance on Saturday at 11:00 PM.", time: "3 hours ago", isRead: true },
  { id: "NOT004", type: "alert", title: "Compliance Warning", message: "Fire safety audit report is overdue by 3 days. Please submit the compliance form.", time: "Yesterday", isRead: true },
  { id: "NOT005", type: "message", title: "Parent Communication", message: "Message from Arun Kumar's parent regarding upcoming medical leave.", time: "Yesterday", isRead: true },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const displayedNotifications = notifications.filter(n => activeTab === "all" || !n.isRead);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Notifications</h1>
          <p className="text-sm text-surface-500 mt-0.5">Stay updated with alerts, messages, and system notices</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-surface-200 bg-white text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">
            <Settings className="h-4 w-4" /> Preferences
          </button>
        </div>
      </div>

      <ChartCard title="" noPadding className="min-h-[500px]">
        <div className="border-b border-surface-200 px-4 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative border-b-2",
                activeTab === "all" ? "text-primary-600 border-primary-600" : "text-surface-500 border-transparent hover:text-surface-700"
              )}
            >
              All Notifications
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
          <button 
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="pb-3 text-sm font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark all as read
          </button>
        </div>

        <div className="divide-y divide-surface-100">
          {displayedNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={cn(
                "p-4 hover:bg-surface-50 transition-colors flex gap-4 group cursor-pointer", 
                !notification.isRead ? "bg-primary-50/20" : ""
              )}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex-shrink-0 mt-1">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  notification.type === "alert" ? "bg-danger-100 text-danger-600" :
                  notification.type === "message" ? "bg-info-100 text-info-600" :
                  "bg-surface-100 text-surface-600"
                )}>
                  {notification.type === "alert" && <AlertTriangle className="h-5 w-5" />}
                  {notification.type === "message" && <MessageSquare className="h-5 w-5" />}
                  {notification.type === "system" && <Bell className="h-5 w-5" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <p className={cn("text-sm", !notification.isRead ? "font-semibold text-surface-900" : "font-medium text-surface-700")}>
                    {notification.title}
                  </p>
                  <span className="text-xs text-surface-400 whitespace-nowrap">{notification.time}</span>
                </div>
                <p className={cn("text-sm mt-0.5", !notification.isRead ? "text-surface-800" : "text-surface-500")}>
                  {notification.message}
                </p>
                {!notification.isRead && (
                  <div className="mt-3 flex gap-2">
                    <button className="text-xs font-medium px-3 py-1.5 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors">
                      View Details
                    </button>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                  className="p-2 text-surface-400 hover:text-danger-600 hover:bg-danger-50 rounded-full transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {displayedNotifications.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-success-500" />
              </div>
              <p className="text-surface-800 font-medium text-lg">You're all caught up!</p>
              <p className="text-sm text-surface-500 mt-1">No new notifications to show.</p>
            </div>
          )}
        </div>
      </ChartCard>
    </div>
  );
}
