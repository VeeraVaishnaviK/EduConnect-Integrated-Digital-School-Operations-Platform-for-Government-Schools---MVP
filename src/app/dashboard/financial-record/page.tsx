"use client";

import React, { useState } from "react";
import { CreditCard, CheckCircle2, DollarSign, Download, ArrowUpRight } from "lucide-react";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusChip } from "@/components/shared";

const initialInvoices = [
  { id: "INV-2026-01", description: "Tuition Fee (Term 1)", amount: 1500, status: "paid", date: "2026-06-10" },
  { id: "INV-2026-02", description: "Science Lab Materials Fee", amount: 350, status: "paid", date: "2026-06-12" },
  { id: "INV-2026-03", description: "Library Annual Subscription", amount: 120, status: "paid", date: "2026-06-12" },
  { id: "INV-2026-04", description: "Examination Fee (Term 1)", amount: 250, status: "pending", date: "2026-07-02" },
];

export default function FinancialRecordPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const pendingAmount = invoices
    .filter((inv) => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const paidAmount = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const handlePayment = () => {
    setPaying(true);
    setTimeout(() => {
      setInvoices((prev) =>
        prev.map((inv) => (inv.status === "pending" ? { ...inv, status: "paid" } : inv))
      );
      setPaying(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Financial Record</h1>
        <p className="text-sm text-surface-500 mt-0.5">Manage school fees, payment records, and download receipts</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Total Term Fees" value="₹2,220" icon={CreditCard} iconColor="text-primary-600" iconBg="bg-primary-50" />
        <KPICard title="Paid Amount" value={`₹${paidAmount}`} icon={CheckCircle2} iconColor="text-success-600" iconBg="bg-success-50" />
        <KPICard title="Pending Dues" value={`₹${pendingAmount}`} icon={DollarSign} iconColor="text-danger-600" iconBg="bg-danger-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee structure table */}
        <div className="lg:col-span-2">
          <ChartCard title="Fee Statement & Invoices" subtitle="Detailed statement for Academic Year 2026-27">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-surface-50 text-surface-500 font-bold border-b border-surface-200">
                  <tr>
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-surface-50/50">
                      <td className="py-3 px-4 font-mono text-xs font-semibold text-surface-700">{inv.id}</td>
                      <td className="py-3 px-4 font-medium text-surface-800">{inv.description}</td>
                      <td className="py-3 px-4 text-xs text-surface-500">{new Date(inv.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                      <td className="py-3 px-4 font-bold text-surface-800">₹{inv.amount}</td>
                      <td className="py-3 px-4">
                        <StatusChip status={inv.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        {inv.status === "paid" ? (
                          <button className="p-1 text-teal-600 hover:text-teal-800 transition-colors" title="Download Receipt">
                            <Download className="h-4 w-4" />
                          </button>
                        ) : (
                          <span className="text-xs text-surface-300">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>

        {/* Payment portal */}
        <div className="lg:col-span-1">
          {pendingAmount > 0 ? (
            <ChartCard title="Quick Pay" subtitle="Instant digital payment options">
              <div className="space-y-4 pt-2">
                <div className="bg-surface-50 rounded-xl p-4 border border-surface-200 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-surface-500">Unpaid Fees Count</span>
                    <span className="font-bold text-surface-800">1 Item</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-surface-200 pt-2">
                    <span className="font-semibold text-surface-700">Net Payable Amount</span>
                    <span className="text-base font-bold text-danger-600">₹{pendingAmount}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-semibold text-surface-500 block">Payment Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-teal-500 bg-teal-50/10 text-teal-700 text-xs font-bold gap-1 text-center">
                      <CreditCard className="h-4.5 w-4.5" /> UPI / Cards
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-surface-200 hover:border-surface-300 text-surface-500 text-xs font-medium gap-1 text-center">
                      <ArrowUpRight className="h-4.5 w-4.5" /> Net Banking
                    </button>
                  </div>
                </div>

                {paying ? (
                  <button disabled className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-teal-600 text-sm font-semibold text-white opacity-50 cursor-not-allowed">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing Payment...
                  </button>
                ) : (
                  <button onClick={handlePayment} className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg bg-teal-600 hover:bg-teal-700 text-sm font-semibold text-white transition-colors">
                    Pay Outstanding ₹{pendingAmount}
                  </button>
                )}
              </div>
            </ChartCard>
          ) : (
            <ChartCard title="Account Clear" subtitle="Zero outstanding fees">
              <div className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-success-50 flex items-center justify-center text-success-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-surface-800">All Fees Paid</h3>
                  <p className="text-xs text-surface-400 mt-1">Excellent! There are no pending fee collections associated with your account.</p>
                </div>
              </div>
            </ChartCard>
          )}
        </div>
      </div>
    </div>
  );
}
