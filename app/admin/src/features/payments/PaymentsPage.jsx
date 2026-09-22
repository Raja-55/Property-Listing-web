import { useState } from 'react'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

export function PaymentsPage() {
  const { data: payments, isLoading } = useAdminResource('payments', () =>
    adminRepository.getPayments(),
  )
  const [activeTab, setActiveTab] = useState('transactions')

  if (isLoading || !payments) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading Financial Transactions...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payments & Financial Audit</h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor transactions, refunds, subscriptions, gateway logs, and platform revenue streams.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 block">Total Revenue</span>
          <strong className="text-2xl font-black text-slate-900 block">₹24.8 Lakh</strong>
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            ↑ 16% vs last 30d
          </span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 block">Successful Transactions</span>
          <strong className="text-2xl font-black text-slate-900 block">1,204</strong>
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            ✓ 96.2% Success Rate
          </span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 block">Failed Transactions</span>
          <strong className="text-2xl font-black text-slate-900 block">42</strong>
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
            ✕ 3.4% Failure Rate
          </span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 block">Total Refunded</span>
          <strong className="text-2xl font-black text-slate-900 block">18</strong>
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            ↺ 1.4% Refund Rate
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex items-center gap-1 overflow-x-auto">
        {['transactions', 'refunds', 'subscriptions', 'payouts', 'commissions'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Item / Service</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment Method</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-900">{p.id}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-800">{p.user}</td>
                  <td className="px-5 py-3.5 text-slate-600">{p.service}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-900">{p.amount}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{p.method}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
