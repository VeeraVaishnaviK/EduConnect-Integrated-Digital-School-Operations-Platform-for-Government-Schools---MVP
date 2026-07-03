"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { PrincipalDashboard } from "@/components/dashboards/PrincipalDashboard";
import { StateDashboard } from "@/components/dashboards/StateDashboard";
import { DEODashboard } from "@/components/dashboards/DEODashboard";
import { BEODashboard } from "@/components/dashboards/BEODashboard";
import { TeacherDashboard } from "@/components/dashboards/TeacherDashboard";
import { ParentDashboard } from "@/components/dashboards/ParentDashboard";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case "state_admin":
    case "directorate":
    case "ceo":
      return <StateDashboard />;
    case "deo":
      return <DEODashboard />;
    case "beo":
      return <BEODashboard />;
    case "principal":
      return <PrincipalDashboard />;
    case "teacher":
      return <TeacherDashboard />;
    case "parent":
      return <ParentDashboard />;
    case "student":
      return <StudentDashboard />;
    default:
      return <PrincipalDashboard />;
  }
}
