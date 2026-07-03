"use client";

import React, { useState } from "react";
import { TrendingUp, Medal, AlertTriangle, BookOpen, Search, Filter, Download } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from "recharts";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusChip, ProgressBar } from "@/components/shared";
import { academicPerformances } from "@/lib/mock-data/operations";

const COLORS = ['#0d9488', '#2563eb', '#8b5cf6', '#eab308', '#ef4444'];

export default function PerformancePage() {
  const [examFilter, setExamFilter] = useState("First Quarterly Exam");
  const [classFilter, setClassFilter] = useState("10");

  const filteredData = academicPerformances.filter(
    (p) => p.examName === examFilter && p.className === classFilter
  );

  const topPerformers = [...filteredData].sort((a, b) => b.percentage - a.percentage).slice(0, 3);
  const interventionNeeded = [...filteredData].filter(p => p.percentage < 40).sort((a, b) => a.percentage - b.percentage);

  // Aggregate Subject Data
  const subjectAggregates: Record<string, { total: number; count: number; pass: number }> = {};
  filteredData.forEach(p => {
    p.subjects.forEach(sub => {
      if (!subjectAggregates[sub.subject]) {
        subjectAggregates[sub.subject] = { total: 0, count: 0, pass: 0 };
      }
      subjectAggregates[sub.subject].total += (sub.obtainedMarks / sub.maxMarks) * 100;
      subjectAggregates[sub.subject].count += 1;
      if (sub.status === "pass") subjectAggregates[sub.subject].pass += 1;
    });
  });

  const subjectChartData = Object.entries(subjectAggregates).map(([subject, data]) => ({
    subject,
    avgScore: Math.round(data.total / data.count),
    passRate: Math.round((data.pass / data.count) * 100)
  }));

  const gradeDistribution = [
    { name: 'A Grade (>80%)', value: filteredData.filter(p => p.percentage >= 80).length },
    { name: 'B Grade (60-79%)', value: filteredData.filter(p => p.percentage >= 60 && p.percentage < 80).length },
    { name: 'C Grade (40-59%)', value: filteredData.filter(p => p.percentage >= 40 && p.percentage < 60).length },
    { name: 'Need Help (<40%)', value: filteredData.filter(p => p.percentage < 40).length },
  ];

  const overallPassRate = Math.round((filteredData.filter(p => p.percentage >= 40).length / Math.max(filteredData.length, 1)) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Academic Performance</h1>
          <p className="text-sm text-surface-500 mt-0.5">Analyze exam results, subject trends, and student progress</p>
        </div>
        <div className="flex gap-2">
          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-white font-medium shadow-sm"
          >
            <option value="First Quarterly Exam">First Quarterly Exam</option>
            <option value="Half Yearly Exam">Half Yearly Exam</option>
          </select>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-white font-medium shadow-sm"
          >
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-surface-200 bg-white text-sm text-surface-700 hover:bg-surface-50">
            <Download className="h-4 w-4" /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Students Evaluated" value={filteredData.length.toString()} icon={BookOpen} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Overall Pass Rate" value={`${overallPassRate}%`} icon={TrendingUp} iconColor={overallPassRate >= 75 ? "text-success-600" : "text-warning-600"} iconBg={overallPassRate >= 75 ? "bg-success-50" : "bg-warning-50"} />
        <KPICard title="Top Performers (>80%)" value={gradeDistribution[0].value.toString()} icon={Medal} iconColor="text-teal-600" iconBg="bg-teal-50" />
        <KPICard title="Intervention Needed" value={interventionNeeded.length.toString()} icon={AlertTriangle} iconColor="text-danger-600" iconBg="bg-danger-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject Wise Performance */}
        <ChartCard title="Subject Wise Average Score" subtitle="Percentage scores by subject" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="avgScore" name="Average Score (%)" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Grade Distribution */}
        <ChartCard title="Grade Distribution" subtitle="Overall class performance">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <ChartCard title="Top Performers" subtitle="Students exceeding expectations" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Student</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Score</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {topPerformers.map((student, i) => (
                  <tr key={student.id} className="hover:bg-surface-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-surface-300 w-4">{i + 1}</span>
                        <div className="font-medium text-surface-900">{student.studentName}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-success-600">{student.percentage}%</td>
                    <td className="px-4 py-3 text-right"><span className="inline-flex px-2 py-0.5 rounded-full bg-success-50 text-success-700 font-bold text-xs">{student.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        {/* Intervention Needed */}
        <ChartCard title="Intervention Needed" subtitle="Students requiring academic support" noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Student</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Score</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Failed Subjects</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {interventionNeeded.map((student) => {
                  const failedSubjects = student.subjects.filter(s => s.status === 'fail').map(s => s.subject);
                  return (
                    <tr key={student.id} className="hover:bg-surface-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-surface-900">{student.studentName}</div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-danger-600">{student.percentage}%</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-wrap justify-end gap-1">
                          {failedSubjects.map((sub, idx) => (
                            <span key={idx} className="inline-flex px-1.5 py-0.5 rounded bg-danger-50 text-danger-600 text-[10px] font-medium uppercase tracking-wider">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {interventionNeeded.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-surface-500">
                      Great job! No students require critical intervention in this class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
