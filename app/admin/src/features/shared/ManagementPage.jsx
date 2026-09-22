import { Plus } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader.jsx'
import { DataTable } from '../../components/ui/DataTable.jsx'
import { ErrorState, LoadingState } from '../../components/ui/StateBlock.jsx'

export function ManagementPage({
  title,
  description,
  records = [],
  columns = [],
  searchKeys = [],
  isLoading = false,
  error = null,
  actions,
  primaryAction = 'Create',
}) {
  if (isLoading) {
    return <LoadingState label={`Loading ${title.toLowerCase()}...`} />
  }

  if (error) {
    return <ErrorState message={error.message} />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus size={16} />
            {primaryAction}
          </button>
        }
      />
      {columns.length ? (
        <DataTable columns={columns} rows={records} searchKeys={searchKeys} actions={actions} />
      ) : (
        <section className="bg-white rounded-2xl p-10 border border-slate-200/80 text-center space-y-2">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">{description}</p>
        </section>
      )}
    </div>
  )
}
