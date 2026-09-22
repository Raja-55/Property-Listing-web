import { useState } from 'react'
import { Bell, Key, Lock, Save, Settings, Shield, UserCircle, Eye, EyeOff } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader.jsx'
import { useAdminData } from '../../context/AdminDataContext.jsx'

const SECTIONS = [
  { key: 'profile', label: 'Profile', icon: UserCircle },
  { key: 'security', label: 'Security', icon: Lock },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'privacy', label: 'Privacy', icon: Shield },
  { key: 'sessions', label: 'Sessions', icon: Key },
  { key: 'account', label: 'Account', icon: Settings },
]

function ProfileSection({ profile, updateProfile }) {
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    mobile: '+91 90000 00000',
    role: profile.role,
  })
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    updateProfile({ name: form.name, email: form.email })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
          {form.name[0]}
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">{form.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{form.email}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700">
            {form.role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'Full Name', key: 'name', type: 'text' },
          { label: 'Email Address', key: 'email', type: 'email' },
          { label: 'Mobile Number', key: 'mobile', type: 'tel' },
          { label: 'Admin Role', key: 'role', type: 'text', readonly: true },
        ].map((field) => (
          <div key={field.key} className="space-y-1">
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
              {field.label}
            </label>
            <input
              type={field.type}
              value={form[field.key]}
              readOnly={field.readonly}
              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all ${
                field.readonly ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            />
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all"
        >
          <Save size={15} />
          {saved ? 'Saved Successfully!' : 'Save Profile'}
        </button>
      </div>
    </form>
  )
}

function SecuritySection() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-start gap-3">
        <Shield size={18} className="text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-emerald-900">Two-Factor Authentication is Active</p>
          <p className="text-xs text-emerald-700 mt-0.5">Your account is secured with TOTP-based 2FA.</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Change Password</h4>
        {[
          { label: 'Current Password', show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
          { label: 'New Password', show: showNew, toggle: () => setShowNew(!showNew) },
        ].map((f) => (
          <div key={f.label} className="space-y-1">
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">{f.label}</label>
            <div className="relative">
              <input
                type={f.show ? 'text' : 'password'}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={f.toggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {f.show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all"
        >
          <Lock size={15} /> Update Password
        </button>
      </div>
    </div>
  )
}

function NotificationsSection() {
  const notifications = [
    { key: 'new_listing', label: 'New property listings submitted', defaultChecked: true },
    { key: 'reports', label: 'New reports and complaints filed', defaultChecked: true },
    { key: 'failed_payments', label: 'Failed payment alerts', defaultChecked: true },
    { key: 'new_users', label: 'New user registrations', defaultChecked: false },
    { key: 'support', label: 'Open support tickets', defaultChecked: true },
    { key: 'weekly_report', label: 'Weekly analytics digest', defaultChecked: false },
  ]
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email & In-App Alerts</h4>
      {notifications.map((n) => (
        <div key={n.key} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-colors">
          <span className="text-sm font-medium text-slate-800">{n.label}</span>
          <input
            type="checkbox"
            defaultChecked={n.defaultChecked}
            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
        </div>
      ))}
      <button
        type="button"
        className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all"
      >
        <Save size={15} /> Save Preferences
      </button>
    </div>
  )
}

function GenericSection({ label, description }) {
  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <p className="text-sm font-semibold text-slate-700">{label} configuration is managed server-side.</p>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">{description}</p>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200"
      >
        <Settings size={15} /> Manage {label}
      </button>
    </div>
  )
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const { profile, updateProfile } = useAdminData()

  function renderContent() {
    switch (activeSection) {
      case 'profile': return <ProfileSection profile={profile} updateProfile={updateProfile} />
      case 'security': return <SecuritySection />
      case 'notifications': return <NotificationsSection />
      case 'privacy': return (
        <GenericSection
          label="Privacy"
          description="Control data retention policies, data export requests, and consent management settings."
        />
      )
      case 'sessions': return (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Active Admin Sessions</h4>
          {[
            { device: 'Chrome / macOS', ip: '192.168.1.42', time: 'Active now', current: true },
            { device: 'Mobile Safari / iOS', ip: '103.24.12.88', time: '2 hours ago', current: false },
          ].map((session) => (
            <div key={session.ip} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/60">
              <div>
                <p className="text-sm font-bold text-slate-900">{session.device}</p>
                <p className="text-xs text-slate-500">{session.ip} · {session.time}</p>
              </div>
              {session.current ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Current
                </span>
              ) : (
                <button
                  type="button"
                  className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      )
      case 'account': return (
        <div className="space-y-4">
          <GenericSection
            label="Account"
            description="Manage your admin account lifecycle, including role changes, account deactivation, or data deletion."
          />
          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-2">
            <h4 className="text-sm font-bold text-rose-900">Danger Zone</h4>
            <p className="text-xs text-rose-700">Deactivating your admin account requires Super Admin approval.</p>
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all"
            >
              Request Account Deactivation
            </button>
          </div>
        </div>
      )
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Settings"
        description="Configure your profile, security, notification preferences, privacy controls, and session management."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-1">
          {SECTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSection(key)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeSection === key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon size={17} className={activeSection === key ? 'text-white' : 'text-slate-400'} />
              {label}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="pb-4 border-b border-slate-100 mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              {SECTIONS.find(s => s.key === activeSection)?.label} Settings
            </h2>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
