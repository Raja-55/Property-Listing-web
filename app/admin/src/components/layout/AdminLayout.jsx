import {
  Bell,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  User,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { navigationItems } from '../../constants/navigation.js'
import { useAdminData } from '../../context/AdminDataContext.jsx'
import { ProfileModal } from '../ui/ProfileModal.jsx'

const periodOptions = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'Last 1 year', value: '1y' },
]

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  const {
    globalSearch,
    markNotificationsRead,
    notifications,
    period,
    profile,
    setGlobalSearch,
    setPeriod,
  } = useAdminData()

  const activeItem =
    navigationItems.find((item) => location.pathname.startsWith(item.path)) ||
    navigationItems[0]
  const selectedPeriod = periodOptions.find((item) => item.value === period) || periodOptions[1]
  const unreadCount = notifications.filter((item) => item.unread).length

  // Keyboard shortcut listener (⌘K / Ctrl+K)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest('.action-menu-container') && !e.target.closest('.topbar-search-container')) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const searchMatches = useMemo(() => {
    const query = globalSearch.trim().toLowerCase()
    if (!query) {
      return []
    }
    return navigationItems
      .filter((item) => item.label.toLowerCase().includes(query))
      .slice(0, 5)
  }, [globalSearch])

  function handleNavigate(path) {
    navigate(path)
    setGlobalSearch('')
    setOpenMenu(null)
    setIsSidebarOpen(false)
  }

  function handleToggleSidebar() {
    if (window.innerWidth <= 920) {
      setIsSidebarOpen((prev) => !prev)
    } else {
      setIsSidebarCollapsed((prev) => !prev)
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-slate-900 text-slate-100 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-4 gap-3 border-b border-slate-800/80 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
            H
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-bold tracking-wider text-sm text-white uppercase">HAVENLY</span>
              <span className="text-[11px] text-slate-400 font-medium truncate">No Brokerage Portal</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-700" aria-label="Admin navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                title={item.label}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  } ${isSidebarCollapsed ? 'justify-center' : ''}`
                }
              >
                <Icon size={19} className="shrink-0 transition-transform group-hover:scale-105" />
                {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                {!isSidebarCollapsed && item.badge && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom Promo / Info Box */}
        {!isSidebarCollapsed && (
          <div className="p-3.5 m-3 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/60">
            <p className="text-xs font-bold text-slate-200">Building real estate directness</p>
            <p className="text-[11px] text-slate-400 mt-0.5">HAVENLY Admin Dashboard</p>
          </div>
        )}
      </aside>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          role="presentation"
        />
      )}

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleSidebar}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Toggle Sidebar"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-xs font-semibold text-slate-400 hidden sm:block">
                Admin / <span className="text-slate-700">{activeItem.label}</span>
              </p>
              <h1 className="text-base font-bold text-slate-900">{activeItem.label}</h1>
            </div>
          </div>

          {/* Topbar Search */}
          <div className="relative topbar-search-container flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                value={globalSearch}
                onChange={(event) => {
                  setGlobalSearch(event.target.value)
                  setOpenMenu('search')
                }}
                onFocus={() => setOpenMenu('search')}
                placeholder="Search modules or features... (Ctrl+K)"
                className="w-full pl-10 pr-12 py-2 text-sm bg-slate-100/80 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400 font-medium"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
                ⌘K
              </kbd>
            </div>

            {openMenu === 'search' && globalSearch && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in duration-150">
                {searchMatches.length ? (
                  searchMatches.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.path}
                        type="button"
                        onClick={() => handleNavigate(item.path)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-sm font-semibold text-left transition-colors"
                      >
                        <Icon size={16} className="text-slate-400" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })
                ) : (
                  <p className="p-3 text-center text-xs text-slate-500">
                    No results for "{globalSearch}"
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Topbar Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Period Filter Selector */}
            <div className="relative action-menu-container">
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === 'period' ? null : 'period')}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all"
              >
                <CalendarDays size={15} className="text-slate-500" />
                <span>{selectedPeriod.label}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {openMenu === 'period' && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 space-y-0.5">
                  {periodOptions.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setPeriod(item.value)
                        setOpenMenu(null)
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                        item.value === period
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative action-menu-container">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => {
                  setOpenMenu(openMenu === 'notifications' ? null : 'notifications')
                  markNotificationsRead()
                }}
                className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <Bell size={19} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {openMenu === 'notifications' && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">
                      Realtime
                    </span>
                  </div>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {notifications.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavigate(`/admin/${item.type.toLowerCase() === 'property' ? 'properties' : item.type.toLowerCase()}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5"
                      >
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-600 shrink-0">
                          {item.type}
                        </span>
                        <span className="text-xs font-medium text-slate-700 leading-snug">
                          {item.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative action-menu-container">
              <button
                type="button"
                onClick={() => setOpenMenu(openMenu === 'profile' ? null : 'profile')}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {profile.name[0].toUpperCase()}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 leading-tight">{profile.name}</span>
                  <span className="text-[10px] font-semibold text-slate-500">{profile.role}</span>
                </div>
                <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
              </button>

              {openMenu === 'profile' && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {profile.name[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-xs font-bold text-slate-900 truncate">{profile.name}</span>
                      <span className="text-[10px] text-blue-600 font-semibold">{profile.role}</span>
                      <span className="text-[10px] text-slate-400 truncate">{profile.email}</span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <div className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(null)
                        setIsProfileModalOpen(true)
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-colors"
                    >
                      <User size={15} className="text-blue-500" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate('/admin/settings')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-colors"
                    >
                      <Settings size={15} className="text-slate-500" />
                      <span>Account Settings</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavigate('/admin/support')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-colors"
                    >
                      <Shield size={15} className="text-emerald-500" />
                      <span>Security & Permissions</span>
                    </button>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <button
                    type="button"
                    onClick={() => navigate('/admin/login')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Outlet Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  )
}
