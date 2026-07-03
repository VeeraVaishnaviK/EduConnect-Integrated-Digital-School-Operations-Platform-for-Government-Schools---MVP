"use client";

import React from "react";
import { Building2, MapPin, Phone, Mail, Activity, GraduationCap, Users, LayoutDashboard, CheckCircle2, XCircle } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { ProgressBar, StatusChip } from "@/components/shared";
import { schools } from "@/lib/mock-data/schools";
import { useAuth } from "@/contexts/AuthContext";

export default function SchoolProfilePage() {
  const { user } = useAuth();
  
  // In a real app, we'd fetch the school based on the user's schoolId or from a URL param.
  // For the MVP demo, we'll pick the first school (GHSS Nagercoil) or use the user's schoolId.
  const schoolData = schools.find(s => s.id === user?.schoolId) || schools[0];

  const facilities = [
    { name: "Library", available: schoolData.hasLibrary },
    { name: "Science Labs", available: schoolData.hasLab },
    { name: "Playground", available: schoolData.hasPlayground },
    { name: "Computer Lab", available: schoolData.hasComputer },
    { name: "Internet Connection", available: schoolData.hasInternet },
    { name: "Mid-Day Meal Center", available: schoolData.hasMidDayMeal },
    { name: "Functional Toilets", available: schoolData.hasToilets },
    { name: "Drinking Water", available: schoolData.hasDrinkingWater },
    { name: "Ramp Access", available: schoolData.hasRamp },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 bg-white p-6 rounded-xl border border-surface-200">
        <div className="flex gap-5">
          <div className="w-16 h-16 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900">{schoolData.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-surface-600">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {schoolData.address}</span>
              <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {schoolData.phone}</span>
              <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {schoolData.email}</span>
            </div>
            <div className="mt-3 flex gap-2">
              <StatusChip status={schoolData.complianceStatus} />
              <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-surface-100 text-surface-600">
                UDISE: {schoolData.udiseCode}
              </span>
              <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-surface-100 text-surface-600">
                Est: {schoolData.establishedYear}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right sm:min-w-32">
          <p className="text-xs font-medium text-surface-500 uppercase tracking-wide">Health Score</p>
          <div className="text-3xl font-bold text-success-600 mt-1">{schoolData.healthScore}/100</div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Students" value={schoolData.totalStudents.toString()} icon={GraduationCap} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Teaching Staff" value={schoolData.totalTeachers.toString()} icon={Users} iconColor="text-teal-600" iconBg="bg-teal-50" />
        <KPICard title="Total Classrooms" value={schoolData.totalClassrooms.toString()} icon={LayoutDashboard} iconColor="text-purple-600" iconBg="bg-purple-50" />
        <KPICard title="Student-Teacher Ratio" value={`1 : ${Math.round(schoolData.totalStudents / schoolData.totalTeachers)}`} icon={Activity} iconColor="text-info-600" iconBg="bg-info-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info & Admin Details */}
        <ChartCard title="Administrative Details" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase">Head of Institution</p>
                <p className="text-sm font-semibold text-surface-900 mt-0.5">{schoolData.principalName}</p>
                <p className="text-xs text-surface-600 mt-0.5">{schoolData.principalPhone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase">Classes Available</p>
                <p className="text-sm font-medium text-surface-900 mt-0.5">Class {schoolData.classesFrom} to Class {schoolData.classesTo}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase">Medium of Instruction</p>
                <div className="flex gap-1 mt-1">
                  {schoolData.medium.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-surface-100 text-xs font-medium text-surface-700">{m}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase">School Type</p>
                <p className="text-sm font-semibold text-surface-900 mt-0.5">{schoolData.type}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase">Last Inspection Date</p>
                <p className="text-sm font-medium text-surface-900 mt-0.5">{schoolData.lastInspection || "Not Available"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase">Overall Compliance Progress</p>
                <div className="mt-2">
                  <ProgressBar value={schoolData.healthScore} max={100} color="bg-success-500" />
                </div>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Facilities Checklist */}
        <ChartCard title="Infrastructure & Facilities">
          <div className="space-y-3">
            {facilities.map((fac, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-50 transition-colors">
                <span className="text-sm font-medium text-surface-700">{fac.name}</span>
                {fac.available ? (
                  <CheckCircle2 className="h-5 w-5 text-success-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-danger-400" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-surface-100">
            <button className="w-full h-9 rounded-lg border border-surface-200 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors">
              Request Infrastructure Audit
            </button>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
