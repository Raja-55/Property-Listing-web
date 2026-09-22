import { useCallback, useEffect, useState } from 'react'
import { useAdminData } from '../context/AdminDataContext.jsx'

export function useAdminResource(key, loader, dependencies = []) {
  const { cache, getResource } = useAdminData()
  const cachedResource = cache[key]
  const [requestId, setRequestId] = useState(0)
  const dependencyKey = JSON.stringify(dependencies)

  useEffect(() => {
    let active = true
    getResource(key, loader).catch(() => {
      if (active) {
        setRequestId((value) => value + 1)
      }
    })

    return () => {
      active = false
    }
    // Loader identity changes on render; key/dependencyKey are the resource contract.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, dependencyKey, requestId])

  const mutate = useCallback(() => {
    setRequestId((value) => value + 1)
  }, [])

  return {
    data: cachedResource?.data || null,
    error: cachedResource?.error || null,
    isLoading: !cachedResource || cachedResource.status === 'loading',
    isRefreshing: cachedResource?.status === 'refreshing',
    mutate,
  }
}

