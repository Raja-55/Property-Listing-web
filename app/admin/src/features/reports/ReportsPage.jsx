import { useState } from 'react'
import { Eye, Flag, AlertTriangle } from 'lucide-react'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

export function ReportsPage() {
  const { data: reports, isLoading } = useAdminResource('reports', () =>
    adminRepository.getReports(),
  )
  const [selectedReport, setSelectedReport] = useState(null)

  if (isLoading || !reports) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading Flagged Reports & Moderation...</p>
      </div>
    )
  }

  const currentReport = selectedReport || reports[0]

  return (
    <div className="space-y-6">
      <div className="pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reports & Content Moderation</h1>
        <p className="text-sm text-slate-500 mt-1">
          Investigate flagged listings, user complaints, fake profiles, and pricing discrepancies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Categories Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Report Categories</span>
            <span className="text-[10px] bg-rose-50 text-rose-600 border border-rose-200/60 px-2 py-0.5 rounded-full font-bold">
              42 Open
            </span>
          </h3>

          <div className="space-y-1">
            {[
              { label: 'Fake Property', count: 14, active: true },
              { label: 'Incorrect Price', count: 8 },
              { label: 'Owner Unreachable', count: 5 },
              { label: 'Duplicate Listing', count: 12 },
              { label: 'Inaccurate Info', count: 3 },
            ].map((cat, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors ${
                  cat.active
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  cat.active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Selected Report Detail Card */}
        {currentReport && (
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Report #{currentReport.id}</h3>
                    <p className="text-xs text-slate-500">Category: {currentReport.category}</p>
                  </div>
                </div>
                <StatusBadge status={currentReport.status} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 my-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Property</span>
                  <strong className="text-slate-900 font-bold text-xs truncate block">{currentReport.property}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Reporter</span>
                  <strong className="text-slate-900 font-bold text-xs truncate block">{currentReport.reporter}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Owner</span>
                  <strong className="text-slate-900 font-bold text-xs truncate block">{currentReport.owner}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Submitted</span>
                  <strong className="text-slate-900 font-bold text-xs block">{currentReport.date}</strong>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Resolution Timeline</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">Report submitted by buyer</strong>
                      <span className="text-[11px] text-slate-500">May 20, 2025 - 10:35 AM</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">Assigned to moderation queue</strong>
                      <span className="text-[11px] text-slate-500">May 20, 2025 - 11:10 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                <Eye size={14} /> View Property Page
              </button>
              <button
                type="button"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 rounded-xl transition-all"
              >
                Take Moderation Action
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
