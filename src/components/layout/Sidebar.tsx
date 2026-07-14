"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getRoleShortName } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  CalendarDays,
  BarChart3,
  FileText,
  Brain,
  Bell,
  Building2,
  Settings,
  Shield,
  ScrollText,
  BookOpen,
  UserCheck,
  LogOut,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  School,
  LucideIcon,
  MessageSquare,
  UserPlus,
  CreditCard,
  ShieldAlert,
  Award,
  User,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  roles: UserRole[];
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["state_admin", "directorate", "ceo", "deo", "beo", "principal", "teacher", "parent", "student"] },
  { label: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, roles: ["principal", "teacher", "parent", "student", "beo", "deo", "ceo", "state_admin"] },
  { label: "Leave Management", href: "/dashboard/leave", icon: CalendarDays, badge: 3, roles: ["principal", "teacher", "parent", "student", "beo", "deo"] },
  { label: "Performance", href: "/dashboard/performance", icon: BarChart3, roles: ["principal", "teacher", "parent", "student", "deo", "ceo", "state_admin"] },
  { label: "Reports", href: "/dashboard/reports", icon: FileText, roles: ["principal", "teacher", "deo", "beo", "ceo", "state_admin"] },
  { label: "AI Insights", href: "/dashboard/ai-insights", icon: Brain, roles: ["principal", "teacher", "deo", "beo", "ceo", "state_admin"] },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 5, roles: ["principal", "teacher", "parent", "student", "deo", "beo", "ceo", "state_admin"] },
  { label: "School Profile", href: "/dashboard/school-profile", icon: Building2, roles: ["principal", "teacher", "beo", "deo", "ceo"] },
  { label: "Students", href: "/dashboard/students", icon: GraduationCap, roles: ["principal", "teacher"] },
  { label: "Teachers", href: "/dashboard/teachers", icon: BookOpen, roles: ["principal", "beo", "deo", "ceo"] },
  { label: "User Management", href: "/dashboard/users", icon: Users, roles: ["principal", "deo", "ceo", "state_admin"] },
  { label: "Role Management", href: "/dashboard/roles", icon: Shield, roles: ["state_admin", "ceo"] },
  { label: "Circulars", href: "/dashboard/circulars", icon: ScrollText, roles: ["principal", "teacher", "parent", "student", "beo", "deo", "ceo", "state_admin"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["principal", "teacher", "parent", "student", "deo", "beo", "ceo", "state_admin"] },
  { label: "Audit Logs", href: "/dashboard/audit", icon: UserCheck, roles: ["principal", "deo", "ceo", "state_admin"] },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  let filteredNav = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  if (user?.role === "student") {
    filteredNav = [
      { label: "Home", href: "/dashboard", icon: LayoutDashboard, roles: ["student"] },
      { label: "My Course", href: "/dashboard/my-course", icon: BookOpen, roles: ["student"] },
      { label: "My Course Feedback", href: "/dashboard/my-course-feedback", icon: MessageSquare, roles: ["student"] },
      { label: "Enrollmentnew", href: "/dashboard/enrollmentnew", icon: UserPlus, roles: ["student"] },
      { label: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, roles: ["student"] },
      { label: "Assignment", href: "/dashboard/assignment", icon: FileText, roles: ["student"] },
      { label: "Examination", href: "/dashboard/examination", icon: GraduationCap, roles: ["student"] },
      { label: "Disciplinary", href: "/dashboard/disciplinary", icon: ShieldAlert, roles: ["student"] },
      { label: "Raise Infra Issue", href: "/dashboard/raise-infra-issue", icon: Building2, roles: ["student"] },
      { label: "My Profile", href: "/dashboard/my-profile", icon: User, roles: ["student"] },
    ];
  } else if (user?.role === "parent") {
    filteredNav = [
      { label: "Circulars", href: "/dashboard/circulars", icon: ScrollText, roles: ["parent"] },
      { label: "Student Performance", href: "/dashboard/performance", icon: BarChart3, roles: ["parent"] },
      { label: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, roles: ["parent"] },
      { label: "Disciplinary", href: "/dashboard/disciplinary", icon: ShieldAlert, roles: ["parent"] },
    ];
  }

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((i) => i !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col bg-gradient-to-b from-primary-600 to-primary-900 text-white transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10 flex-shrink-0">
        <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500 text-white font-bold text-sm">
          EC
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold tracking-tight leading-tight">
              EduConnect
            </h1>
            <p className="text-[10px] text-white/60 leading-tight">
              Kanyakumari District
            </p>
          </div>
        )}
      </div>

      {/* Role Badge */}
      {!collapsed && user && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-white/10 border border-white/10">
          <p className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
            Logged in as
          </p>
          <p className="text-xs font-semibold text-white mt-0.5">
            {getRoleShortName(user.role)}
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.label);

          return (
            <div key={item.label}>
              <Link
                href={hasChildren ? "#" : item.href}
                onClick={hasChildren ? (e) => { e.preventDefault(); toggleExpand(item.label); } : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-teal-500/20 text-teal-300 border-l-2 border-teal-400"
                    : "text-white/70 hover:bg-white/10 hover:text-white border-l-2 border-transparent",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn("flex-shrink-0", active ? "text-teal-400" : "text-white/50", collapsed ? "h-5 w-5" : "h-4.5 w-4.5")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white px-1.5">
                        {item.badge}
                      </span>
                    )}
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    )}
                  </>
                )}
              </Link>

              {/* Children */}
              {hasChildren && isExpanded && !collapsed && (
                <div className="ml-6 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
                  {item.children?.map((child) => {
                    const ChildIcon = child.icon;
                    const childActive = isActive(child.href);
                    return (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium transition-colors",
                          childActive
                            ? "text-teal-300 bg-teal-500/10"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <ChildIcon className="h-3.5 w-3.5" />
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="flex-shrink-0 border-t border-white/10 p-2">
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-white/40 hover:text-white/70 transition-colors mt-1",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
