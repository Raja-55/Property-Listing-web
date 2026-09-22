import { useState } from 'react'
import {
  Building2,
  Calendar,
  Clock,
  Eye,
  MessageSquare,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from 'lucide-react'
import {
  Area,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAdminData } from '../../context/AdminDataContext.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

const distColors = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b']

function KpiCard({ title, value, change, period, tone, currency, displayValue, icon: Icon }) {
  const isNegative = change < 0

  let toneBg = 'bg-blue-50 text-blue-600 border-blue-100'
  if (tone === 'emerald' || tone === 'green') toneBg = 'bg-emerald-50 text-emerald-600 border-emerald-100'
  if (tone === 'purple') toneBg = 'bg-purple-50 text-purple-600 border-purple-100'
  if (tone === 'amber' || tone === 'orange') toneBg = 'bg-amber-50 text-amber-600 border-amber-100'

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className={`p-2.5 rounded-xl border ${toneBg} transition-transform group-hover:scale-110`}>
          <Icon size={19} />
        </span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
            isNegative
              ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
              : 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
          }`}
        >
          {isNegative ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
          {Math.abs(change)}%
        </span>
      </div>

      <div className="mt-4">
        <span className="text-2xl font-black tracking-tight text-slate-900 block">
          {displayValue || (currency ? `₹${value.toLocaleString('en-IN')}` : value.toLocaleString('en-IN'))}
        </span>
        <span className="text-xs font-semibold text-slate-500 mt-1 block truncate">{title}</span>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Compared to prev.</span>
        <span className="font-semibold text-slate-600">{period}</span>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const { period } = useAdminData()
  const [activeChartMetric, setActiveChartMetric] = useState('users')
  const { data, isLoading } = useAdminResource(
    `dashboard:${period}`,
    () => adminRepository.getDashboard({ period }),
    [period],
  )

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-2xl border border-slate-200/80">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading Dashboard Telemetry...</p>
      </div>
    )
  }

  const kpiIcons = [Users, UserCheck, Building2, Building2, Clock, MessageSquare, Eye, Wallet]

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Analytics & Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time metric telemetry, listing audits, and property activity across HAVENLY.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 shadow-xs">
          <Calendar size={15} className="text-blue-600" />
          <span>Apr 22, 2025 - May 21, 2025</span>
        </div>
      </div>

      {/* KPI Cards Grid (8 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.kpis.map((item, idx) => (
          <KpiCard key={item.title} {...item} icon={kpiIcons[idx] || TrendingUp} />
        ))}
      </div>

      {/* Row 1: Interactive Growth Chart & Property Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">User & Property Growth</h3>
              <p className="text-xs text-slate-500 mt-0.5">Platform acquisition and engagement trends</p>
            </div>
            {/* Metric Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { key: 'users', label: 'Users', color: 'blue' },
                { key: 'properties', label: 'Properties', color: 'emerald' },
                { key: 'revenue', label: 'Revenue', color: 'purple' },
                { key: 'enquiries', label: 'Enquiries', color: 'cyan' },
                { key: 'visits', label: 'Visits', color: 'pink' },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setActiveChartMetric(m.key)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    activeChartMetric === m.key
                      ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data.growth} margin={{ top: 15, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    fontSize: '12px',
                  }}
                />

                {activeChartMetric === 'users' && (
                  <Area
                    type="monotone"
                    dataKey="users"
                    name="Users"
                    stroke="#2563eb"
                    strokeWidth={3}
                    fill="url(#blueGradient)"
                  />
                )}
                {activeChartMetric === 'properties' && (
                  <Area
                    type="monotone"
                    dataKey="properties"
                    name="Properties"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#greenGradient)"
                  />
                )}
                {activeChartMetric === 'revenue' && (
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fill="url(#purpleGradient)"
                  />
                )}
                {activeChartMetric === 'enquiries' && (
                  <Line
                    type="monotone"
                    dataKey="enquiries"
                    name="Enquiries"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#06b6d4' }}
                  />
                )}
                {activeChartMetric === 'visits' && (
                  <Line
                    type="monotone"
                    dataKey="visits"
                    name="Visits"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#ec4899' }}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Distribution Donut Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Property Distribution</h3>
            <p className="text-xs text-slate-500 mt-0.5">By category type</p>
          </div>

          <div className="relative flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={data.distribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={3}
                >
                  {data.distribution.map((entry, idx) => (
                    <Cell key={entry.name} fill={distColors[idx % distColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <strong className="text-xl font-black text-slate-900 leading-tight">12,845</strong>
              <small className="text-[11px] font-semibold text-slate-500">Total Properties</small>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {data.distribution.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: distColors[idx % distColors.length] }}
                />
                <span className="text-xs font-semibold text-slate-700 truncate">{item.name}</span>
                <strong className="text-xs font-bold text-slate-900 ml-auto">{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: City Inventory, Buy vs Rent, Top Performing Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* City-wise Inventory Table */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h3 className="text-lg font-bold text-slate-900 mb-4">City-wise Inventory</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase font-semibold text-slate-400 border-b border-slate-100 pb-2">
                <tr>
                  <th className="pb-2">City</th>
                  <th className="pb-2">Properties</th>
                  <th className="pb-2 text-right">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {data.cityInventory.map((row) => (
                  <tr key={row.city} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 flex items-center gap-2 font-semibold text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      {row.city}
                    </td>
                    <td className="py-2.5">
                      <strong className="text-slate-900">{row.listings.toLocaleString('en-IN')}</strong>
                    </td>
                    <td className="py-2.5 text-right font-bold text-blue-600">{row.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 font-semibold">
            Showing top cities across India
          </div>
        </div>

        {/* Buy vs Rent Donut */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Buy vs Rent Split</h3>
          <div className="relative flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Buy', value: 54, fill: '#2563eb' },
                    { name: 'Rent', value: 46, fill: '#f43f5e' },
                  ]}
                  dataKey="value"
                  innerRadius={52}
                  outerRadius={78}
                >
                  <Cell fill="#2563eb" />
                  <Cell fill="#f43f5e" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <strong className="text-2xl font-black text-slate-900">54%</strong>
              <small className="text-xs font-semibold text-slate-500">Buy Listings</small>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-100 text-xs font-bold">
            <span className="flex items-center gap-2 text-blue-600">
              <span className="w-3 h-3 rounded-full bg-blue-600" /> 54% Buy
            </span>
            <span className="flex items-center gap-2 text-rose-600">
              <span className="w-3 h-3 rounded-full bg-rose-500" /> 46% Rent
            </span>
          </div>
        </div>

        {/* Top Performing Listings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Performing Listings</h3>
          <div className="space-y-3">
            {data.topListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                  🏢
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <strong className="text-xs font-bold text-slate-900 truncate">{listing.name}</strong>
                  <span className="text-[11px] text-slate-500 truncate">
                    {listing.city} · {listing.price}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 shrink-0">
                  {listing.views}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
