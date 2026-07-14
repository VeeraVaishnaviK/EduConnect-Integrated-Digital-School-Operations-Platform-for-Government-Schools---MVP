"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Heart, ShieldAlert, CheckCircle2 } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";

export default function MyProfilePage() {
  const [phone, setPhone] = useState("9876601001");
  const [email, setEmail] = useState("arun.student@educonnect.tn");
  const [address, setAddress] = useState("12/4B, East Car Street, Nagercoil, Kanyakumari - 629001");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">My Profile</h1>
        <p className="text-sm text-surface-500 mt-0.5">Manage your personal information, contact numbers, and school record details</p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl border border-success-200 bg-success-50 text-success-800 flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="h-5 w-5 text-success-600 flex-shrink-0" />
          <p className="text-sm font-semibold">Contact profile details updated successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Avatar card */}
        <div className="md:col-span-1 space-y-6">
          <ChartCard title="">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-2xl font-bold border-2 border-teal-500 shadow-inner">
                AK
              </div>
              <h2 className="text-base font-bold text-surface-800 mt-4">Arun Kumar S</h2>
              <p className="text-xs text-teal-600 font-semibold mt-0.5">Student (Class 10-A)</p>
              <p className="text-xs text-surface-400 mt-2">Admission No: ADM-2022-8490</p>
              <p className="text-xs text-surface-400">Roll No: 1</p>
            </div>
          </ChartCard>

          <ChartCard title="Quick Emergency Card" subtitle="Contact in case of emergency">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-surface-100">
                <span className="text-surface-400">Contact Person</span>
                <span className="font-bold text-surface-700">Mr. Suresh Kumar (Father)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-100">
                <span className="text-surface-400">Emergency Phone</span>
                <span className="font-bold text-surface-700">9876601001</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-surface-400">Blood Group</span>
                <span className="font-bold text-danger-600 flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 fill-danger-500 text-danger-500" /> O Positive
                </span>
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Right: Personal & Contact details form */}
        <div className="md:col-span-2 space-y-6">
          <ChartCard title="School Registration Records">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-surface-50 rounded-lg border border-surface-200">
                <span className="text-surface-400 block mb-0.5">School Name</span>
                <span className="font-bold text-surface-800">GHSS Nagercoil</span>
              </div>
              <div className="p-3 bg-surface-50 rounded-lg border border-surface-200">
                <span className="text-surface-400 block mb-0.5">Education Board</span>
                <span className="font-bold text-surface-800">Tamil Nadu State Board</span>
              </div>
              <div className="p-3 bg-surface-50 rounded-lg border border-surface-200">
                <span className="text-surface-400 block mb-0.5">Medium of Instruction</span>
                <span className="font-bold text-surface-800">English Medium</span>
              </div>
              <div className="p-3 bg-surface-50 rounded-lg border border-surface-200">
                <span className="text-surface-400 block mb-0.5">District &amp; Block</span>
                <span className="font-bold text-surface-800">Kanyakumari / Agastheeswaram</span>
              </div>
            </div>
          </ChartCard>

          <ChartCard title="Edit Contact Details">
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-surface-500 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-surface-400" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-surface-500 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-surface-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-surface-500 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-surface-400" /> Residential Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 border-t border-surface-100 flex justify-end">
                <button type="submit" className="inline-flex items-center justify-center h-9 px-6 rounded-lg bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white transition-colors">
                  Save Profile Changes
                </button>
              </div>
            </form>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
