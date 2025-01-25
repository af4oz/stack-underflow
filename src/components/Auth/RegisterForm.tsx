import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillPersonFill as PersonIcon } from 'react-icons/bs'
import {
  IoMdLock as LockIcon,
  IoMdPersonAdd as PersonAddIcon,
} from 'react-icons/io'
import {
  MdEnhancedEncryption as EnhancedEncryptionIcon,
  MdVisibility as VisibilityIcon,
  MdVisibilityOff as VisibilityOffIcon,
} from 'react-icons/md'
import 'twin.macro'
import { useAuthContext } from '~~/context/auth'
import { useAppContext } from '~~/context/state'
import {
  RegisterUserMutationVariables,
  useRegisterUserMutation,
} from '../../generated/graphql'
import { getErrorMsg } from '~~/utils/helperFuncs'
import { Button, AnchorLikeButton, SvgIcon } from '../my-mui/Misc'
import TextField from '../my-mui/TextField'
import InputAdornment from '../my-mui/InputAdornment'
import AlertError from '../AlertError'
import { getValidation, usernameValidation } from '~~/utils'

interface RegisterFormProps {
  setAuthType: (...args: any) => void
  closeModal: (...args: any) => void
}

const RegisterForm = ({ setAuthType, closeModal }: RegisterFormProps) => {
  const [showPass, setShowPass] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [showConfPass, setShowConfPass] = useState(false)
  const { setUser } = useAuthContext()
  const { notify } = useAppContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserMutationVariables & { confirmPassword: string }>({
    mode: 'onTouched',
  })

  const [registerUser, { loading }] = useRegisterUserMutation({
    onError: (err) => {
      setErrorMsg(getErrorMsg(err))
    },
  })

  const onSubmit = handleSubmit(({ username, confirmPassword, password }) => {
    if (password !== confirmPassword)
      return setErrorMsg('Both passwords need to match.')

    registerUser({
      variables: { username, password },
      update: (_, { data }) => {
        setUser(data?.register)
        notify(`Hey, ${data?.register.username}!`)
        reset()
        closeModal()
      },
    })
  })

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
      <form onSubmit={onSubmit}>
        <div tw="mb-6">
          <TextField
            tag="input"
            required
            fullWidth
            {...register('username', usernameValidation)}
            placeholder="username"
            type="text"
            error={'username' in errors}
            helperText={'username' in errors ? errors.username?.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment tw="font-size[1.5em] text-blue-600">
                  <PersonIcon aria-hidden="true" />
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
            {...register(
              'password',
              getValidation({ name: 'password', min: 6 })
            )}
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
        <div tw="mb-6">
          <TextField
            tag="input"
            required
            fullWidth
            {...register(
              'confirmPassword',
              getValidation({ name: 'confirm-password', min: 6 })
            )}
            placeholder="confirmPassword"
            type={showConfPass ? 'text' : 'password'}
            error={'confirmPassword' in errors}
            helperText={
              'confirmPassword' in errors ? errors.confirmPassword?.message : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={() => setShowConfPass((prevState) => !prevState)}
                  tw="cursor-pointer p-0 font-size[1.5em] text-blue-600 "
                >
                  {showConfPass ? (
                    <VisibilityOffIcon color="primary" aria-hidden="true" />
                  ) : (
                    <VisibilityIcon color="primary" aria-hidden="true" />
                  )}
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment tw="font-size[1.5em] text-blue-600">
                  <EnhancedEncryptionIcon color="primary" aria-hidden="true" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          tw="flex items-center justify-center w-full py-3"
        >
          <SvgIcon tw="font-size[1.5em]" aria-hidden="true">
            <PersonAddIcon />
          </SvgIcon>
          &nbsp;
          {loading ? 'loading...' : 'Sign Up'}
        </Button>
      </form>
      <p tw="text-center my-3">
        Already have an account?{' '}
        <AnchorLikeButton onClick={() => setAuthType('login')}>
          Log In
        </AnchorLikeButton>
      </p>
      <AlertError errorMsg={errorMsg} clearErrorMsg={() => setErrorMsg('')} />
    </div>
  )
}

export default RegisterForm
