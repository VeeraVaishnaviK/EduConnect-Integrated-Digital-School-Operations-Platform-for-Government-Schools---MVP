"use client";

import React, { useState } from "react";
import { FileText, Upload, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatusChip } from "@/components/shared";

const initialAssignments = [
  { id: 1, subject: "Mathematics", task: "Complete Exercise 5.3 - Trigonometry", dueDate: "2026-07-04", status: "pending", description: "Solve questions 1 to 10 in your classwork notebook. Focus on double-angle formulas." },
  { id: 2, subject: "English", task: "Write an essay on 'Digital India'", dueDate: "2026-07-05", status: "pending", description: "Write a 500-word essay discussing the impacts of digitization on government education platforms." },
  { id: 3, subject: "Science", task: "Lab report - Ohm's Law experiment", dueDate: "2026-07-03", status: "overdue", description: "Draft the observations table, calculate resistance values, and plot the V-I characteristic graph." },
  { id: 4, subject: "Tamil", task: "Poem memorization - Bharathiyar", dueDate: "2026-07-02", status: "completed", description: "Recite the first 3 stanzas of 'Achamillai Achamillai' during class hours." },
];

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedTask, setSelectedTask] = useState<typeof initialAssignments[0] | null>(initialAssignments[0]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      setUploadSuccess(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setUploadSuccess(true);
    }
  };

  const handleSubmitAssignment = () => {
    if (!selectedTask) return;
    setAssignments((prev) =>
      prev.map((a) => (a.id === selectedTask.id ? { ...a, status: "completed" } : a))
    );
    setSelectedTask((prev) => prev ? { ...prev, status: "completed" } : null);
    setUploadSuccess(false);
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Assignments &amp; Homework</h1>
        <p className="text-sm text-surface-500 mt-0.5">Submit homework and track review remarks from teachers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Assignments List */}
        <div className="lg:col-span-1 space-y-4">
          <ChartCard title="Assignment List" noPadding>
            <div className="divide-y divide-surface-100 max-h-[500px] overflow-y-auto">
              {assignments.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setSelectedTask(a);
                    setUploadSuccess(false);
                    setUploadedFile(null);
                  }}
                  className={`w-full text-left p-4 hover:bg-surface-50 transition-colors flex flex-col gap-1 border-l-2 ${
                    selectedTask?.id === a.id ? "border-teal-500 bg-teal-50/10" : "border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{a.subject}</span>
                    <StatusChip status={a.status} />
                  </div>
                  <p className="text-sm font-semibold text-surface-800 line-clamp-1">{a.task}</p>
                  <div className="flex items-center gap-1 text-[11px] text-surface-400 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {new Date(a.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                </button>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Right: Assignment Details & Submission */}
        <div className="lg:col-span-2">
          {selectedTask ? (
            <ChartCard title={selectedTask.task} subtitle={selectedTask.subject}>
              <div className="space-y-6 pt-2">
                <div>
                  <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">Description</h3>
                  <p className="text-sm text-surface-700 leading-relaxed bg-surface-50 p-4 rounded-xl border border-surface-200">
                    {selectedTask.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center justify-between py-3 border-y border-surface-100">
                  <div className="flex gap-2 items-center">
                    <Calendar className="h-4.5 w-4.5 text-surface-400" />
                    <div>
                      <p className="text-[11px] text-surface-400">Due Date &amp; Time</p>
                      <p className="text-xs font-bold text-surface-700">
                        {new Date(selectedTask.dueDate).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} @ 04:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-surface-400">Current Status:</span>
                    <StatusChip status={selectedTask.status} />
                  </div>
                </div>

                {selectedTask.status !== "completed" && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Submit Work</h3>

                    {uploadSuccess ? (
                      <div className="p-4 rounded-xl border border-success-200 bg-success-50/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-success-600" />
                          <div>
                            <p className="text-sm font-semibold text-surface-800">{uploadedFile?.name || "homework-submission.pdf"}</p>
                            <p className="text-xs text-surface-500">Ready to submit • {(uploadedFile?.size ? (uploadedFile.size / 1024 / 1024).toFixed(2) : "0.5")} MB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setUploadedFile(null);
                            setUploadSuccess(false);
                          }}
                          className="text-xs font-semibold text-danger-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                          dragActive ? "border-teal-500 bg-teal-50/15" : "border-surface-200 hover:border-surface-300"
                        }`}
                      >
                        <Upload className="mx-auto h-8 w-8 text-surface-400 mb-2.5" />
                        <p className="text-sm font-semibold text-surface-700">Drag &amp; drop your files here</p>
                        <p className="text-xs text-surface-400 mt-1">Accepts PDF, JPG, PNG or DOCX up to 10MB</p>
                        <div className="mt-4">
                          <label className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-surface-100 hover:bg-surface-200 text-xs font-semibold text-surface-700 transition-colors cursor-pointer">
                            Browse Files
                            <input type="file" onChange={handleFileChange} className="hidden" />
                          </label>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSubmitAssignment}
                      disabled={!uploadSuccess}
                      className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg bg-teal-600 font-semibold text-sm text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Turn In Assignment
                    </button>
                  </div>
                )}

                {selectedTask.status === "completed" && (
                  <div className="p-4 rounded-xl border border-success-200 bg-success-50/20 flex gap-3.5">
                    <CheckCircle2 className="h-5 w-5 text-success-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-success-800">Assignment Submitted</p>
                      <p className="text-xs text-surface-500 mt-0.5">Submitted via online portal on July 3, 2026. Awaiting evaluation grades from class teacher.</p>
                    </div>
                  </div>
                )}
              </div>
            </ChartCard>
          ) : (
            <div className="bg-white p-12 rounded-xl border border-surface-200 shadow-sm text-center flex flex-col items-center justify-center min-h-[300px]">
              <FileText className="h-10 w-10 text-surface-300 mb-3" />
              <p className="text-sm font-semibold text-surface-700">Select an assignment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
