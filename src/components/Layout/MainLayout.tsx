import 'twin.macro'
import React, { ReactNode } from 'react'
import NavMenuDesktop from '../Navs/NavMenuDesktop'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div tw="max-width[1264px] min-height[100vh] w-full mx-auto flex flex-row flex-nowrap relative">
      <NavMenuDesktop />
      {children}
    </div>
  )
}

export default MainLayout
