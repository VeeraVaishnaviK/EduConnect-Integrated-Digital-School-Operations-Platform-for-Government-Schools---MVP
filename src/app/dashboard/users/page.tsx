"use client";

import React, { useState } from "react";
import { Users, UserPlus, Search, Filter, ShieldAlert, Key, Edit, Trash2 } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusChip } from "@/components/shared";
import { UserRole } from "@/lib/types";

const mockUsers = [
  { id: "USR001", name: "S. Murugan", email: "ceo.kym@tn.gov.in", role: "ceo", status: "active", lastLogin: "2 hours ago" },
  { id: "USR002", name: "R. Lakshmi", email: "deo.ngl@tn.gov.in", role: "deo", status: "active", lastLogin: "5 hours ago" },
  { id: "USR003", name: "K. Rajan", email: "admin.state@tn.gov.in", role: "state_admin", status: "active", lastLogin: "10 mins ago" },
  { id: "USR004", name: "T. Selvi", email: "principal.ghssngl@tn.gov.in", role: "principal", status: "active", lastLogin: "1 day ago" },
  { id: "USR005", name: "P. Karthik", email: "karthik.maths@ghssngl.edu.in", role: "teacher", status: "inactive", lastLogin: "2 weeks ago" },
  { id: "USR006", name: "M. Deepa", email: "beo.agst@tn.gov.in", role: "beo", status: "active", lastLogin: "3 days ago" },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">User Management</h1>
          <p className="text-sm text-surface-500 mt-0.5">Manage platform access, roles, and security</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
            <UserPlus className="h-4 w-4" /> Add User
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard title="Total Active Users" value="1,245" icon={Users} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Admin Accounts" value="12" icon={ShieldAlert} iconColor="text-danger-600" iconBg="bg-danger-50" />
        <KPICard title="Recent Logins (24h)" value="894" icon={Key} iconColor="text-teal-600" iconBg="bg-teal-50" />
      </div>

      <ChartCard 
        title="System Users" 
        noPadding 
        className="min-h-[500px]"
        action={
          <div className="flex items-center gap-3 px-4 pt-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none max-w-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-surface-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50"
              >
                <option value="all">All Roles</option>
                <option value="state_admin">State Admin</option>
                <option value="ceo">CEO</option>
                <option value="deo">DEO</option>
                <option value="beo">BEO</option>
                <option value="principal">Principal</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-y border-surface-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">User Details</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Last Login</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs uppercase">
                        {user.name.charAt(0)}{user.name.split(' ').length > 1 ? user.name.split(' ')[1].charAt(0) : ''}
                      </div>
                      <div>
                        <div className="font-medium text-surface-900">{user.name}</div>
                        <div className="text-xs text-surface-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="capitalize font-medium text-surface-700">{user.role.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={user.status as any} />
                  </td>
                  <td className="px-4 py-3 text-surface-500 text-xs">
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-surface-400 hover:text-danger-600 hover:bg-danger-50 rounded transition-colors" title="Deactivate">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-surface-500">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
