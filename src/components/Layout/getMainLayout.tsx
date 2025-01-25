import { ReactElement } from 'react'
import ErrorBoundary from '../ErrorBoundary'
import MainLayout from './MainLayout'

export default function getLayout(page: ReactElement) {
  return (
    <ErrorBoundary>
      <MainLayout>{page}</MainLayout>
    </ErrorBoundary>
  )
}
