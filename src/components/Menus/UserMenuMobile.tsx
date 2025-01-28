import { Suspense, useState } from 'react'
import AuthFormOnButton from '../Auth/AuthFormOnButton'

import { IoMdMore as MoreVertIcon } from 'react-icons/io'
import { MdAccountCircle as AccountCircleIcon } from 'react-icons/md'
import { IoMdPower as PowerIcon } from 'react-icons/io'

import MenuItem from '../my-mui/Menu/Item'
import dynamic from 'next/dynamic'
import IconButton from '../my-mui/IconButton'
import Avatar from '../my-mui/Avatar'
import { SvgIcon } from '../my-mui/Misc'

import 'twin.macro'
import { Author } from '~~/generated/graphql'
import LoadingSpinner from '../LoadingSpinner'

const Menu = dynamic(() => import('../my-mui/Menu'), {
  suspense: true,
})

interface MobileUserMenuProps {
  user?: Author
  logoutUser: (...args: any) => void
}

const UserMenuMobile = ({ user, logoutUser }: MobileUserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined)
  const isMenuOpen = Boolean(anchorEl)

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
      <IconButton
        tag="button"
        onClick={handleOpenMenu}
        tw="font-size[1.5em]"
        aria-label={isMenuOpen ? 'hide User settings' : 'show User settings'}
      >
        {user ? (
          <Avatar
            to={`/user/${user.username}`}
            alt={user.username}
            src={`https://secure.gravatar.com/avatar/${user._id}?s=164&d=identicon`}
            tw="width[1.2em] height[1.2em] font-size[.8em]"
          />
        ) : null}
        <MoreVertIcon />
      </IconButton>
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
          open={isMenuOpen}
          onClose={handleCloseMenu}
        >
          {user ? (
            <div>
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
                Logout: {user.username}
              </MenuItem>
            </div>
          ) : (
            <AuthFormOnButton buttonType="mobile" closeMenu={handleCloseMenu} />
          )}
        </Menu>
      </Suspense>
    </div>
  )
}

export default UserMenuMobile
