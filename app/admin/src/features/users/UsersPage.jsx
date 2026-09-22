import { useState } from 'react'
import {
  Calendar,
  Eye,
  Filter,
  Lock,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  UserCheck,
} from 'lucide-react'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

export function UsersPage() {
  const { data: users, isLoading } = useAdminResource('users', () => adminRepository.getUsers())
  const [selectedUser, setSelectedUser] = useState(null)
  const [activeTab, setActiveTab] = useState('activity')
  const [searchTerm, setSearchTerm] = useState('')
  const [userTypeFilter, setUserTypeFilter] = useState('ALL')

  if (isLoading || !users) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Loading User Directory...</p>
      </div>
    )
  }

  const currentUser = selectedUser || users[0]

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = userTypeFilter === 'ALL' || u.type.toUpperCase() === userTypeFilter.toUpperCase()
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Directory & Accounts</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage user profiles, activity logs, permissions, and account statuses.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} /> Add New User
        </button>
      </div>

      {/* Filter Toolbar Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="ALL">All User Types</option>
            <option value="BUYER">Buyer</option>
            <option value="OWNER">Owner</option>
          </select>
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>All States</option>
            <option>West Bengal</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500">
            <Calendar size={14} className="text-slate-400" />
            <span>Join Date</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800 font-medium"
            />
          </div>
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* User Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Avatar</th>
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Phone</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredUsers.map((u) => {
                const initials = u.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                const isSelected = currentUser?.id === u.id

                return (
                  <tr
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/60 font-semibold' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                        {initials}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-900 font-bold">{u.name}</td>
                    <td className="px-5 py-3.5 text-slate-600">{u.email}</td>
                    <td className="px-5 py-3.5 text-slate-600">{u.phone}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {u.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setSelectedUser(u)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Block"
                        >
                          <Lock size={15} />
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

      {/* Selected User Details Inspector Card */}
      {currentUser && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-3 lg:border-r lg:border-slate-100 lg:pr-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-md shadow-blue-500/20">
              {currentUser.name[0]}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{currentUser.name}</h3>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {currentUser.type}
              </span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600 w-full pt-2 border-t border-slate-100">
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-slate-400 shrink-0" /> {currentUser.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-slate-400 shrink-0" /> {currentUser.phone}
              </p>
              <p className="text-[11px] text-slate-400 pt-1">Joined: {currentUser.joined}</p>
            </div>
            <div className="flex gap-2 w-full pt-2">
              <button
                type="button"
                className="flex-1 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all"
              >
                Block Account
              </button>
              <button
                type="button"
                className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto">
              {['activity', 'enquiries', 'properties', 'bookings'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pt-2">
              {activeTab === 'activity' ? (
                <div className="space-y-3">
                  {[
                    { title: 'Viewed property - Luxury 3 BHK', time: 'May 10, 2025 - 2:30 PM' },
                    { title: 'Sent Inquiry for Villa in Bandra', time: 'May 10, 2025 - 5:12 PM' },
                    { title: 'Logged in from Mumbai (Chrome / macOS)', time: 'May 10, 2025 - 10:24 AM' },
                  ].map((act, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-xs font-bold text-slate-900 block">{act.title}</strong>
                        <span className="text-[11px] text-slate-500">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic py-4">No recent {activeTab} records found for this user.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
