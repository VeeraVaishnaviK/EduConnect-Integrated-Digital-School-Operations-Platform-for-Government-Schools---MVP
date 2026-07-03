"use client";

import React from "react";
import { Hammer, ArrowLeft, Construction } from "lucide-react";
import { useRouter } from "next/navigation";

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
}

export function ComingSoon({ title, description, icon: Icon = Construction }: ComingSoonProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in px-4">
      <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mb-6 border border-primary-100">
        <Icon className="h-10 w-10 text-primary-600" />
      </div>
      <h1 className="text-3xl font-bold text-surface-900 mb-2">{title}</h1>
      <p className="text-surface-500 max-w-md mx-auto mb-8 leading-relaxed">
        {description || "This module is currently under development as part of our Phase 2 rollout for the EduConnect platform."}
      </p>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-surface-200 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
        <button 
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary-600 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
