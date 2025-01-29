import { useMemo } from 'react'
import { initializeApollo } from '~~/lib/apollo'

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
