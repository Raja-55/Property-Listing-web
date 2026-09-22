import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '../../components/ui/PageHeader.jsx'
import { ErrorState, LoadingState } from '../../components/ui/StateBlock.jsx'
import { useAdminData } from '../../context/AdminDataContext.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

const colors = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444']

export function AnalyticsPage() {
  const { period } = useAdminData()
  const { data, error, isLoading } = useAdminResource(
    `analytics:${period}`,
    () => adminRepository.getDashboard({ period }),
    [period],
  )

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message={error.message} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Platform Intelligence"
        description="Deep dive telemetry into acquisition trends, city distributions, demand volume, and user conversion funnels."
      />

      {/* Filter Strip */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-3">
        <select className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
          <option>Last 30 days</option>
          <option>Last 6 months</option>
          <option>Last 1 year</option>
        </select>
        <select className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
          <option>All Cities</option>
          <option>Kolkata</option>
          <option>Mumbai</option>
        </select>
        <select className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
          <option>All Categories</option>
          <option>Residential</option>
          <option>Commercial</option>
        </select>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Multi-Metric Growth Trends</h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.growth}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Area type="monotone" dataKey="users" name="Users" stroke="#2563eb" fill="#dbeafe" />
                <Area type="monotone" dataKey="properties" name="Properties" stroke="#10b981" fill="#dcfce7" />
                <Area type="monotone" dataKey="enquiries" name="Enquiries" stroke="#8b5cf6" fill="#f3e8ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Category Distribution</h3>
          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.distribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={88}>
                  {data.distribution.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">City-wise Inventory Density</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.cityInventory}>
                <XAxis dataKey="city" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="listings" name="Active Listings" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>
    </div>
  )
}
