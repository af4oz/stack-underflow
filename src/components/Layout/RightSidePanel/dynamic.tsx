import dynamic from 'next/dynamic'
import useMediaQuery from '~~/hooks/useMediaQuery'

const DynamicRightSidePanel = dynamic(() => import('.'), {
  ssr: false,
})

const RightSidePanel = () => {
  const isMdScreen = useMediaQuery('(min-width: 768px)')
  if (isMdScreen) {
    return <DynamicRightSidePanel />
  }
  return null
}
export default RightSidePanel
