import { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import UpvoteIcon from '../../svg/upvote.svg'
import DownvoteIcon from '../../svg/downvote.svg'

import { BsFillPersonFill as PersonAddIcon } from 'react-icons/bs'
import { IoMdExit as ExitToAppIcon } from 'react-icons/io'

import { SvgIcon, Button, StyledAnchor } from '../my-mui/Misc'
import IconButton from '../my-mui/IconButton'
import MenuItem from '../my-mui/Menu/Item'
import { Dialog, DialogTitle, DialogContent } from '../Dialogs/Dialog'
import 'twin.macro'
import Link from 'next/link'

type AuthFormOnButtonProps = {
  buttonType?: 'ask' | 'link' | 'upvote' | 'downvote' | 'mobile'
  closeMenu?: () => void
}
const AuthFormOnButton = ({ closeMenu, buttonType }: AuthFormOnButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [authType, setAuthType] = useState('login')

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [isMounted])
  const handleLoginModal = () => {
    isMounted && setAuthType('login')
    isMounted && setModalOpen(true)
    if (buttonType === 'mobile') {
      if (closeMenu) {
        closeMenu()
      }
    }
  }

  const handleSignupModal = () => {
    isMounted && setAuthType('signup')
    isMounted && setModalOpen(true)
    if (buttonType === 'mobile') {
      if (closeMenu) {
        closeMenu()
      }
    }
  }

  const handleModalClose = () => {
    isMounted && setModalOpen(false)
  }

  const triggerButton = () => {
    if (buttonType === 'ask') {
      return (
        <Button
          tw="bg-blue-500 hover:bg-blue-700 text-sm md:text-base"
          onClick={handleLoginModal}
        >
          Ask Question
        </Button>
      )
    } else if (buttonType === 'link') {
      return (
        <StyledAnchor
          href="#"
          onClick={handleLoginModal}
          style={{ cursor: 'pointer' }}
        >
          ask your own question.
        </StyledAnchor>
      )
    } else if (buttonType === 'upvote') {
      return (
        <IconButton tag="button" onClick={handleLoginModal} aria-label="upvote">
          <SvgIcon tw="text-gray-400" aria-hidden="true">
            <UpvoteIcon />
          </SvgIcon>
        </IconButton>
      )
    } else if (buttonType === 'downvote') {
      return (
        <IconButton
          tag="button"
          onClick={handleLoginModal}
          aria-label="downvote"
        >
          <SvgIcon tw="text-gray-400" aria-hidden="true">
            <DownvoteIcon />
          </SvgIcon>
        </IconButton>
      )
    } else if (buttonType === 'mobile') {
      return (
        <div>
          <MenuItem tag="div" onClick={handleLoginModal}>
            <ExitToAppIcon tw="mr-2 font-size[1.2em]" aria-hidden="true" />
            Log In
          </MenuItem>
          <MenuItem tag="div" onClick={handleSignupModal}>
            <PersonAddIcon tw="mr-2 font-size[1.2em]" aria-hidden="true" />
            Sign Up
          </MenuItem>
        </div>
      )
    } else {
      return (
        <div tw="inline-flex">
          <Button tw="text-sm mr-3" onClick={handleLoginModal}>
            Log In
          </Button>
          <Button tw="text-sm" onClick={handleSignupModal}>
            Sign Up
          </Button>
        </div>
      )
    }
  }

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      {modalOpen ? (
        <Dialog onClose={handleModalClose}>
          <DialogTitle onClose={handleModalClose}></DialogTitle>
          <DialogContent>
            {authType === 'login' ? (
              <LoginForm
                setAuthType={setAuthType}
                closeModal={handleModalClose}
              />
            ) : (
              <RegisterForm
                setAuthType={setAuthType}
                closeModal={handleModalClose}
              />
            )}
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  )
}

export default AuthFormOnButton
