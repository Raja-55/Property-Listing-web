import { useState } from 'react'
import { Building2, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@havenly.com')
  const [password, setPassword] = useState('••••••••••••')
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/admin/dashboard')
    }, 600)
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <section className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-blue-950/50">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4">
            H
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">HAVENLY Admin</h1>
          <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
            Secure Management Console for No-Brokerage Real Estate Platform
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 p-2.5 mb-6 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 text-xs font-semibold">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Restricted Admin Portal • End-to-End Encrypted</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@havenly.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium placeholder:text-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <Building2 size={18} />
                <span>Sign in to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="text-[11px] text-slate-500 text-center mt-6">
          Access provisioned for authorized administrators only.
        </p>
      </section>
    </main>
  )
}
