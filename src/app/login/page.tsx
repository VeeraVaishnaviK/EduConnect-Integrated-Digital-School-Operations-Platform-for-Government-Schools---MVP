"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";
import { demoCredentials } from "@/lib/mock-data/users";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { cn, getRoleName } from "@/lib/utils";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("principal");
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(selectedRole);
      router.push("/dashboard");
    } catch {
      setError("Login failed. Please try again.");
    }
  };

  const handleQuickLogin = async (role: UserRole) => {
    setSelectedRole(role);
    setError("");
    try {
      await login(role);
      router.push("/dashboard");
    } catch {
      setError("Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full border border-white/20" />
          <div className="absolute bottom-32 right-10 w-64 h-64 rounded-full border border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/10" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-lg">
              EC
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">EduConnect Kanyakumari</h1>
              <p className="text-xs text-white/60">Government School Management Platform</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Simplifying Government<br />
            School Operations.
          </h2>
          <p className="text-lg text-white/70 max-w-md mb-10">
            An AI-powered platform designed for the School Education Department of Tamil Nadu
            to make school administration simpler, smarter, and more transparent.
          </p>

          <div className="space-y-4">
            {[
              { label: "Automated Attendance & Analytics", desc: "Real-time tracking across all schools" },
              { label: "AI-Powered Insights", desc: "Dropout prediction & academic intervention" },
              { label: "EMIS Compatible", desc: "Seamless integration with existing systems" },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{feature.label}</p>
                  <p className="text-xs text-white/50">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-12 border-t border-white/10">
            <p className="text-[11px] text-white/40 leading-relaxed">
              Developed for the School Education Department, Government of Tamil Nadu.<br />
              Pilot District: Kanyakumari | Complementing EMIS Ecosystem
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-surface-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              EC
            </div>
            <div>
              <h1 className="text-lg font-bold text-surface-900">EduConnect Kanyakumari</h1>
              <p className="text-[11px] text-surface-500">Government School Management Platform</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-surface-900">Welcome back</h2>
            <p className="text-sm text-surface-500 mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">
                Login As
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="w-full flex items-center justify-between h-11 px-3.5 rounded-lg border border-surface-200 bg-white text-sm text-surface-900 hover:border-surface-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-surface-400" />
                    <span>{getRoleName(selectedRole)}</span>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-surface-400 transition-transform", showRoleDropdown && "rotate-180")} />
                </button>
                {showRoleDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowRoleDropdown(false)} />
                    <div className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-surface-200 bg-white shadow-lg z-50 py-1 max-h-64 overflow-y-auto">
                      {demoCredentials.map((cred) => (
                        <button
                          key={cred.role}
                          type="button"
                          onClick={() => { setSelectedRole(cred.role as UserRole); setShowRoleDropdown(false); }}
                          className={cn(
                            "w-full text-left px-3.5 py-2.5 text-sm hover:bg-surface-50 transition-colors",
                            selectedRole === cred.role && "bg-primary-50 text-primary-700 font-medium"
                          )}
                        >
                          {cred.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Email/ID */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">
                Email / Employee ID / UDISE Code
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or ID"
                  className="w-full h-11 rounded-lg border border-surface-200 bg-white pl-10 pr-4 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-surface-700">
                  Password
                </label>
                <button type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 rounded-lg border border-surface-200 bg-white pl-10 pr-10 text-sm text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-danger-500 bg-danger-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-surface-50 px-3 text-surface-400 font-medium">
                  Quick Demo Access
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {demoCredentials.slice(0, 6).map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => handleQuickLogin(cred.role as UserRole)}
                  disabled={isLoading}
                  className="flex items-center justify-center h-9 rounded-lg border border-surface-200 bg-white text-xs font-medium text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-colors disabled:opacity-50"
                >
                  {cred.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-[11px] text-surface-400 leading-relaxed">
            EduConnect Kanyakumari © 2026. Developed for the School Education Department,
            Government of Tamil Nadu. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
