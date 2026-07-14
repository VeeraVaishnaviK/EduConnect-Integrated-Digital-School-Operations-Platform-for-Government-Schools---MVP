"use client";

import React, { useState } from "react";
import { Wrench, CheckCircle2, MessageSquare, AlertCircle, Plus } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatusChip } from "@/components/shared";

const initialIssues = [
  { id: "INF-201", category: "Classroom", title: "Broken fan in Class 10-A", block: "Block A - Room 4", severity: "medium", status: "resolved", date: "2026-06-18", resolution: "Fan regulator and wiring replaced by local electrician." },
  { id: "INF-202", category: "Sanitation", title: "Leaking water tap in boys washroom", block: "Ground Floor", severity: "high", status: "in_progress", date: "2026-07-02", resolution: "Plumbing work assigned. Parts ordered." },
];

export default function RaiseInfraIssuePage() {
  const [issues, setIssues] = useState(initialIssues);
  const [category, setCategory] = useState("Classroom");
  const [title, setTitle] = useState("");
  const [block, setBlock] = useState("");
  const [severity, setSeverity] = useState("low");
  const [description, setDescription] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIssue = {
      id: `INF-${200 + issues.length + 1}`,
      category,
      title,
      block,
      severity,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      resolution: "Pending inspection from school maintenance staff.",
    };
    setIssues((prev) => [newIssue, ...prev]);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setTitle("");
      setBlock("");
      setDescription("");
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Raise Infrastructure Issue</h1>
        <p className="text-sm text-surface-500 mt-0.5">Report broken school assets (fans, lights, toilets) to the admin team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Report Form */}
        <div className="lg:col-span-1">
          <ChartCard title="Report Maintenance Issue" subtitle="File a new school infrastructure complaint">
            {formSubmitted ? (
              <div className="p-6 text-center space-y-3 animate-fade-in">
                <div className="mx-auto w-12 h-12 rounded-full bg-success-50 flex items-center justify-center text-success-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-surface-800">Issue Raised Successfully!</h3>
                <p className="text-xs text-surface-400">Your complaint has been logged and assigned to the School Infrastructure Officer.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-surface-500">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none bg-white"
                  >
                    <option>Classroom</option>
                    <option>Drinking Water</option>
                    <option>Sanitation</option>
                    <option>Computer Lab</option>
                    <option>Playground &amp; Sports</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-surface-500">Issue Title / Short Summary</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Window pane shattered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-surface-500">Location / Block &amp; Room</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Block B, Room 10-B"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-surface-500">Severity</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none bg-white"
                  >
                    <option value="low">Low (Non-urgent repairs)</option>
                    <option value="medium">Medium (Regular repairs)</option>
                    <option value="high">High (Needs immediate attention)</option>
                    <option value="critical">Critical (Safety hazard)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-surface-500">Additional Description</label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none resize-none"
                  />
                </div>

                <button type="submit" className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-teal-600 hover:bg-teal-700 text-xs font-semibold text-white transition-colors">
                  <Plus className="h-4 w-4" /> Raise Issue Log
                </button>
              </form>
            )}
          </ChartCard>
        </div>

        {/* Right: History List */}
        <div className="lg:col-span-2 space-y-4">
          <ChartCard title="Reported Issues History" subtitle="Track maintenance and resolution logs">
            <div className="space-y-4">
              {issues.map((issue) => (
                <div key={issue.id} className="p-4 rounded-xl border border-surface-150 space-y-3">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{issue.category}</span>
                      <h3 className="text-sm font-bold text-surface-800 mt-0.5">{issue.title}</h3>
                      <p className="text-xs text-surface-500 mt-0.5">Location: {issue.block}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <StatusChip status={issue.status} />
                      <span className="text-[10px] text-surface-400">Reported: {new Date(issue.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-surface-100 flex gap-2 items-start bg-surface-50 p-3 rounded-lg">
                    <Wrench className="h-4 w-4 text-surface-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-surface-700">Resolution Progress Note</p>
                      <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">{issue.resolution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
