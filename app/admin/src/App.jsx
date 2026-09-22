import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminDataProvider } from './context/AdminDataContext.jsx'
import { AdminLayout } from './components/layout/AdminLayout.jsx'
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx'
import { SkeletonDashboard } from './components/ui/SkeletonLoaders.jsx'

const LoginPage = lazy(() =>
  import('./features/auth/LoginPage.jsx').then((module) => ({ default: module.LoginPage })),
)
const DashboardPage = lazy(() =>
  import('./features/dashboard/DashboardPage.jsx').then((module) => ({ default: module.DashboardPage })),
)
const AnalyticsPage = lazy(() =>
  import('./features/analytics/AnalyticsPage.jsx').then((module) => ({ default: module.AnalyticsPage })),
)
const ActivityLogsPage = lazy(() =>
  import('./features/activity/ActivityLogsPage.jsx').then((module) => ({ default: module.ActivityLogsPage })),
)
const AdminsPage = lazy(() =>
  import('./features/admins/AdminsPage.jsx').then((module) => ({ default: module.AdminsPage })),
)
const CmsPage = lazy(() =>
  import('./features/cms/CmsPage.jsx').then((module) => ({ default: module.CmsPage })),
)
const LocationsPage = lazy(() =>
  import('./features/locations/LocationsPage.jsx').then((module) => ({ default: module.LocationsPage })),
)
const ManagementPage = lazy(() =>
  import('./features/shared/ManagementPage.jsx').then((module) => ({ default: module.ManagementPage })),
)
const PaymentsPage = lazy(() =>
  import('./features/payments/PaymentsPage.jsx').then((module) => ({ default: module.PaymentsPage })),
)
const PropertiesPage = lazy(() =>
  import('./features/properties/PropertiesPage.jsx').then((module) => ({ default: module.PropertiesPage })),
)
const PropertyDetailPage = lazy(() =>
  import('./features/properties/PropertyDetailPage.jsx').then((module) => ({ default: module.PropertyDetailPage })),
)
const ReportsPage = lazy(() =>
  import('./features/reports/ReportsPage.jsx').then((module) => ({ default: module.ReportsPage })),
)
const ServicesPage = lazy(() =>
  import('./features/services/ServicesPage.jsx').then((module) => ({ default: module.ServicesPage })),
)
const SettingsPage = lazy(() =>
  import('./features/settings/SettingsPage.jsx').then((module) => ({ default: module.SettingsPage })),
)
const SupportPage = lazy(() =>
  import('./features/support/SupportPage.jsx').then((module) => ({ default: module.SupportPage })),
)
const UserDetailPage = lazy(() =>
  import('./features/users/UserDetailPage.jsx').then((module) => ({ default: module.UserDetailPage })),
)
const UsersPage = lazy(() =>
  import('./features/users/UsersPage.jsx').then((module) => ({ default: module.UsersPage })),
)

function App() {
  return (
    <AdminDataProvider>
      <Suspense fallback={<SkeletonDashboard />}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:userId" element={<UserDetailPage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/:propertyId" element={<PropertyDetailPage />} />
            <Route path="locations" element={<LocationsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="payments/:paymentId" element={<PaymentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="reports/:reportId" element={<ReportsPage />} />
            <Route path="cms" element={<CmsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="support/:ticketId" element={<SupportPage />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="activity-logs" element={<ActivityLogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route
              path="*"
              element={
                <ManagementPage
                  title="Page Not Found"
                  description="The admin section you requested does not exist."
                  records={[]}
                />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </AdminDataProvider>
  )
}

export default App
