import { sentenceCase } from '../../utils/formatters.js'

export function StatusBadge({ status }) {
  const normalized = status?.toLowerCase() || ''
  
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200'
  if (['active', 'completed', 'success', 'verified', 'resolved', 'published', 'paid'].includes(normalized)) {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-xs shadow-emerald-500/5'
  } else if (['pending', 'processing', 'in_progress', 'under_review', 'warning'].includes(normalized)) {
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200/80 shadow-xs shadow-amber-500/5'
  } else if (['inactive', 'failed', 'rejected', 'cancelled', 'suspended', 'high', 'urgent'].includes(normalized)) {
    colorClasses = 'bg-rose-50 text-rose-700 border-rose-200/80 shadow-xs shadow-rose-500/5'
  } else if (['info', 'draft', 'medium', 'open'].includes(normalized)) {
    colorClasses = 'bg-blue-50 text-blue-700 border-blue-200/80 shadow-xs shadow-blue-500/5'
  } else if (['low', 'admin'].includes(normalized)) {
    colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200/80 shadow-xs shadow-indigo-500/5'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colorClasses} capitalize transition-all duration-150`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {sentenceCase(status || 'N/A')}
    </span>
  )
}
