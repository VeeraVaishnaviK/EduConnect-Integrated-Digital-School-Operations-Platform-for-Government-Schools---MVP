"use client";

import React, { useState } from "react";
import { UserCheck, Award, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatusChip } from "@/components/shared";

export default function EnrollmentNewPage() {
  const [step, setStep] = useState(1);
  const [stream, setStream] = useState("");
  const [elective, setElective] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Enrollment Portal</h1>
        <p className="text-sm text-surface-500 mt-0.5">Register for new academic terms and choose elective subject streams</p>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-xl border border-surface-200 shadow-sm text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-success-50 flex items-center justify-center text-success-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-surface-900">Application Submitted!</h2>
          <p className="text-sm text-surface-500 max-w-md mx-auto">
            Your stream registration request has been submitted to the principal for approval. You will receive an alert once approved.
          </p>
          <div className="pt-4 max-w-sm mx-auto border-t border-surface-100 flex justify-between items-center text-left">
            <div>
              <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider">Status</p>
              <p className="text-sm font-semibold text-surface-800">Pending Review</p>
            </div>
            <StatusChip status="pending" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ChartCard title="Select Subject Stream" subtitle="Choose your specialization for Class 11-12">
              <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                <div className="space-y-3">
                  {[
                    { id: "sci", label: "Science Stream", desc: "Physics, Chemistry, Mathematics, Computer Science / Biology", color: "border-teal-500/20 bg-teal-50/5" },
                    { id: "com", label: "Commerce Stream", desc: "Accountancy, Business Studies, Economics, Computer Applications", color: "border-primary-500/20 bg-primary-50/5" },
                    { id: "arts", label: "Arts & Humanities", desc: "History, Geography, Political Science, Advanced English / Tamil", color: "border-purple-500/20 bg-purple-50/5" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        stream === item.id ? `${item.color} border-teal-500 ring-2 ring-teal-500/20` : "border-surface-200 hover:border-surface-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="stream"
                        value={item.id}
                        checked={stream === item.id}
                        onChange={() => setStream(item.id)}
                        className="mt-1 accent-teal-600"
                      />
                      <div>
                        <p className="text-sm font-bold text-surface-800">{item.label}</p>
                        <p className="text-xs text-surface-500 mt-1">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {stream && (
                  <div className="space-y-2.5 animate-slide-up pt-4 border-t border-surface-100">
                    <label className="text-xs font-semibold text-surface-500">First Language Elective</label>
                    <select
                      value={elective}
                      onChange={(e) => setElective(e.target.value)}
                      required
                      className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none bg-white"
                    >
                      <option value="">-- Choose Elective Language --</option>
                      <option value="tam">Tamil (Language &amp; Literature)</option>
                      <option value="hin">Hindi (Secondary Language)</option>
                      <option value="eng">Communicative English</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!stream || !elective}
                  className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg bg-teal-600 font-semibold text-sm text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Enrollment Request <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            </ChartCard>
          </div>

          <div className="space-y-6">
            <ChartCard title="Instruction Guide">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-teal-600 mt-0.5">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-800">Eligibility</p>
                    <p className="text-xs text-surface-500 mt-0.5">Open only for Class 10 students with minimum 80% attendance record.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-primary-600 mt-0.5">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-800">Cut-off Criteria</p>
                    <p className="text-xs text-surface-500 mt-0.5">Science stream requires &gt;75% average in Half-yearly Math &amp; Science exams.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-purple-600 mt-0.5">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-800">Documents Needed</p>
                    <p className="text-xs text-surface-500 mt-0.5">Signed parent declaration form must be scanned and uploaded (or submitted to class teacher).</p>
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
