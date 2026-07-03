"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ClipboardCheck, BarChart3, Brain, Bell, Shield, FileText,
  Building2, Users, GraduationCap, ChevronDown, ChevronRight,
  ArrowRight, CheckCircle, Star, Phone, Mail, MapPin,
  Globe, Zap, Lock, Layers,
} from "lucide-react";

const features = [
  { icon: ClipboardCheck, title: "Smart Attendance", description: "Real-time attendance tracking with instant parent notifications and automated analytics across all schools.", color: "text-teal-600", bg: "bg-teal-50" },
  { icon: Brain, title: "AI-Powered Insights", description: "Predictive dropout alerts, weak subject detection, and personalized intervention recommendations.", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: BarChart3, title: "Analytics & Reports", description: "Interactive dashboards with EMIS-compatible reports. Monthly, quarterly, and annual analytics.", color: "text-primary-600", bg: "bg-primary-50" },
  { icon: Bell, title: "Multi-Channel Notifications", description: "SMS, WhatsApp, email, and in-app notifications for parents, teachers, and administrators.", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Shield, title: "Role-Based Access", description: "State → District → Block → School hierarchy with secure, role-specific dashboards.", color: "text-info-600", bg: "bg-info-50" },
  { icon: FileText, title: "Leave & Compliance", description: "Digital leave management, compliance tracking, and automated approval workflows.", color: "text-emerald-600", bg: "bg-emerald-50" },
];

const stats = [
  { value: "258+", label: "Government Schools" },
  { value: "50K+", label: "Students Managed" },
  { value: "3.2K+", label: "Teachers Connected" },
  { value: "9", label: "Educational Blocks" },
];

const benefits = [
  { role: "For Principals", items: ["Instant daily attendance overview", "Leave approval on mobile", "Compliance tracking dashboard", "AI-powered student alerts"] },
  { role: "For Teachers", items: ["One-tap attendance marking", "Performance tracking tools", "Parent communication portal", "Leave management system"] },
  { role: "For Parents", items: ["Real-time attendance SMS", "Academic progress reports", "Direct teacher messaging", "School notice updates"] },
  { role: "For Officers", items: ["District/Block level analytics", "School health scoring", "Inspection management", "EMIS-compatible reports"] },
];

const testimonials = [
  { name: "Dr. M. Sundararajan", role: "CEO, Kanyakumari", quote: "EduConnect has transformed how we monitor schools. We can now identify struggling schools in real-time and provide immediate support.", avatar: "MS" },
  { name: "Mr. S. Rajendran", role: "HM, GHSS Nagercoil", quote: "Attendance marking went from 30 minutes of paper work to 5 minutes on the platform. Parents are now actively engaged.", avatar: "SR" },
  { name: "Mrs. K. Ranjitha", role: "Teacher, GHSS Nagercoil", quote: "The AI alerts helped us identify 3 students at dropout risk. We intervened early and all 3 are now regular.", avatar: "KR" },
];

const faqs = [
  { question: "Does EduConnect replace EMIS?", answer: "No. EduConnect is designed to complement the existing Tamil Nadu EMIS ecosystem. It simplifies daily operations and provides actionable insights while maintaining full compatibility with EMIS data formats." },
  { question: "Is it available in Tamil?", answer: "Yes, EduConnect supports bilingual operation in both Tamil and English, ensuring accessibility for all stakeholders across Tamil Nadu government schools." },
  { question: "What devices does it support?", answer: "EduConnect is a web-based platform that works on desktop computers, tablets, and mobile phones. Teachers can mark attendance from any smartphone browser." },
  { question: "How is data secured?", answer: "All data is encrypted and stored in compliance with government data security standards. Role-based access ensures that users can only access data relevant to their responsibilities." },
  { question: "What is the pilot scope?", answer: "The initial pilot is focused on Kanyakumari District covering 258 government schools across 9 educational blocks, with plans to scale across Tamil Nadu." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
                EC
              </div>
              <div>
                <span className="text-base font-bold text-surface-900">EduConnect</span>
                <span className="text-xs text-surface-400 ml-1 hidden sm:inline">Kanyakumari</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-surface-600 hover:text-surface-900 transition-colors">Features</a>
              <a href="#benefits" className="text-sm text-surface-600 hover:text-surface-900 transition-colors">Benefits</a>
              <a href="#testimonials" className="text-sm text-surface-600 hover:text-surface-900 transition-colors">Testimonials</a>
              <a href="#faq" className="text-sm text-surface-600 hover:text-surface-900 transition-colors">FAQ</a>
              <a href="#contact" className="text-sm text-surface-600 hover:text-surface-900 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Sign In
              </Link>
              <Link href="/login" className="hidden sm:inline-flex h-9 items-center px-4 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                Request Pilot
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-medium mb-6">
              <Zap className="h-3.5 w-3.5" />
              Pilot Launch — Kanyakumari District
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 leading-tight tracking-tight">
              Making Government School<br />
              Operations{" "}
              <span className="text-gradient">Simpler & Smarter</span>
            </h1>
            <p className="mt-6 text-lg text-surface-600 max-w-2xl mx-auto leading-relaxed">
              An AI-powered platform for the School Education Department of Tamil Nadu.
              Complementing EMIS with automated attendance, smart analytics, and
              real-time communication across schools.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20"
              >
                Explore Platform
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg border border-surface-200 text-surface-700 text-sm font-medium hover:bg-surface-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-sm text-surface-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-surface-900">Platform Features</h2>
            <p className="text-surface-500 mt-3 max-w-xl mx-auto">
              Purpose-built for government school administration in Tamil Nadu
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white rounded-xl border border-surface-200 p-6 card-hover">
                  <div className={`inline-flex rounded-lg p-2.5 ${f.bg} mb-4`}>
                    <Icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-surface-900">{f.title}</h3>
                  <p className="text-sm text-surface-500 mt-2 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-surface-900">Benefits for Every Stakeholder</h2>
            <p className="text-surface-500 mt-3">Tailored value for each role in the education ecosystem</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-surface-50 rounded-xl border border-surface-200 p-6">
                <h3 className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-4">{b.role}</h3>
                <ul className="space-y-3">
                  {b.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-surface-600">
                      <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            We do not replace EMIS. We make Tamil Nadu Government School Operations
            simpler, smarter, faster, and more transparent. By complementing the existing
            ecosystem, EduConnect empowers every stakeholder — from the State Department
            to individual parents — with actionable insights and automated workflows.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-teal-400" />
              <span className="text-sm font-medium">EMIS Compatible</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-teal-400" />
              <span className="text-sm font-medium">Bilingual Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-teal-400" />
              <span className="text-sm font-medium">Scalable Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-surface-900">What Educators Say</h2>
            <p className="text-surface-500 mt-3">Feedback from our pilot program participants</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-surface-200 p-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-surface-600 leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-surface-100">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-800">{t.name}</p>
                    <p className="text-xs text-surface-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-surface-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-surface-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-surface-800 pr-4">{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-surface-400 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-surface-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Transform Your Schools?</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Request a pilot for your district. See how EduConnect can simplify operations
            and improve outcomes for government schools.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-white text-primary-700 text-sm font-semibold hover:bg-surface-50 transition-colors">
              Request Pilot Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors">
              Explore Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-surface-50 border-t border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">EC</div>
                <div>
                  <h3 className="text-base font-bold text-surface-900">EduConnect Kanyakumari</h3>
                  <p className="text-xs text-surface-400">Government School Management Platform</p>
                </div>
              </div>
              <p className="text-sm text-surface-500 leading-relaxed max-w-md">
                Integrated Digital School Management System for Government Schools in
                Kanyakumari District. Developed to complement the Tamil Nadu EMIS ecosystem.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-surface-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-surface-500">
                <li><a href="#features" className="hover:text-surface-900">Features</a></li>
                <li><a href="#benefits" className="hover:text-surface-900">Benefits</a></li>
                <li><a href="#faq" className="hover:text-surface-900">FAQ</a></li>
                <li><Link href="/login" className="hover:text-surface-900">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-surface-900 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-surface-500">
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Nagercoil, Kanyakumari, TN</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 4652 230 000</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> pilot@educonnect.tn.gov.in</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-surface-200 text-center">
            <p className="text-xs text-surface-400">
              © 2026 EduConnect Kanyakumari. Developed for the School Education Department, Government of Tamil Nadu. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
