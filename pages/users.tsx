import React, { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAppContext } from '../context/state'
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs'

import { MdSearch as SearchIcon } from 'react-icons/md'
import tw from 'twin.macro'
import { StyledAnchor } from '../components/my-mui/Misc'
import InputAdornment from '~~/components/my-mui/InputAdornment'
import Avatar from '~~/components/my-mui/Avatar'
import TextField from '~~/components/my-mui/TextField'
import { useFetchAllUsersQuery } from '../generated/graphql'
import { Container } from '~~/components/Layout'
import getMainLayout from '~~/components/Layout/getMainLayout'
import Link from 'next/link'
import SEO from '~~/components/SEO'

const UsersPageMain = () => {
  const { notify } = useAppContext()
  const { data, loading } = useFetchAllUsersQuery({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [filterInput, setFilterInput] = useState('')

  return (
    <Container>
      <SEO title="All Users - Stack Underflow" />
      <h2 tw="text-xl my-2  font-normal">Users</h2>
      <TextField
        tag="input"
        value={filterInput}
        placeholder="Filter by username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFilterInput(e.target.value)
        }
        tw="leading-3"
        InputProps={{
          startAdornment: (
            <InputAdornment tw="text-gray-500 font-size[1.5em]">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {!loading && data && (
        <div tw="flex mt-6 flex-wrap">
          {data.getAllUsers
            .filter((u) =>
              u.username.toLowerCase().includes(filterInput.toLowerCase())
            )
            .map((u) => (
              <div key={u._id} css={[tw`flex m-1`]}>
                <Avatar
                  src={`https://secure.gravatar.com/avatar/${u._id}?s=164&d=identicon`}
                  alt={u.username}
                  to={`/user/${u.username}`}
                  tw="w-10 h-10"
                />
                <div>
                  <Link href={`/user/${u.username}`} passHref>
                    <StyledAnchor>
                      <span tw="text-sm">{u.username}</span>
                    </StyledAnchor>
                  </Link>
                  <p tw="text-xs my-0">
                    created {formatDateAgo(u.createdAt)} ago
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
      {loading && <LoadingSpinner />}
    </Container>
  )
}

export default function UsersPage() {
  return (
    <>
      <UsersPageMain />
    </>
  )
}

UsersPage.getLayout = getMainLayout
