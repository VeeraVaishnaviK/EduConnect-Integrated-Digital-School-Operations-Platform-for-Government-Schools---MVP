"use client";

import React from "react";
import { cn, formatDateTime } from "@/lib/utils";
import { ActivityItem } from "@/lib/types";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Clock,
} from "lucide-react";

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
  className?: string;
}

const typeConfig = {
  success: { icon: CheckCircle2, color: "text-success-500", bg: "bg-success-50" },
  warning: { icon: AlertTriangle, color: "text-warning-500", bg: "bg-warning-50" },
  error: { icon: AlertCircle, color: "text-danger-500", bg: "bg-danger-50" },
  info: { icon: Info, color: "text-info-500", bg: "bg-info-50" },
};

export function ActivityFeed({
  activities,
  maxItems = 8,
  className,
}: ActivityFeedProps) {
  const items = activities.slice(0, maxItems);

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item, index) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;
        return (
          <div
            key={item.id}
            className={cn(
              "flex gap-3 py-3 px-3 rounded-lg hover:bg-surface-50 transition-colors",
              index < items.length - 1 && "border-b border-surface-100"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 rounded-full p-1.5 mt-0.5",
                config.bg
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", config.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-surface-800 font-medium leading-snug">
                {item.action}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-surface-500">{item.actor}</span>
                {item.details && (
                  <>
                    <span className="text-surface-300">·</span>
                    <span className="text-xs text-surface-400">{item.details}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3 text-surface-400" />
                <span className="text-[11px] text-surface-400">
                  {formatDateTime(item.timestamp)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      {items.length === 0 && (
        <div className="text-center py-8 text-surface-400 text-sm">
          No recent activities
        </div>
      )}
    </div>
  );
}
