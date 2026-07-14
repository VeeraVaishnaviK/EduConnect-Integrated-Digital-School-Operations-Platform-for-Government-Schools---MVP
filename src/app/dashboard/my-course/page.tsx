"use client";

import React from "react";
import { BookOpen, User, FileText, Download } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { ProgressBar } from "@/components/shared";

const courses = [
  { id: "TAM", name: "Tamil", code: "TAM-10", teacher: "Mr. S. Rajendran", periods: "6 periods/week", progress: 85, color: "bg-teal-500" },
  { id: "ENG", name: "English", code: "ENG-10", teacher: "Mrs. P. Mercy", periods: "5 periods/week", progress: 72, color: "bg-primary-500" },
  { id: "MAT", name: "Mathematics", code: "MAT-10", teacher: "Mrs. K. Ranjitha", periods: "7 periods/week", progress: 58, color: "bg-warning-500" },
  { id: "SCI", name: "Science", code: "SCI-10", teacher: "Mr. D. Arul Selvan", periods: "6 periods/week", progress: 64, color: "bg-info-500" },
  { id: "SOC", name: "Social Science", code: "SOC-10", teacher: "Mr. R. Kalidoss", periods: "5 periods/week", progress: 80, color: "bg-purple-500" },
  { id: "PED", name: "Physical Education", code: "PED-10", teacher: "Mr. A. Jayakumar", periods: "2 periods/week", progress: 95, color: "bg-success-500" },
];

export default function MyCoursePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">My Courses</h1>
        <p className="text-sm text-surface-500 mt-0.5">Enrolled courses and academic progress for Class 10-A</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <ChartCard key={course.id} title={course.name} subtitle={course.code}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg p-2 bg-surface-50 text-surface-500">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-surface-400">Teacher</p>
                  <p className="text-sm font-medium text-surface-700">{course.teacher}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg p-2 bg-surface-50 text-surface-500">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-surface-400">Schedule</p>
                  <p className="text-sm font-medium text-surface-700">{course.periods}</p>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-surface-400">Syllabus Completion</span>
                  <span className="text-xs font-semibold text-surface-700">{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} max={100} color={course.color} showLabel={false} size="sm" />
              </div>

              <div className="pt-4 border-t border-surface-100 flex gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-lg bg-teal-50 hover:bg-teal-100 text-xs font-semibold text-teal-700 transition-colors">
                  <FileText className="h-3.5 w-3.5" /> Syllabus
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-lg bg-primary-50 hover:bg-primary-100 text-xs font-semibold text-primary-700 transition-colors">
                  <Download className="h-3.5 w-3.5" /> Textbooks
                </button>
              </div>
            </div>
          </ChartCard>
        ))}
      </div>
    </div>
  );
}
