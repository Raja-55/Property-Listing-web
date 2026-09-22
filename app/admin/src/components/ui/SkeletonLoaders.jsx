export function SkeletonCard({ height = 120, className = '' }) {
  return (
    <div
      className={`animate-pulse bg-slate-200/70 rounded-2xl ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    />
  )
}

export function SkeletonKpis({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-5 bg-white rounded-2xl border border-slate-200/80 animate-pulse space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-slate-200" />
            <div className="w-16 h-5 rounded-full bg-slate-200" />
          </div>
          <div className="w-24 h-7 rounded-lg bg-slate-200" />
          <div className="w-32 h-4 rounded-md bg-slate-150" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonChart({ height = 280, title = 'Loading Analytics...' }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/80 animate-pulse space-y-4" style={{ minHeight: `${height}px` }}>
      <div className="w-40 h-6 rounded-md bg-slate-200" />
      <div className="w-full rounded-xl bg-slate-100" style={{ height: `${height - 60}px` }} />
    </div>
  )
}

export function SkeletonDashboard() {
  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="animate-pulse space-y-2">
        <div className="w-32 h-4 rounded-md bg-slate-200" />
        <div className="w-64 h-8 rounded-lg bg-slate-200" />
      </div>
      <SkeletonKpis count={8} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white rounded-2xl border border-slate-200/80 animate-pulse space-y-4 h-80">
          <div className="w-48 h-6 rounded-md bg-slate-200" />
          <div className="w-full h-56 rounded-xl bg-slate-100" />
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200/80 animate-pulse space-y-4 h-80">
          <div className="w-36 h-6 rounded-md bg-slate-200" />
          <div className="w-full h-56 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  )
}
