"use client";

import React, { useState } from "react";
import { Shield, ShieldCheck, Plus, Check, X, AlertCircle } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

const roles: { id: UserRole; name: string; usersCount: number; isSystem: boolean }[] = [
  { id: "state_admin", name: "State Admin", usersCount: 3, isSystem: true },
  { id: "ceo", name: "Chief Educational Officer", usersCount: 38, isSystem: true },
  { id: "deo", name: "District Educational Officer", usersCount: 120, isSystem: true },
  { id: "beo", name: "Block Educational Officer", usersCount: 413, isSystem: true },
  { id: "principal", name: "Principal / Headmaster", usersCount: 37000, isSystem: true },
  { id: "teacher", name: "Teacher", usersCount: 220000, isSystem: true },
];

const permissionModules = [
  { name: "Leave Approvals", permissions: { state_admin: true, ceo: true, deo: true, beo: true, principal: true, teacher: false } },
  { name: "Attendance Marking", permissions: { state_admin: false, ceo: false, deo: false, beo: false, principal: true, teacher: true } },
  { name: "Issue Circulars", permissions: { state_admin: true, ceo: true, deo: true, beo: false, principal: true, teacher: false } },
  { name: "View Reports", permissions: { state_admin: true, ceo: true, deo: true, beo: true, principal: true, teacher: true } },
  { name: "Manage Users", permissions: { state_admin: true, ceo: false, deo: false, beo: false, principal: false, teacher: false } },
  { name: "Update Infrastructure", permissions: { state_admin: false, ceo: false, deo: false, beo: false, principal: true, teacher: false } },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("state_admin");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Role Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">Configure role-based access control (RBAC)</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            <Plus className="h-4 w-4" /> Create Custom Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1 space-y-4">
          <ChartCard title="Defined Roles" noPadding className="sticky top-6">
            <div className="divide-y divide-surface-100">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-surface-50 transition-colors flex items-center justify-between",
                    selectedRole === role.id ? "bg-primary-50/50 border-l-2 border-primary-600" : "border-l-2 border-transparent"
                  )}
                >
                  <div>
                    <p className={cn("text-sm font-semibold", selectedRole === role.id ? "text-primary-700" : "text-surface-900")}>
                      {role.name}
                    </p>
                    <p className="text-xs text-surface-500 mt-0.5">{role.usersCount.toLocaleString()} Users</p>
                  </div>
                  {role.isSystem && <ShieldCheck className="h-4 w-4 text-surface-300" />}
                </button>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-3">
          <ChartCard 
            title={`Permissions: ${roles.find(r => r.id === selectedRole)?.name}`} 
            subtitle="Configure what this role can view and execute"
          >
            {roles.find(r => r.id === selectedRole)?.isSystem && (
              <div className="mb-6 bg-info-50 text-info-700 p-3 rounded-lg flex items-start gap-3 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>This is a <strong>System Role</strong>. Core permissions cannot be modified. You may only adjust custom extensions or duplicate this role to create a new one.</p>
              </div>
            )}
            
            <div className="border border-surface-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface-50 border-b border-surface-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-surface-700">Module / Feature</th>
                    <th className="px-4 py-3 font-semibold text-surface-700 text-center w-24">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {permissionModules.map((mod, i) => {
                    const hasAccess = mod.permissions[selectedRole as keyof typeof mod.permissions];
                    return (
                      <tr key={i} className="hover:bg-surface-50">
                        <td className="px-4 py-3 font-medium text-surface-800">{mod.name}</td>
                        <td className="px-4 py-3 text-center">
                          {hasAccess ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success-100 text-success-600">
                              <Check className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-danger-100 text-danger-600">
                              <X className="h-4 w-4" />
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                disabled={roles.find(r => r.id === selectedRole)?.isSystem}
                className="h-10 px-6 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
