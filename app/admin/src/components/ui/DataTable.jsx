import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { EmptyState } from './StateBlock.jsx'

export function DataTable({ columns, rows, searchKeys = [], actions }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return rows
    }
    return rows.filter((row) =>
      searchKeys.some((key) => String(row[key] || '').toLowerCase().includes(normalizedQuery)),
    )
  }, [query, rows, searchKeys])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))
  const pagedRows = filteredRows.slice((page - 1) * pageSize, page * pageSize)

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all">
      {/* Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            aria-label="Filter status"
            className="w-full sm:w-auto px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
          >
            <option>All statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Reported</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      {pagedRows.length === 0 ? (
        <EmptyState message="No matching records found." />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 text-xs uppercase font-semibold tracking-wider">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                      {column.label}
                      {column.sortable ? <ArrowUpDown size={13} className="text-slate-400" /> : null}
                    </span>
                  </th>
                ))}
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {pagedRows.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-4">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  <td className="px-5 py-4 text-right">
                    {actions ? (
                      actions(row)
                    ) : (
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>
          Showing page <strong className="text-slate-800">{page}</strong> of <strong className="text-slate-800">{totalPages}</strong> ({filteredRows.length} total)
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
