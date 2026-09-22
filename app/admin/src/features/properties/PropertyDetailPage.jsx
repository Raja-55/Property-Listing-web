import { useParams } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader.jsx'
import { ErrorState, LoadingState } from '../../components/ui/StateBlock.jsx'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'
import { formatCurrency, formatNumber } from '../../utils/formatters.js'

export function PropertyDetailPage() {
  const { propertyId } = useParams()
  const { data: property, error, isLoading } = useAdminResource(
    `property:${propertyId}`,
    () => adminRepository.getProperty(propertyId),
    [propertyId],
  )

  if (isLoading) return <LoadingState />
  if (error || !property) return <ErrorState message="Unable to load this property." />

  return (
    <div className="space-y-6">
      <PageHeader
        title={property.title}
        description="Gallery, owner information, legal verification status, enquiry metrics, and audit history."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all"
            >
              Reject
            </button>
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm rounded-xl transition-all"
            >
              Approve Listing
            </button>
          </div>
        }
      />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-lg border border-slate-700 shadow-xs">
          <span>{property.category} Image Gallery</span>
        </div>

        <article className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Listing Overview</h3>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Price:</strong> {formatCurrency(property.price)}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Location:</strong> {property.city}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Owner:</strong> {property.owner}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Category:</strong> {property.type}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">BHK:</strong> {property.bhk}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Area:</strong> {property.area}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Views:</strong> {formatNumber(property.views)}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Enquiries:</strong> {property.enquiries}</p>
          <div className="pt-2 flex items-center gap-2">
            <StatusBadge status={property.verification} />
            <StatusBadge status={property.status} />
          </div>
        </article>
      </section>

      {/* Audit Workflow Stepper */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Audit & Verification Timeline</h4>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          {['SUBMITTED', 'PENDING_REVIEW', 'VERIFIED', 'APPROVED', 'PUBLISHED'].map((step, idx) => (
            <span
              key={step}
              className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
            >
              {idx + 1}. {step}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
