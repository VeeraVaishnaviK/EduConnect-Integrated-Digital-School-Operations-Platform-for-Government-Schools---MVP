"use client";

import React from "react";
import { ShieldCheck, MessageSquare, Award, CheckCircle2 } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";

const behaviorLogs = [
  { id: 1, date: "2026-06-18", teacher: "Mr. S. Rajendran", type: "merit", points: "+10", remarks: "Helped organize the library catalog system during free periods. Great initiative!" },
  { id: 2, date: "2026-06-25", teacher: "Mrs. K. Ranjitha", type: "merit", points: "+5", remarks: "Assisted classmates with difficult algebra formulas after school hours." },
];

export default function DisciplinaryPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Disciplinary Record</h1>
        <p className="text-sm text-surface-500 mt-0.5">Track classroom behavior logs, merit credits, and conduct summary</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Demerit Points" value="0" icon={ShieldCheck} iconColor="text-success-600" iconBg="bg-success-50" />
        <KPICard title="Total Merit Points" value="15" icon={Award} iconColor="text-teal-600" iconBg="bg-teal-50" />
        <KPICard title="Behavior Grade" value="A+ (Excellent)" icon={CheckCircle2} iconColor="text-primary-600" iconBg="bg-primary-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Behavior card */}
        <div className="lg:col-span-2">
          <ChartCard title="Merits & Recognition Log" subtitle="History of positive conduct entries">
            <div className="space-y-4">
              {behaviorLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl border border-surface-150 hover:bg-surface-50/30 transition-all flex items-start gap-4">
                  <div className="h-9 w-9 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {log.points}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xs font-semibold text-surface-400">Issued by {log.teacher}</span>
                      <span className="text-[10px] text-surface-400">{new Date(log.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    </div>
                    <p className="text-sm text-surface-700 leading-relaxed italic">
                      "{log.remarks}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Status card */}
        <div className="lg:col-span-1">
          <ChartCard title="Disciplinary Status">
            <div className="text-center p-6 space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-success-50 border border-success-100 flex items-center justify-center text-success-600 shadow-sm animate-pulse-subtle">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-surface-800">Clean Conduct Record</h3>
                <p className="text-xs text-surface-400 mt-1 leading-relaxed">
                  Congratulations! You have maintaining a perfect record with zero behavioral warnings, suspensions, or demerits. Keep setting a wonderful example for your peers.
                </p>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
