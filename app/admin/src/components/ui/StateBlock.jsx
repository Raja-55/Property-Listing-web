import { AlertCircle, Inbox, Loader2 } from 'lucide-react'

export function LoadingState({ label = 'Loading admin data...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/80 text-center shadow-xs">
      <Loader2 size={32} className="animate-spin text-blue-600 mb-3" />
      <p className="text-sm font-semibold text-slate-600">{label}</p>
    </div>
  )
}

export function ErrorState({ message = 'Unable to load this section. Try again.' }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-rose-50/50 rounded-2xl border border-rose-200 text-center">
      <div className="p-3 rounded-full bg-rose-100 text-rose-600 mb-3">
        <AlertCircle size={26} />
      </div>
      <h4 className="text-base font-bold text-rose-900">Something went wrong</h4>
      <p className="text-sm text-rose-600 mt-1 max-w-md">{message}</p>
    </div>
  )
}

export function EmptyState({ message = 'No records found.' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/80 text-center">
      <div className="p-3.5 rounded-2xl bg-slate-100 text-slate-400 mb-3">
        <Inbox size={28} />
      </div>
      <h4 className="text-base font-bold text-slate-800">Nothing here yet</h4>
      <p className="text-sm text-slate-500 mt-1 max-w-md">{message}</p>
    </div>
  )
}
