"use client";

import React from "react";
import { cn, getStatusColor, getPriorityColor } from "@/lib/utils";
import { LucideIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
export { ComingSoon } from "./ComingSoon";

// --- Status Chip ---
interface StatusChipProps {
  status: string;
  label?: string;
  size?: "sm" | "md";
}

export function StatusChip({ status, label, size = "sm" }: StatusChipProps) {
  const displayLabel = label || status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium capitalize",
        getStatusColor(status),
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      <span
        className={cn(
          "rounded-full mr-1.5",
          size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
          status === "present" || status === "approved" || status === "compliant" || status === "completed" || status === "pass"
            ? "bg-emerald-500"
            : status === "absent" || status === "rejected" || status === "non_compliant" || status === "overdue" || status === "fail"
            ? "bg-red-500"
            : status === "pending" || status === "late" || status === "partial" || status === "in_progress"
            ? "bg-amber-500"
            : "bg-gray-400"
        )}
      />
      {displayLabel}
    </span>
  );
}

// --- Priority Badge ---
interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        getPriorityColor(priority)
      )}
    >
      {priority}
    </span>
  );
}

// --- Quick Action Button ---
interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  href: string;
  color?: string;
  iconBg?: string;
  description?: string;
}

export function QuickAction({
  icon: Icon,
  label,
  href,
  color = "text-primary-600",
  iconBg = "bg-primary-50",
  description,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg border border-surface-200 hover:bg-surface-50 hover:border-surface-300 transition-all group"
    >
      <div className={cn("rounded-lg p-2", iconBg)}>
        <Icon className={cn("h-4 w-4", color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-surface-800 group-hover:text-primary-600 transition-colors">
          {label}
        </p>
        {description && (
          <p className="text-xs text-surface-400 mt-0.5">{description}</p>
        )}
      </div>
      <ExternalLink className="h-3.5 w-3.5 text-surface-300 group-hover:text-surface-500 transition-colors" />
    </Link>
  );
}

// --- Empty State ---
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-surface-100 p-4 mb-4">
        <Icon className="h-8 w-8 text-surface-400" />
      </div>
      <h3 className="text-base font-semibold text-surface-700 mb-1">{title}</h3>
      <p className="text-sm text-surface-500 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// --- Progress Bar ---
interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color = "bg-teal-600",
  showLabel = true,
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full bg-surface-100 rounded-full overflow-hidden", heights[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-surface-500">
            {value}/{max}
          </span>
          <span className="text-xs font-medium text-surface-700">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
}

// --- Notification Dot ---
export function NotificationDot({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] font-bold text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}
