"use client";

import React, { useState } from "react";
import { Calendar, Download, Award, ShieldAlert, CheckCircle } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ProgressBar } from "@/components/shared";

const examSchedule = [
  { subject: "Tamil", date: "2026-09-14", time: "10:00 AM - 01:00 PM", portion: "Chapters 1 to 5, Grammar Section A" },
  { subject: "English", date: "2026-09-15", time: "10:00 AM - 01:00 PM", portion: "Prose Chapters 1-4, Grammar & Essay Writing" },
  { subject: "Mathematics", date: "2026-09-16", time: "10:00 AM - 01:00 PM", portion: "Algebra, Trigonometry, Geometry, Arithmetic Progressions" },
  { subject: "Science", date: "2026-09-17", time: "10:00 AM - 01:00 PM", portion: "Physics Chapters 1-3, Chemistry 1-2, Biology 1-3" },
  { subject: "Social Science", date: "2026-09-18", time: "10:00 AM - 01:00 PM", portion: "History (Ch 1-2), Geography (Ch 1-3), Civics & Economics" },
];

const pastResults = [
  { subject: "Tamil", obtained: 78, max: 100, grade: "B+" },
  { subject: "English", obtained: 65, max: 100, grade: "B" },
  { subject: "Mathematics", obtained: 45, max: 100, grade: "C" },
  { subject: "Science", obtained: 72, max: 100, grade: "B" },
  { subject: "Social Science", obtained: 81, max: 100, grade: "A" },
];

export default function ExaminationPage() {
  const [activeTab, setActiveTab] = useState<"schedule" | "ticket" | "results">("schedule");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Examinations</h1>
        <p className="text-sm text-surface-500 mt-0.5">View exam timetables, download hall tickets, and check past reports</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-surface-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("schedule")}
            className={`pb-3 text-sm font-semibold transition-colors relative border-b-2 ${
              activeTab === "schedule" ? "text-teal-600 border-teal-600" : "text-surface-500 border-transparent hover:text-surface-700"
            }`}
          >
            Exam Schedule
          </button>
          <button
            onClick={() => setActiveTab("ticket")}
            className={`pb-3 text-sm font-semibold transition-colors relative border-b-2 ${
              activeTab === "ticket" ? "text-teal-600 border-teal-600" : "text-surface-500 border-transparent hover:text-surface-700"
            }`}
          >
            Hall Ticket
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={`pb-3 text-sm font-semibold transition-colors relative border-b-2 ${
              activeTab === "results" ? "text-teal-600 border-teal-600" : "text-surface-500 border-transparent hover:text-surface-700"
            }`}
          >
            Report Card
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === "schedule" && (
        <div className="space-y-4">
          <ChartCard title="First Terminal Examinations (September 2026)" subtitle="Class 10 Board Prep Series">
            <div className="divide-y divide-surface-100">
              {examSchedule.map((exam) => (
                <div key={exam.subject} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-surface-800">{exam.subject}</h3>
                    <p className="text-xs text-surface-400">Portions: {exam.portion}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-surface-600 md:text-right">
                    <div className="flex items-center gap-1.5 bg-surface-50 border border-surface-200 p-2 rounded-lg">
                      <Calendar className="h-3.5 w-3.5 text-teal-600" />
                      <div>
                        <p className="font-bold text-surface-800">{new Date(exam.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                        <p className="text-[10px] text-surface-400">{exam.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      )}

      {activeTab === "ticket" && (
        <div className="max-w-xl mx-auto">
          <ChartCard title="Download Hall Ticket" subtitle="Admit card verification details">
            <div className="space-y-6 pt-2">
              <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                <h3 className="text-sm font-bold tracking-widest uppercase opacity-80">Tamil Nadu School Education Department</h3>
                <h2 className="text-xl font-bold mt-1">HALL TICKET</h2>
                <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="opacity-60 block">Student Name</span>
                    <span className="font-bold text-sm">Arun Kumar S</span>
                  </div>
                  <div>
                    <span className="opacity-60 block">Exam Roll No</span>
                    <span className="font-bold text-sm">10260109</span>
                  </div>
                  <div>
                    <span className="opacity-60 block">Class &amp; Sec</span>
                    <span className="font-bold text-sm">Class 10 - A</span>
                  </div>
                  <div>
                    <span className="opacity-60 block">Center Code</span>
                    <span className="font-bold text-sm">GHSS Nagercoil (001)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-surface-50 border border-surface-200 text-xs text-surface-500 leading-relaxed">
                <p className="font-semibold text-surface-700 mb-1">Important instructions:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Candidates must carry a physical printout of this Hall Ticket.</li>
                  <li>Report at the examination center 30 minutes before the start time.</li>
                  <li>Calculators or mobile phones are strictly prohibited.</li>
                </ul>
              </div>

              <button className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-teal-600 font-semibold text-sm text-white hover:bg-teal-700 transition-colors">
                <Download className="h-4 w-4" /> Download PDF Admit Card
              </button>
            </div>
          </ChartCard>
        </div>
      )}

      {activeTab === "results" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Report Card - First Quarterly Exam" subtitle="Overall Score: 68.2%">
              <div className="space-y-4">
                {pastResults.map((result) => (
                  <div key={result.subject} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-surface-700">{result.subject}</span>
                      <span className="font-bold text-surface-600">Grade: {result.grade} • {result.obtained}/{result.max}</span>
                    </div>
                    <ProgressBar
                      value={result.obtained}
                      max={result.max}
                      color={result.obtained >= 75 ? "bg-success-500" : result.obtained >= 50 ? "bg-teal-500" : "bg-danger-500"}
                      showLabel={false}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard title="Academic Performance Analytics">
              <div className="p-4 rounded-xl bg-teal-50/20 border border-teal-100 flex flex-col justify-center h-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-teal-100 text-teal-700">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-surface-800">Succeeding Subject</h4>
                    <p className="text-xs text-surface-500 mt-0.5">Social Science (81%) — keep up the fantastic writing!</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-surface-800">Support Needed</h4>
                    <p className="text-xs text-surface-500 mt-0.5">Mathematics (45%) — recommend registering for extra help classes.</p>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      )}
    </div>
  );
}
