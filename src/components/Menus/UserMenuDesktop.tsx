import { Suspense, useState } from 'react'
import AuthFormOnButton from '../Auth/AuthFormOnButton'

import dynamic from 'next/dynamic'
import MenuItem from '../my-mui/Menu/Item'
import Avatar from '../my-mui/Avatar'
import { AnchorLikeButton, SvgIcon } from '../my-mui/Misc'
import { MdAccountCircle as AccountCircleIcon } from 'react-icons/md'
import { IoMdPower as PowerIcon } from 'react-icons/io'
import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'

import tw from 'twin.macro' // eslint-disable-line no-unused-vars
import { Author } from '../../generated/graphql'
import LoadingSpinner from '../LoadingSpinner'

const Menu = dynamic(() => import('../my-mui/Menu'), {
  suspense: true,
})

interface UserMenuDesktopProps {
  user?: Author
  logoutUser: (...args: any) => void
}
const UserMenuDesktop = ({ user, logoutUser }: UserMenuDesktopProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(undefined)
  }

  const handleLogoutClick = () => {
    logoutUser()
    handleCloseMenu()
  }

  return (
    <div>
      {user ? (
        <div style={{ display: 'inline' }}>
          <AnchorLikeButton
            tw="text-sm flex items-center justify-center"
            onClick={handleOpenMenu}
          >
            <Avatar
              to={`/user/${user.username}`}
              alt={user.username}
              src={`https://secure.gravatar.com/avatar/${user._id}?s=164&d=identicon`}
              styles={{
                avatarRoot: tw`width[1.5em] height[1.5em]`,
              }}
            />
            <span>{user.username}</span>
            <SvgIcon aria-hidden="true">
              <ArrowDownIcon />
            </SvgIcon>
          </AnchorLikeButton>
          <Suspense fallback={<LoadingSpinner />}>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem
                tag="a"
                href={`/user/${user.username}`}
                onClick={handleCloseMenu}
              >
                <SvgIcon tw="mr-2" aria-hidden="true">
                  <AccountCircleIcon />
                </SvgIcon>
                My Profile
              </MenuItem>
              <MenuItem tag="div" onClick={handleLogoutClick}>
                <SvgIcon tw="mr-2" aria-hidden="true">
                  <PowerIcon />
                </SvgIcon>
                Logout
              </MenuItem>
            </Menu>
          </Suspense>
        </div>
      ) : (
        <AuthFormOnButton />
      )}
    </div>
  )
}

export default UserMenuDesktop
