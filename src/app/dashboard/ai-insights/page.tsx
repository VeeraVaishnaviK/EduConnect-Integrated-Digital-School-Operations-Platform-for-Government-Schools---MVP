"use client";

import React, { useState } from "react";
import { Brain, TrendingDown, AlertTriangle, Lightbulb, Users, UserX, BookOpen, Clock, Target, ArrowRight } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusChip, QuickAction, PriorityBadge } from "@/components/shared";
import { aiInsights } from "@/lib/mock-data/operations";
import { students } from "@/lib/mock-data/people";

const riskDistribution = [
  { level: "High Risk", count: 12, percentage: 8, color: "bg-danger-500" },
  { level: "Medium Risk", count: 45, percentage: 32, color: "bg-warning-500" },
  { level: "Low Risk", count: 85, percentage: 60, color: "bg-success-500" },
];

export default function AIInsightsPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "dropout" | "academic" | "infrastructure">("all");

  const filteredInsights = aiInsights.filter(i => activeCategory === "all" || i.category === activeCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Insights Engine
          </h1>
          <p className="text-sm text-surface-500 mt-0.5">Predictive analytics and smart recommendations for proactive intervention</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wide">Last Updated</p>
          <p className="text-sm font-medium text-surface-900 mt-0.5 flex items-center justify-end gap-1.5">
            <Clock className="h-3.5 w-3.5 text-surface-400" />
            Today, 08:30 AM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Insights Generated" value="24" icon={Brain} iconColor="text-purple-600" iconBg="bg-purple-50" change={5} changeType="increase" changeLabel="this week" />
        <KPICard title="Critical Interventions" value="3" icon={AlertTriangle} iconColor="text-danger-600" iconBg="bg-danger-50" />
        <KPICard title="At-Risk Students" value="12" icon={UserX} iconColor="text-warning-600" iconBg="bg-warning-50" change={-2} changeType="decrease" />
        <KPICard title="Success Rate" value="84%" icon={Target} iconColor="text-success-600" iconBg="bg-success-50" change={4.5} changeType="increase" changeLabel="after intervention" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Insights Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All Insights" },
              { id: "dropout", label: "Dropout Risk" },
              { id: "academic", label: "Academic Performance" },
              { id: "infrastructure", label: "Infrastructure" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id 
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20" 
                    : "bg-white border border-surface-200 text-surface-600 hover:bg-surface-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredInsights.map((insight) => (
              <div 
                key={insight.id} 
                className={`bg-white rounded-xl border p-5 transition-all ${
                  insight.severity === "critical" ? "border-danger-200 shadow-sm shadow-danger-100" :
                  insight.severity === "high" ? "border-warning-200 shadow-sm shadow-warning-100" :
                  "border-surface-200 hover:border-surface-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl flex-shrink-0 mt-1 ${
                    insight.category === "dropout" ? "bg-danger-50" :
                    insight.category === "academic" ? "bg-info-50" : "bg-purple-50"
                  }`}>
                    {insight.category === "dropout" ? <UserX className="h-6 w-6 text-danger-600" /> :
                     insight.category === "academic" ? <BookOpen className="h-6 w-6 text-info-600" /> :
                     <Lightbulb className="h-6 w-6 text-purple-600" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h3 className="text-base font-semibold text-surface-900">{insight.title}</h3>
                      <PriorityBadge priority={insight.severity} />
                    </div>
                    <p className="text-sm text-surface-600 mb-4 leading-relaxed">{insight.description}</p>
                    
                    <div className="bg-surface-50 rounded-lg p-3 border border-surface-100">
                      <p className="text-xs font-semibold text-surface-700 mb-2 uppercase tracking-wide">Recommended Actions:</p>
                      <ul className="space-y-2">
                        {insight.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-surface-700">
                            <ArrowRight className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button className="h-9 px-4 rounded-lg bg-surface-900 text-white text-sm font-medium hover:bg-surface-800 transition-colors">
                        Take Action
                      </button>
                      <button className="h-9 px-4 rounded-lg border border-surface-200 text-surface-700 text-sm font-medium hover:bg-surface-50 transition-colors">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <ChartCard title="Dropout Risk Distribution" subtitle="Based on attendance & performance">
            <div className="space-y-4">
              {riskDistribution.map((risk, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-surface-700">{risk.level}</span>
                    <span className="text-sm font-bold text-surface-900">{risk.count} students</span>
                  </div>
                  <div className="w-full bg-surface-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${risk.color}`} style={{ width: `${risk.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-surface-100">
              <button className="w-full h-9 rounded-lg border border-surface-200 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                View High Risk Students
              </button>
            </div>
          </ChartCard>

          <ChartCard title="AI Model Status" subtitle="System health & accuracy">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
                <span className="text-sm text-surface-600">Prediction Accuracy</span>
                <span className="text-sm font-bold text-success-600">92.4%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
                <span className="text-sm text-surface-600">Data Processed</span>
                <span className="text-sm font-bold text-surface-900">45,210 points</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
                <span className="text-sm text-surface-600">Last Trained</span>
                <span className="text-sm font-medium text-surface-900">2 days ago</span>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
