import { useState } from 'react'
import {
  Bath,
  Building,
  CheckCircle2,
  Edit,
  Eye,
  MapPin,
  Maximize,
  Plus,
  Search,
  Trash2,
  XCircle,
} from 'lucide-react'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

export function PropertiesPage() {
  const { data: properties, isLoading, mutate } = useAdminResource('properties', () =>
    adminRepository.getProperties(),
  )
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading || !properties) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading Property Directory...</p>
      </div>
    )
  }

  const currentProp = selectedProperty || properties[0]

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  async function handleApprove(id) {
    await adminRepository.approveListing(id)
    mutate()
  }

  async function handleReject(id) {
    await adminRepository.rejectListing(id)
    mutate()
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Property Listings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Audit, verify, approve, and manage residential and commercial listings.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Add Property
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>All Cities</option>
            <option>Bengaluru</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
          </select>
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>Property Type</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>All Statuses</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="relative flex-1 sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800 font-medium"
          />
        </div>
      </div>

      {/* Main Grid: Table & Property Inspector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Column */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Property</th>
                  <th className="px-4 py-3.5">Owner</th>
                  <th className="px-4 py-3.5">City</th>
                  <th className="px-4 py-3.5">Price</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredProperties.map((p) => {
                  const isSelected = currentProp?.id === p.id
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedProperty(p)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/60 font-semibold' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white text-base flex items-center justify-center shrink-0 shadow-xs">
                            🏠
                          </div>
                          <div className="truncate max-w-[180px]">
                            <strong className="text-slate-900 font-bold block truncate">{p.title}</strong>
                            <span className="text-[10px] text-slate-400 font-semibold">{p.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 truncate">{p.owner}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">{p.city}</td>
                      <td className="px-4 py-3.5 text-xs font-bold text-slate-900">{p.price}</td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => setSelectedProperty(p)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Detail"
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
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Property Preview Card */}
        {currentProp && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
            <div>
              {/* Hero Header */}
              <div className="relative h-44 bg-gradient-to-r from-slate-800 to-slate-900 p-4 flex flex-col justify-between text-white">
                <span className="absolute top-4 right-4">
                  <StatusBadge status={currentProp.status} />
                </span>
                <div className="mt-auto">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase">
                    {currentProp.category || 'Apartment'}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 truncate">{currentProp.title}</h3>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-5 space-y-4">
                <p className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <MapPin size={14} className="text-rose-500 shrink-0" /> {currentProp.city}, India
                </p>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Config</span>
                    <strong className="text-slate-800 font-bold">{currentProp.bhk || '3 BHK'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Baths</span>
                    <strong className="text-slate-800 font-bold">{currentProp.baths || '2 Baths'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Area</span>
                    <strong className="text-slate-800 font-bold">{currentProp.area || '1,600 sqft'}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Listed Price</span>
                  <strong className="text-lg font-black text-blue-700">{currentProp.price}</strong>
                </div>

                <div className="text-xs space-y-1 text-slate-600 pt-2 border-t border-slate-100">
                  <p><strong className="text-slate-900">Owner:</strong> {currentProp.owner}</p>
                  <p><strong className="text-slate-900">Listing ID:</strong> {currentProp.id}</p>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleApprove(currentProp.id)}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                <CheckCircle2 size={14} /> Approve
              </button>
              <button
                type="button"
                onClick={() => handleReject(currentProp.id)}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                <XCircle size={14} /> Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
