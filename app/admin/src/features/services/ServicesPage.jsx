import { useState } from 'react'
import { Edit, Eye, Plus, Trash2, Wrench } from 'lucide-react'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

export function ServicesPage() {
  const { data: services, isLoading } = useAdminResource('services', () =>
    adminRepository.getServices(),
  )
  const [activeTab, setActiveTab] = useState('services')

  if (isLoading || !services) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading Services & Maintenance Telemetry...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Service Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage services, verified vendors/providers, pricing models, availability, and customer bookings.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex items-center gap-1 overflow-x-auto">
        {['services', 'providers', 'bookings', 'complaints', 'reviews'].map((tab) => (
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

      {/* Services Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Service Name</th>
                <th className="px-5 py-3.5">Vendor / Provider</th>
                <th className="px-5 py-3.5">Pricing</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 text-base flex items-center justify-center font-bold shadow-xs">
                      🛠️
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-slate-900">{s.service}</td>
                  <td className="px-5 py-3.5 text-slate-600">{s.provider}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-900">{s.price}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
