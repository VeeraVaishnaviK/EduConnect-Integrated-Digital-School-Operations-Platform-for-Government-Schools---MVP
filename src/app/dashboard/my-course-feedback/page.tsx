"use client";

import React, { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";

const courses = [
  { id: "TAM", name: "Tamil - Mr. S. Rajendran" },
  { id: "ENG", name: "English - Mrs. P. Mercy" },
  { id: "MAT", name: "Mathematics - Mrs. K. Ranjitha" },
  { id: "SCI", name: "Science - Mr. D. Arul Selvan" },
  { id: "SOC", name: "Social Science - Mr. R. Kalidoss" },
  { id: "PED", name: "Physical Education - Mr. A. Jayakumar" },
];

export default function MyCourseFeedbackPage() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [ratings, setRatings] = useState({ content: 0, method: 0, pace: 0, doubts: 0 });
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (key: keyof typeof ratings, val: number) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setRatings({ content: 0, method: 0, pace: 0, doubts: 0 });
    setComments("");
    setSubmitted(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">My Course Feedback</h1>
        <p className="text-sm text-surface-500 mt-0.5">Submit constructive feedback for your courses and instructors</p>
      </div>

      {submitted ? (
        <div className="bg-white p-8 rounded-xl border border-surface-200 shadow-sm text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-success-50 flex items-center justify-center text-success-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-surface-900">Feedback Submitted Successfully!</h2>
          <p className="text-sm text-surface-500 max-w-md mx-auto">
            Thank you for your feedback. Your responses are anonymous and are used to improve curriculum and teaching standards.
          </p>
          <button
            onClick={resetForm}
            className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-teal-600 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      ) : (
        <ChartCard title="Course Feedback Form" subtitle="Select a course and rate your experience">
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            {/* Course Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-surface-500">Select Subject &amp; Teacher</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none bg-white"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ratings Grid */}
            <div className="space-y-4 pt-2 border-t border-surface-100">
              {[
                { key: "content", label: "Course Content Quality", desc: "Clarity of learning objectives and relevance of materials" },
                { key: "method", label: "Teaching Method", desc: "Instructor's ability to explain concepts clearly" },
                { key: "pace", label: "Pace of Classes", desc: "Whether lessons are taught at an appropriate speed" },
                { key: "doubts", label: "Doubt Resolution", desc: "Instructor's responsiveness to questions" },
              ].map((item) => (
                <div key={item.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-1">
                  <div>
                    <p className="text-sm font-medium text-surface-700">{item.label}</p>
                    <p className="text-xs text-surface-400">{item.desc}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(item.key as keyof typeof ratings, star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= ratings[item.key as keyof typeof ratings]
                              ? "fill-amber-400 text-amber-400"
                              : "text-surface-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Comments */}
            <div className="space-y-1.5 pt-2 border-t border-surface-100">
              <label className="text-xs font-semibold text-surface-500">Suggestions / Comments (Optional)</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your thoughts on how to improve this course..."
                rows={4}
                className="w-full p-3 rounded-lg border border-surface-200 text-sm focus:border-teal-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-teal-600 font-semibold text-sm text-white hover:bg-teal-700 transition-colors"
            >
              <Send className="h-4 w-4" /> Submit Feedback
            </button>
          </form>
        </ChartCard>
      )}
    </div>
  );
}
