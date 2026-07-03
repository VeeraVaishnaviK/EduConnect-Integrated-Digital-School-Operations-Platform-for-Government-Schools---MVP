"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  LucideIcon,
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  unit?: string;
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary-600",
  iconBg = "bg-primary-50",
  unit,
  className,
}: KPICardProps) {
  const trendIcon =
    changeType === "increase"
      ? TrendingUp
      : changeType === "decrease"
      ? TrendingDown
      : Minus;
  const TrendIcon = trendIcon;

  const trendColor =
    changeType === "increase"
      ? "text-success-500"
      : changeType === "decrease"
      ? "text-danger-500"
      : "text-surface-400";

  const trendBg =
    changeType === "increase"
      ? "bg-success-50"
      : changeType === "decrease"
      ? "bg-danger-50"
      : "bg-surface-100";

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-surface-200 p-5 card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-surface-500 truncate">{title}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <p className="text-2xl font-bold text-surface-900 tracking-tight">
              {value}
            </p>
            {unit && (
              <span className="text-sm font-medium text-surface-400">{unit}</span>
            )}
          </div>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                  trendBg,
                  trendColor
                )}
              >
                <TrendIcon className="h-3 w-3" />
                {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-surface-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex-shrink-0 rounded-lg p-2.5",
            iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
    </div>
  );
}

interface MiniKPIProps {
  label: string;
  value: string | number;
  color?: string;
}

export function MiniKPI({ label, value, color = "text-surface-900" }: MiniKPIProps) {
  return (
    <div className="text-center">
      <p className={cn("text-xl font-bold", color)}>{value}</p>
      <p className="text-xs text-surface-500 mt-0.5">{label}</p>
    </div>
  );
}
