import { useEffect, useState } from 'react'

export function useAsyncData(loader, dependencies = []) {
  const [state, setState] = useState({
    data: null,
    error: null,
    isLoading: true,
  })

  useEffect(() => {
    let active = true

    Promise.resolve()
      .then(() => {
        if (active) {
          setState((current) => ({ ...current, error: null, isLoading: true }))
        }
        return loader()
      })
      .then((data) => {
        if (active) {
          setState({ data, error: null, isLoading: false })
        }
      })
      .catch((error) => {
        if (active) {
          setState({ data: null, error, isLoading: false })
        }
      })

    return () => {
      active = false
    }
    // Callers pass the stable dependency list that should reload this resource.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return state
}
