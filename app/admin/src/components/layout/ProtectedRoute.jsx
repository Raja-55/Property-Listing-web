import { Navigate } from 'react-router-dom'

const MOCK_ADMIN_SESSION = true

export function ProtectedRoute({ children }) {
  if (!MOCK_ADMIN_SESSION) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
