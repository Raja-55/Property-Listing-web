import { useState } from 'react'
import { Plus } from 'lucide-react'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

export function SupportPage() {
  const { data: supportTickets, isLoading } = useAdminResource('support', () =>
    adminRepository.getSupport(),
  )
  const [activeTab, setActiveTab] = useState('tickets')

  if (isLoading || !supportTickets) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading Help & Support Desk...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Help Desk & Support Center</h1>
          <p className="text-sm text-slate-500 mt-1">
            Resolve customer queries, manage support tickets, FAQs, and live assistance.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Create Ticket
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex items-center gap-1 overflow-x-auto">
        {['tickets', 'faq', 'articles', 'chat'].map((tab) => (
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

      {/* Support Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Ticket ID</th>
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Submitted Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {supportTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-slate-900">{t.id}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-800">{t.user}</td>
                  <td className="px-5 py-3.5 text-slate-600">{t.category}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={t.priority} />
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right text-xs text-slate-500">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
