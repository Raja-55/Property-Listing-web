import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'
import { ManagementPage } from '../shared/ManagementPage.jsx'

export function ActivityLogsPage() {
  const { data, error, isLoading } = useAdminResource(
    'activity-logs',
    () => adminRepository.getActivityLogs(),
    [],
  )

  return (
    <ManagementPage
      title="Activity Logs"
      description="Audit admin login, property actions, user access changes, refunds, reports, CMS publishing, and role changes."
      records={data || []}
      isLoading={isLoading}
      error={error}
      searchKeys={['admin', 'action', 'entity', 'device']}
      primaryAction="Export Logs"
      columns={[
        { key: 'admin', label: 'Admin' },
        { key: 'action', label: 'Action' },
        { key: 'entity', label: 'Entity ID' },
        { key: 'time', label: 'Timestamp' },
        { key: 'device', label: 'IP / Device' },
      ]}
    />
  )
}
