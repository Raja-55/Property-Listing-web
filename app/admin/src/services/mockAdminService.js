import { mockAdminData } from '../features/shared/mock/adminData.js'

// In-memory state store for reactive interactions
let liveData = JSON.parse(JSON.stringify(mockAdminData))

const periodMultipliers = {
  '7d': { factor: 0.25, label: 'vs last 7 days', months: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  '30d': { factor: 1.0, label: 'vs last 30 days', months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] },
  '3m': { factor: 2.8, label: 'vs last 3 months', months: ['Q1', 'Q2', 'Q3', 'Q4'] },
  '6m': { factor: 5.4, label: 'vs last 6 months', months: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
  '1y': { factor: 11.2, label: 'vs last 1 year', months: ['2023-Q3', '2023-Q4', '2024-Q1', '2024-Q2', '2024-Q3'] },
}

export const mockAdminService = {
  getDashboard({ period = '30d' } = {}) {
    const periodInfo = periodMultipliers[period] || periodMultipliers['30d']
    const m = periodInfo.factor

    const kpis = [
      { title: 'Total Users', value: Math.round(58240 * (0.8 + m * 0.2)), change: +(12.4 * (m > 1 ? 1.2 : 0.9)).toFixed(1), period: periodInfo.label, tone: 'blue', sparkline: [45, 52, 58, 62, 70, 78, 85] },
      { title: 'Total Owners', value: Math.round(14780 * (0.85 + m * 0.15)), change: +(8.1 * (m > 1 ? 1.1 : 0.85)).toFixed(1), period: periodInfo.label, tone: 'green', sparkline: [12, 14, 15, 18, 20, 22, 25] },
      { title: 'Total Properties', value: Math.round(12845 * (0.9 + m * 0.1)), change: +(15.2 * (m > 1 ? 1.3 : 1.0)).toFixed(1), period: periodInfo.label, tone: 'purple', sparkline: [30, 35, 42, 50, 61, 72, 84] },
      { title: 'Active Listings', value: Math.round(9340 * (0.88 + m * 0.12)), change: +(9.8 * (m > 1 ? 1.15 : 0.95)).toFixed(1), period: periodInfo.label, tone: 'green', sparkline: [50, 52, 55, 60, 68, 74, 80] },
      { title: 'Pending Approval', value: liveData.dashboard.approvalQueue.length, change: -4.6, period: periodInfo.label, tone: 'orange', sparkline: [10, 8, 12, 7, 5, 4, liveData.dashboard.approvalQueue.length] },
      { title: 'Enquiries', value: Math.round(38490 * m), change: +(18.9 * (m > 1 ? 1.2 : 0.9)).toFixed(1), period: periodInfo.label, tone: 'blue', sparkline: [120, 140, 180, 210, 260, 310, 380] },
      { title: 'Property Visits', value: Math.round(184520 * m), change: + (21.7 * (m > 1 ? 1.25 : 0.88)).toFixed(1), period: periodInfo.label, tone: 'purple', sparkline: [1000, 1200, 1500, 1800, 2200, 2800, 3400] },
      { title: 'Total Revenue', value: Math.round(4280000 * m), change: +(11.3 * (m > 1 ? 1.1 : 0.92)).toFixed(1), period: periodInfo.label, tone: 'green', currency: true, sparkline: [25, 38, 45, 60, 72, 85, 98] },
    ]

    // Scale growth data according to selected period
    const growth = periodInfo.months.map((label, index) => {
      const baseUser = 6000 + index * 1400 * Math.sqrt(m)
      const baseProp = 900 + index * 180 * Math.sqrt(m)
      const baseRev = 500000 + index * 135000 * m
      const baseEnq = 3000 + index * 900 * Math.sqrt(m)
      return {
        month: label,
        users: Math.round(baseUser),
        properties: Math.round(baseProp),
        revenue: Math.round(baseRev),
        enquiries: Math.round(baseEnq),
        visits: Math.round(baseUser * 4.2),
      }
    })

    return Promise.resolve({
      ...liveData.dashboard,
      kpis,
      growth,
      approvalQueue: [...liveData.dashboard.approvalQueue],
    })
  },

  approveListing(id) {
    liveData.dashboard.approvalQueue = liveData.dashboard.approvalQueue.filter(
      (item) => item.id !== id,
    )
    const property = liveData.properties.find((p) => p.id === id)
    if (property) {
      property.status = 'PUBLISHED'
      property.verification = 'VERIFIED'
    }
    return Promise.resolve({ success: true, id })
  },

  rejectListing(id) {
    liveData.dashboard.approvalQueue = liveData.dashboard.approvalQueue.filter(
      (item) => item.id !== id,
    )
    const property = liveData.properties.find((p) => p.id === id)
    if (property) {
      property.status = 'REJECTED'
    }
    return Promise.resolve({ success: true, id })
  },

  getUsers() {
    return Promise.resolve([...liveData.users])
  },

  getUser(id) {
    const user = liveData.users.find((item) => item.id === id) || null
    return Promise.resolve(user)
  },

  getProperties() {
    return Promise.resolve([...liveData.properties])
  },

  getProperty(id) {
    const prop = liveData.properties.find((item) => item.id === id) || null
    return Promise.resolve(prop)
  },

  getLocations() {
    return Promise.resolve([...liveData.locations])
  },

  getServices() {
    return Promise.resolve([...liveData.services])
  },

  getPayments() {
    return Promise.resolve([...liveData.payments])
  },

  getReports() {
    return Promise.resolve([...liveData.reports])
  },

  getCms() {
    return Promise.resolve([...liveData.cms])
  },

  getSupport() {
    return Promise.resolve([...liveData.support])
  },

  getAdmins() {
    return Promise.resolve([...liveData.admins])
  },

  getActivityLogs() {
    return Promise.resolve([...liveData.activityLogs])
  },
}
