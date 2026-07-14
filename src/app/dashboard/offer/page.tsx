"use client";

import React, { useState } from "react";
import { Award, Zap, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { StatusChip } from "@/components/shared";

const initialOffers = [
  { id: 1, title: "National Merit Scholarship Program", type: "scholarship", status: "eligible", details: "Government funding support of ₹12,000/year for higher secondary education based on stellar Class 10 academic and attendance records.", actionLabel: "Apply Scholarship" },
  { id: 2, title: "District Science Fair 2026", type: "competition", status: "nominated", details: "Nominated by Science teacher Mr. D. Arul Selvan to represent GHSS Nagercoil in the regional science exhibition project.", actionLabel: "Accept Nomination" },
  { id: 3, title: "Special STEM Coding BootCamp", type: "training", status: "open", details: "Free 4-week weekend workshop on Python Programming and web development, sponsored by the Directorate of School Education.", actionLabel: "Register Free" },
];

export default function OfferPage() {
  const [offers, setOffers] = useState(initialOffers);
  const [successMsg, setSuccessMsg] = useState("");

  const handleAction = (id: number, title: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "accepted" } : o))
    );
    setSuccessMsg(`Successfully registered for: ${title}`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Offers &amp; Opportunities</h1>
        <p className="text-sm text-surface-500 mt-0.5">Explore scholarships, school club invitations, and co-curricular programs</p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl border border-success-200 bg-success-50 text-success-800 flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="h-5 w-5 text-success-600 flex-shrink-0" />
          <p className="text-sm font-semibold">{successMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => {
          const Icon = offer.type === "scholarship" ? Award : offer.type === "competition" ? Zap : Users;
          return (
            <ChartCard key={offer.id} title={offer.title} subtitle={offer.type.toUpperCase()}>
              <div className="space-y-4 pt-2 flex flex-col justify-between h-full min-h-[180px]">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <StatusChip status={offer.status} />
                  </div>
                  <p className="text-sm text-surface-600 leading-relaxed pt-1">
                    {offer.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-100">
                  {offer.status === "accepted" ? (
                    <button disabled className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-success-50 text-success-700 text-xs font-bold border border-success-200 cursor-not-allowed">
                      <CheckCircle2 className="h-4 w-4" /> Registered / Enrolled
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction(offer.id, offer.title)}
                      className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-lg bg-teal-600 hover:bg-teal-700 text-xs font-semibold text-white transition-colors"
                    >
                      {offer.actionLabel} <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </ChartCard>
          );
        })}
      </div>
    </div>
  );
}
