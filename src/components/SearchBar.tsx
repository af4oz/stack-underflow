import React, { ComponentProps, useState } from 'react'

import { MdSearch as SearchIcon } from 'react-icons/md'
import { IoMdArrowBack as ArrowBackIcon } from 'react-icons/io'

import tw from 'twin.macro' // eslint-disable-line no-unused-vars
import IconButton from './my-mui/IconButton'
import InputAdornment from './my-mui/InputAdornment'
import TextField from './my-mui/TextField'
import { useRouter } from 'next/router'

interface SearchBarProps extends ComponentProps<'div'> {
  setSearchOpen?: (...args: any) => void
}

const SearchBar = ({ setSearchOpen, ...rest }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput) router.push('/')
    // `/` is needed because only `pages/index` handles these query param changes
    router.push(
      `/?search=${searchInput}${
        router.query?.tag ? `&tag=${router.query.tag}` : ''
      }`,
      undefined,
      { shallow: true }
    )
  }

  const clearSearch = () => {
    if (setSearchOpen) {
      setSearchOpen(false)
    }
    router.push('/', undefined, { shallow: true })
    setSearchInput('')
  }

  return (
    <div css={[tw`flex-grow[.6]`]} {...rest}>
      <form onSubmit={handleSearch}>
        <TextField
          tag="input"
          type="search"
          placeholder="Search…"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          styles={{
            inputRoot: tw`py-1`,
          }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment tw="font-size[1.5em] text-gray-500">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment:
              searchInput || setSearchOpen ? (
                <InputAdornment>
                  <IconButton
                    aria-label="Cancel search"
                    tag="button"
                    tw="p-0 font-size[1.5em]"
                    onClick={clearSearch}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
          tw="leading-3"
        />
      </form>
    </div>
  )
}

export default SearchBar
