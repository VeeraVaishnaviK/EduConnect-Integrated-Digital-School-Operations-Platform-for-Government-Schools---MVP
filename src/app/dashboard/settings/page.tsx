"use client";

import React, { useState } from "react";
import { Save, Globe, Bell, Shield, Database, Smartphone } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Access", icon: Shield },
    { id: "data", label: "Data Management", icon: Database },
    { id: "mobile", label: "Mobile App", icon: Smartphone },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">System Settings</h1>
          <p className="text-sm text-surface-500 mt-0.5">Manage platform configurations and global preferences</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 h-9 px-6 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors shadow-sm">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-primary-600" : "text-surface-400"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          {activeTab === "general" && (
            <ChartCard title="General Settings" subtitle="Basic configuration for the academic year">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">Academic Year</label>
                    <select className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50">
                      <option>2025-2026</option>
                      <option>2024-2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">Default Language</label>
                    <select className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50">
                      <option>English</option>
                      <option>Tamil</option>
                    </select>
                  </div>
                </div>
                
                <div className="border-t border-surface-100 pt-6">
                  <h3 className="text-sm font-semibold text-surface-900 mb-4">Regional Formats</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">Date Format</label>
                      <select className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50">
                        <option>DD-MM-YYYY</option>
                        <option>MM-DD-YYYY</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-1">Timezone</label>
                      <select className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-primary-500 focus:outline-none bg-surface-50">
                        <option>Asia/Kolkata (IST)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>
          )}

          {activeTab === "notifications" && (
            <ChartCard title="Notification Channels" subtitle="Configure how alerts are delivered across the system">
              <div className="space-y-4">
                {[
                  { title: "Email Notifications", desc: "Send daily summaries and critical alerts via Email", default: true },
                  { title: "SMS Gateway", desc: "Enable SMS delivery for parent communications (Requires credits)", default: true },
                  { title: "WhatsApp Integration", desc: "Use WhatsApp Business API for automated notifications", default: false },
                  { title: "Push Notifications", desc: "Send alerts to mobile app users", default: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-surface-200">
                    <div>
                      <p className="text-sm font-semibold text-surface-900">{item.title}</p>
                      <p className="text-xs text-surface-500 mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.default} />
                      <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </ChartCard>
          )}

          {activeTab !== "general" && activeTab !== "notifications" && (
            <ChartCard title={`${tabs.find(t => t.id === activeTab)?.label}`} subtitle="Configuration options">
              <div className="py-12 text-center text-surface-500">
                <p>Settings panel under development.</p>
              </div>
            </ChartCard>
          )}
        </div>
      </div>
    </div>
  );
}
