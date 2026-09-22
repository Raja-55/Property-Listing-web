import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'
import { ManagementPage } from '../shared/ManagementPage.jsx'

export function AdminsPage() {
  const { data, error, isLoading } = useAdminResource('admins', () => adminRepository.getAdmins(), [])

  return (
    <ManagementPage
      title="Admins / Roles"
      description="Control admin users, roles, visible permissions, and role-scoped access. Backend RBAC remains the source of truth."
      records={data || []}
      isLoading={isLoading}
      error={error}
      searchKeys={['name', 'email', 'role', 'status']}
      primaryAction="Invite Admin"
      columns={[
        { key: 'name', label: 'Admin' },
        { key: 'role', label: 'Role' },
        { key: 'email', label: 'Email' },
        { key: 'permissions', label: 'Permissions' },
        { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  )
}
