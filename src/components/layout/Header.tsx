"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn, getGreeting, getRoleName, getInitials } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";
import { notifications } from "@/lib/mock-data/operations";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  UserCog,
  X,
} from "lucide-react";

const roleOptions: { role: UserRole; label: string }[] = [
  { role: "state_admin", label: "State Admin" },
  { role: "ceo", label: "CEO" },
  { role: "deo", label: "DEO" },
  { role: "beo", label: "BEO" },
  { role: "principal", label: "Principal" },
  { role: "teacher", label: "Teacher" },
  { role: "parent", label: "Parent" },
  { role: "student", label: "Student" },
];

export function Header() {
  const { user, switchRole, logout } = useAuth();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setShowRoleSwitcher(false);
    router.push("/dashboard");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-surface-200 bg-white px-6">
      {/* Greeting */}
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-semibold text-surface-900 truncate">
          {getGreeting()}, {user?.name?.split(" ")[0] || "User"}
        </h2>
        <p className="text-xs text-surface-500">
          {user?.designation} • {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center">
        {showSearch ? (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search students, teachers, schools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-72 rounded-lg border border-surface-200 bg-surface-50 pl-9 pr-8 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              autoFocus
            />
            <button
              onClick={() => { setShowSearch(false); setSearchQuery(""); }}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-surface-400 hover:text-surface-600" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center gap-2 h-9 px-3 rounded-lg border border-surface-200 bg-surface-50 text-sm text-surface-400 hover:border-surface-300 hover:text-surface-600 transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search...</span>
            <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-surface-200 bg-white px-1.5 text-[10px] font-medium text-surface-400">
              ⌘K
            </kbd>
          </button>
        )}
      </div>

      {/* Role Switcher (Demo) */}
      <div className="relative">
        <button
          onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
          className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-dashed border-teal-300 bg-teal-50 text-xs font-medium text-teal-700 hover:bg-teal-100 transition-colors"
        >
          <UserCog className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Demo</span>
          <ChevronDown className="h-3 w-3" />
        </button>
        {showRoleSwitcher && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowRoleSwitcher(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-surface-200 bg-white shadow-lg z-50 py-1">
              <div className="px-3 py-2 border-b border-surface-100">
                <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Switch Demo Role</p>
              </div>
              {roleOptions.map((opt) => (
                <button
                  key={opt.role}
                  onClick={() => handleRoleSwitch(opt.role)}
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm hover:bg-surface-50 transition-colors flex items-center justify-between",
                    user?.role === opt.role && "bg-teal-50 text-teal-700 font-medium"
                  )}
                >
                  <span>{opt.label}</span>
                  {user?.role === opt.role && (
                    <span className="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">Active</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex items-center justify-center h-9 w-9 rounded-lg border border-surface-200 hover:bg-surface-50 transition-colors"
        >
          <Bell className="h-4.5 w-4.5 text-surface-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white px-1">
              {unreadCount}
            </span>
          )}
        </button>
        {showNotifications && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-surface-200 bg-white shadow-lg z-50 max-h-96 overflow-hidden">
              <div className="px-4 py-3 border-b border-surface-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-surface-900">Notifications</h3>
                <span className="text-xs text-teal-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="overflow-y-auto max-h-72">
                {notifications.slice(0, 6).map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "px-4 py-3 border-b border-surface-50 hover:bg-surface-50 cursor-pointer transition-colors",
                      !n.isRead && "bg-primary-50/30"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {!n.isRead && <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" />}
                      <div>
                        <p className={cn("text-sm", !n.isRead ? "font-semibold text-surface-900" : "text-surface-700")}>
                          {n.title}
                        </p>
                        <p className="text-xs text-surface-500 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-surface-400 mt-1">
                          {new Date(n.sentAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-surface-100 text-center">
                <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                  View All Notifications
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 hover:bg-surface-50 rounded-lg px-2 py-1.5 transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
            {getInitials(user?.name || "U")}
          </div>
          {!showSearch && (
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-surface-900 leading-tight truncate max-w-[120px]">
                {user?.name?.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="text-[10px] text-surface-400">{getRoleName(user?.role || "")}</p>
            </div>
          )}
          <ChevronDown className="h-3.5 w-3.5 text-surface-400 hidden md:block" />
        </button>
        {showUserMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-surface-200 bg-white shadow-lg z-50 py-1">
              <div className="px-3 py-2.5 border-b border-surface-100">
                <p className="text-sm font-semibold text-surface-900">{user?.name}</p>
                <p className="text-xs text-surface-500">{user?.email}</p>
              </div>
              <button className="w-full text-left px-3 py-2 text-sm text-surface-700 hover:bg-surface-50 flex items-center gap-2">
                <User className="h-4 w-4 text-surface-400" />
                My Profile
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-surface-700 hover:bg-surface-50 flex items-center gap-2">
                <Settings className="h-4 w-4 text-surface-400" />
                Settings
              </button>
              <div className="border-t border-surface-100 mt-1 pt-1">
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm text-danger-500 hover:bg-danger-50 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
