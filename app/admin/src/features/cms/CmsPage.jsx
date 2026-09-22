import { useState } from 'react'
import { Image as ImageIcon, Plus } from 'lucide-react'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

export function CmsPage() {
  const { data: cmsItems, isLoading } = useAdminResource('cms', () => adminRepository.getCms())
  const [activeCategory, setActiveCategory] = useState('Homepage Banners')

  if (isLoading || !cmsItems) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading Content Management System...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Content Management (CMS)</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage promotional banners, homepage slides, FAQs, SEO metadata, and legal terms.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Add Content Banner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Categories List */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider px-3 pb-2 border-b border-slate-100 mb-2">
            Content Modules
          </h3>
          {['Homepage Banners', 'FAQs', 'Localities', 'SEO Metadata', 'Terms & Conditions', 'Privacy Policy'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Banners Card Grid */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">{activeCategory}</h3>
            <span className="text-xs font-semibold text-slate-500">{cmsItems.length} Entries</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cmsItems.map((item) => (
              <div
                key={item.id}
                className="group bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="h-32 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 mb-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <ImageIcon size={32} />
                </div>
                <div className="space-y-2">
                  <strong className="text-sm font-bold text-slate-900 block truncate">{item.title}</strong>
                  <span className="text-[11px] text-slate-500 block">Updated: {item.updated}</span>
                  <div className="pt-1">
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
