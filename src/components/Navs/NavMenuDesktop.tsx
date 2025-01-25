import { GoGlobe as PublicIcon } from 'react-icons/go'
import { MdLocalOffer as LocalOfferIcon } from 'react-icons/md'
import { MdPeopleAlt as PeopleIcon } from 'react-icons/md'

import tw, { css } from 'twin.macro' // eslint-disable-line no-unused-vars
import MenuItem from '../my-mui/Menu/Item'
import Divider from '../my-mui/Divider'
import { useRouter } from 'next/router'

const DesktopNavMenu = () => {
  const { pathname } = useRouter()
  const iconStyles = css`
    ${tw`width[.8em] height[.8em] mr-2 font-size[1.5em]`}
  `

  return (
    <div tw="hidden sm:block">
      <div tw="sticky flex min-height[95vh] top[5vh]">
        <div tw="flex flex-col mt-4">
          <MenuItem
            tag="a"
            selected={
              pathname === '/' ||
              (!pathname.startsWith('/tag') && !pathname.startsWith('/user'))
            }
            href="/"
          >
            <PublicIcon css={iconStyles} />
            Stack Underflow
          </MenuItem>
          <MenuItem tag="a" selected={pathname.startsWith('/tag')} href="/tags">
            <LocalOfferIcon css={iconStyles} />
            Tags
          </MenuItem>
          <MenuItem
            tag="a"
            selected={pathname.startsWith('/user')}
            href="/users"
          >
            <PeopleIcon css={iconStyles} />
            Users
          </MenuItem>
        </div>
        <Divider orientation="vertical" />
      </div>
    </div>
  )
}

export default DesktopNavMenu
