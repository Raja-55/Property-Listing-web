import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AdminDataContext = createContext(null)

const initialNotifications = [
  { id: 'N-01', title: '42 listings need review', type: 'Property', unread: true },
  { id: 'N-02', title: '9 reports need investigation', type: 'Reports', unread: true },
  { id: 'N-03', title: '3 failed payments today', type: 'Payments', unread: true },
  { id: 'N-04', title: '12 support tickets are open', type: 'Support', unread: true },
]

export function AdminDataProvider({ children }) {
  const [period, setPeriod] = useState('30d')
  const [globalSearch, setGlobalSearch] = useState('')
  const [cache, setCache] = useState({})
  const [profile, setProfile] = useState({
    name: 'Ishita Roy',
    role: 'Super Admin',
    email: 'ishita@havenly.admin',
  })
  const [notifications, setNotifications] = useState(initialNotifications)

  const getResource = useCallback(
    async (key, loader, { force = false } = {}) => {
      if (!force && cache[key]?.status === 'success') {
        return cache[key].data
      }

      setCache((current) => ({
        ...current,
        [key]: {
          data: current[key]?.data || null,
          error: null,
          status: current[key]?.data ? 'refreshing' : 'loading',
        },
      }))

      try {
        const data = await loader()
        setCache((current) => ({
          ...current,
          [key]: { data, error: null, status: 'success' },
        }))
        return data
      } catch (error) {
        setCache((current) => ({
          ...current,
          [key]: {
            data: current[key]?.data || null,
            error,
            status: current[key]?.data ? 'success' : 'error',
          },
        }))
        throw error
      }
    },
    [cache],
  )

  const markNotificationsRead = useCallback(() => {
    setNotifications((items) => items.map((item) => ({ ...item, unread: false })))
  }, [])

  const updateProfile = useCallback((nextProfile) => {
    setProfile((current) => ({ ...current, ...nextProfile }))
  }, [])

  const value = useMemo(
    () => ({
      cache,
      getResource,
      globalSearch,
      markNotificationsRead,
      notifications,
      period,
      profile,
      setGlobalSearch,
      setPeriod,
      updateProfile,
    }),
    [
      cache,
      getResource,
      globalSearch,
      markNotificationsRead,
      notifications,
      period,
      profile,
      updateProfile,
    ],
  )

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

export function useAdminData() {
  const context = useContext(AdminDataContext)
  if (!context) {
    throw new Error('useAdminData must be used inside AdminDataProvider')
  }
  return context
}
