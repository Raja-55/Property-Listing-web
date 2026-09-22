import { useState } from 'react'
import { Check, ShieldCheck, User, X } from 'lucide-react'
import { useAdminData } from '../../context/AdminDataContext.jsx'

export function ProfileModal({ isOpen, onClose }) {
  const { profile, updateProfile } = useAdminData()
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    role: profile.role,
    phone: '+91 98765 43210',
    notifications: true,
  })
  const [isSaved, setIsSaved] = useState(false)

  if (!isOpen) return null

  function handleSubmit(e) {
    e.preventDefault()
    updateProfile({
      name: formData.name,
      email: formData.email,
      role: formData.role,
    })
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
      onClose()
    }, 800)
  }

  const initials = formData.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-7 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Admin Profile & Settings</h3>
              <p className="text-xs text-slate-500">Manage your administrative account preferences</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border border-blue-100">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              {initials}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">{formData.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-100 text-blue-700">
                  <ShieldCheck size={13} /> {formData.role}
                </span>
                <span className="text-xs text-slate-500">Full System Access</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="adminName" className="block text-xs font-bold uppercase text-slate-600 tracking-wider">
              Full Name
            </label>
            <input
              id="adminName"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="adminEmail" className="block text-xs font-bold uppercase text-slate-600 tracking-wider">
              Email Address
            </label>
            <input
              id="adminEmail"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="adminPhone" className="block text-xs font-bold uppercase text-slate-600 tracking-wider">
              Phone Number
            </label>
            <input
              id="adminPhone"
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.notifications}
                onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-slate-700">
                Receive real-time system alerts & audit notifications
              </span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 rounded-xl transition-all"
            >
              {isSaved ? (
                <>
                  <Check size={16} /> Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
