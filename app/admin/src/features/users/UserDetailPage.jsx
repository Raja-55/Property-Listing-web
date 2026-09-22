import { useParams } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader.jsx'
import { ErrorState, LoadingState } from '../../components/ui/StateBlock.jsx'
import { StatusBadge } from '../../components/ui/StatusBadge.jsx'
import { useAdminResource } from '../../hooks/useAdminResource.js'
import { adminRepository } from '../../services/adminRepository.js'

export function UserDetailPage() {
  const { userId } = useParams()
  const { data: user, error, isLoading } = useAdminResource(
    `user:${userId}`,
    () => adminRepository.getUser(userId),
    [userId],
  )

  if (isLoading) return <LoadingState />
  if (error || !user) return <ErrorState message="Unable to load this user profile." />

  return (
    <div className="space-y-6">
      <PageHeader
        title={user.name}
        description="Comprehensive audit of profile, activities, listed properties, enquiries, and platform transactions."
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Profile Overview</h3>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Email:</strong> {user.email}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">Phone:</strong> {user.phone}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">City:</strong> {user.city}</p>
          <p className="text-xs text-slate-600"><strong className="text-slate-900">User Type:</strong> {user.type}</p>
          <div className="pt-2">
            <StatusBadge status={user.status} />
          </div>
        </article>
        {['Activity', 'Properties', 'Enquiries', 'Visits', 'Bookings', 'Payments', 'Reports'].map((item) => (
          <article key={item} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">{item}</h3>
            <p className="text-xs text-slate-500">Telemetry logs for {item.toLowerCase()} history.</p>
          </article>
        ))}
      </section>
    </div>
  )
}
