import { useState, useEffect } from 'react'
import {
  Building2,
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login, forgotPassword, defaultCredentials } = useAuth()

  // Form states
  const [username, setUsername] = useState('admin@2003')
  const [email, setEmail] = useState('contactraja44@gmail.com')
  const [password, setPassword] = useState('Raja@2003')
  const [showPassword, setShowPassword] = useState(false)

  // Mode states: 'login' | 'forgot'
  const [mode, setMode] = useState('login')
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotUsername, setForgotUsername] = useState('')

  // UI status
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/admin/dashboard'
      navigate(destination, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  // Handle Login Submit
  async function handleLoginSubmit(e) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!username.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in your Username, Email, and Password.')
      return
    }

    setIsLoading(true)

    try {
      await login({
        username: username.trim(),
        email: email.trim(),
        password: password,
      })

      const destination = location.state?.from?.pathname || '/admin/dashboard'
      navigate(destination, { replace: true })
    } catch (err) {
      setErrorMessage(
        err.message || 'Authentication failed. Please verify your admin credentials.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Forgot Password Submit
  async function handleForgotSubmit(e) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!forgotEmail.trim()) {
      setErrorMessage('Please enter your registered admin email address.')
      return
    }

    setIsLoading(true)

    try {
      const result = await forgotPassword({
        email: forgotEmail.trim(),
        username: forgotUsername.trim(),
      })
      setSuccessMessage(
        result.message || 'Password reset instructions have been dispatched to your email.',
      )
    } catch (err) {
      setErrorMessage(
        err.message || 'Unable to process password reset request for this email.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Quick fill helper for testing
  function handleFillDefaults() {
    setUsername(defaultCredentials.username)
    setEmail(defaultCredentials.email)
    setPassword(defaultCredentials.password)
    setErrorMessage('')
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Gradients & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <section className="relative z-10 w-full max-w-lg bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-7 sm:p-10 shadow-2xl shadow-blue-950/60 transition-all duration-300">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 text-white font-black text-2xl flex items-center justify-center shadow-xl shadow-blue-600/30 mb-3 border border-blue-400/20">
            H
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            HAVENLY <span className="text-blue-400 text-xl font-semibold">Admin</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">
            Authorized Administrator Gateway • Protected Dashboard Access
          </p>
        </div>

        {/* Security Alert Badge */}
        <div className="flex items-center justify-center gap-2 p-2.5 mb-5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-semibold">
          <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
          <span>Protected Access Point • Multi-factor Credentials Required</span>
        </div>

        {/* Status Messages */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 p-3.5 mb-5 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs font-medium animate-fadeIn">
            <AlertCircle size={17} className="text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="flex items-start gap-2.5 p-3.5 mb-5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-medium animate-fadeIn">
            <CheckCircle2 size={17} className="text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">{successMessage}</div>
          </div>
        )}

        {/* MODE: LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Admin Username
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin@2003"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Admin Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. contactraja44@gmail.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot')
                    setErrorMessage('')
                    setSuccessMessage('')
                    setForgotEmail(email)
                    setForgotUsername(username)
                  }}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors focus:outline-none"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating Admin...</span>
                </div>
              ) : (
                <>
                  <Building2 size={18} />
                  <span>Sign In to Admin Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Quick Fill Demo Helper Pill */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-[11px] text-slate-400">
              <span>Configured Super Admin:</span>
              <button
                type="button"
                onClick={handleFillDefaults}
                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold px-2 py-0.5 rounded bg-blue-950/40 border border-blue-900/50 hover:bg-blue-900/30 transition-colors"
                title="Fill configured admin credentials"
              >
                <Sparkles size={12} />
                Auto-fill Credentials
              </button>
            </div>
          </form>
        ) : (
          /* MODE: FORGOT PASSWORD FORM */
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div className="text-center pb-2">
              <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-blue-400 mb-2">
                <KeyRound size={24} />
              </div>
              <h2 className="text-lg font-bold text-white">Reset Admin Credentials</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Enter your registered admin details to receive verification instructions.
              </p>
            </div>

            {/* Admin Email */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Registered Admin Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="e.g. contactraja44@gmail.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Admin Username (Optional verification) */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Admin Username (Optional)
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={forgotUsername}
                  onChange={(e) => setForgotUsername(e.target.value)}
                  placeholder="e.g. admin@2003"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Request Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Request...</span>
                </div>
              ) : (
                <>
                  <KeyRound size={17} />
                  <span>Send Reset Instructions</span>
                </>
              )}
            </button>

            {/* Back to Login Button */}
            <button
              type="button"
              onClick={() => {
                setMode('login')
                setErrorMessage('')
                setSuccessMessage('')
              }}
              className="w-full py-2.5 px-4 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs rounded-xl border border-slate-700/60 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>Back to Admin Sign In</span>
            </button>
          </form>
        )}

        {/* Security Footer Notice */}
        <p className="text-[11px] text-slate-500 text-center mt-6">
          Access is strictly monitored and logged. Unauthorized attempts are recorded.
        </p>
      </section>
    </main>
  )
}
