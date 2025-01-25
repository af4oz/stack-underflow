import * as React from 'react'
import { ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const DefaultErrorFallback = ({ errorInfo }: { errorInfo: ErrorInfo }) => {
  const { pathname } = useRouter()
  return (
    <div className="wrapper">
      <p>There was an error in loading this page. </p>
      {pathname !== '/' && (
        <Link href={'/'}>
          <a className="link">Back Home</a>
        </Link>
      )}
      <details className="error-details">
        <summary>Click for error details</summary>
        {errorInfo && errorInfo.componentStack.toString()}
      </details>
    </div>
  )
}
class ErrorBoundary extends React.Component<{
  fallback?: ReactNode
  children: ReactNode
}> {
  state = {
    error: null,
    errorInfo: null,
    hasError: false,
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error({ error, errorInfo })
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError && this.state.errorInfo) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return <DefaultErrorFallback errorInfo={this.state.errorInfo} />
    }

    return this.props.children
  }
}
export default ErrorBoundary
