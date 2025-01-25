import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillPersonFill as PersonIcon } from 'react-icons/bs'
import { IoMdExit as ExitToAppIcon, IoMdLock as LockIcon } from 'react-icons/io'
import {
  MdVisibility as VisibilityIcon,
  MdVisibilityOff as VisibilityOffIcon,
} from 'react-icons/md'
import 'twin.macro'
import { useAuthContext } from '~~/context/auth'
import { useAppContext } from '~~/context/state'
import {
  LoginUserMutationVariables,
  useLoginUserMutation,
} from '~~/generated/graphql'
import { getErrorMsg } from '~~/utils/helperFuncs'
import { Button, AnchorLikeButton, SvgIcon } from '../my-mui/Misc'
import TextField from '../my-mui/TextField'
import InputAdornment from '../my-mui/InputAdornment'
import ErrorMessage from '../AlertError'
import { getValidation } from '~~/utils'

interface LoginFormProps {
  setAuthType: (...args: any) => void
  closeModal: () => void
}

const LoginForm = ({ setAuthType, closeModal }: LoginFormProps) => {
  const [showPass, setShowPass] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { setUser } = useAuthContext()
  const { notify } = useAppContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    mode: 'onTouched',
  })

  const [loginUser, { loading }] = useLoginUserMutation({
    onError: (err) => {
      setErrorMsg(getErrorMsg(err))
    },
  })
  const onLogin = ({ username, password }: LoginUserMutationVariables) => {
    loginUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data?.login)
        notify(`Welcome, ${data?.login.username}!`)
        reset()
        closeModal()
      },
    })
  }

  return (
    <div tw="px-3 py-2">
      {/* eslint-disable-next-line  @next/next/no-img-element */}
      <img
        src={'/stack-overflow.svg'}
        alt="sof-logo"
        tw="width[5em] mx-auto my-4"
        width={60}
        height={60}
      />
      <form onSubmit={handleSubmit(onLogin)}>
        <div tw="mb-6">
          <TextField
            tag="input"
            required
            fullWidth
            placeholder="username"
            type="text"
            {...register('username', getValidation({ name: 'username' }))}
            error={'username' in errors}
            helperText={'username' in errors ? errors?.username?.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment tw="font-size[1.5em] text-blue-600">
                  <PersonIcon color="primary" aria-hidden="true" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div tw="mb-6">
          <TextField
            tag="input"
            required
            fullWidth
            {...register('password', getValidation({ name: 'password' }))}
            placeholder="password"
            type={showPass ? 'text' : 'password'}
            error={'password' in errors}
            helperText={'password' in errors ? errors.password?.message : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={() => setShowPass((prevState) => !prevState)}
                  tw="cursor-pointer p-0 font-size[1.5em] text-blue-600 "
                >
                  {showPass ? (
                    <VisibilityOffIcon color="primary" aria-hidden="true" />
                  ) : (
                    <VisibilityIcon color="primary" aria-hidden="true" />
                  )}
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment tw="font-size[1.5em] text-blue-600">
                  <LockIcon aria-hidden="true" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          tw="flex justify-center items-center w-full  text-base"
          type="submit"
          disabled={loading}
        >
          <SvgIcon aria-hidden="true">
            <ExitToAppIcon />
          </SvgIcon>
          &nbsp;
          {loading ? 'loading...' : 'Login'}
        </Button>
      </form>
      <p tw="text-center my-3">
        Don’t have an account?{' '}
        <AnchorLikeButton onClick={() => setAuthType('signup')}>
          Sign Up
        </AnchorLikeButton>
      </p>
      <ErrorMessage
        errorMsg={errorMsg}
        clearErrorMsg={() => setErrorMsg(null)}
      />
    </div>
  )
}

export default LoginForm
