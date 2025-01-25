import React, { useState } from 'react'
import { MdSearch as SearchIcon } from 'react-icons/md'
import tw, { styled } from 'twin.macro'
import { Container } from '~~/components/Layout'
import InputAdornment from '~~/components/my-mui/InputAdornment'
import Tag from '~~/components/my-mui/Tag'
import TextField from '~~/components/my-mui/TextField'
import LoadingSpinner from '~~/components/LoadingSpinner'
import { useAppContext } from '~~/context/state'
import { useFetchAllTagsQuery } from '~~/generated/graphql'
import { getErrorMsg } from '~~/utils/helperFuncs'
import getMainLayout from '~~/components/Layout/getMainLayout'
import SEO from '~~/components/SEO'

const Tags = styled.div(() => [tw`flex mt-4 flex-wrap`])

const TagContainer = styled.div(() => [
  tw`border-gray-400 border-width[1px] border-solid rounded-sm p-2 m-1 min-width[8em]`,
])

const AllTagsMain = () => {
  const { notify } = useAppContext()
  const { data, loading } = useFetchAllTagsQuery({
    variables: {
      limit: 20,
    },
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [filterInput, setFilterInput] = useState('')

  return (
    <Container>
      <SEO title="All Tags - Stack Underflow" />
      <h2 tw="text-xl   font-normal my-2">Tags</h2>
      <p tw="leading-5 text-gray-700 mb-4">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </p>
      <TextField
        tag="input"
        value={filterInput}
        placeholder="Filter by tag name"
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
        <Tags>
          {data.getAllTags.tags
            .filter((t) =>
              t.name.toLowerCase().includes(filterInput.toLowerCase())
            )
            .map((t) => (
              <TagContainer key={t._id}>
                <Tag
                  tag="a"
                  label={t.name}
                  tw="mb-2"
                  // `/` is needed because only `pages/index` handles these query param changes
                  href={`/?tag=${t.name}`}
                />
                <div tw="mt-2">
                  <span tw="text-xs ">{t.questionCount} question(s)</span>
                </div>
              </TagContainer>
            ))}
        </Tags>
      )}
      {loading && <LoadingSpinner />}
    </Container>
  )
}

export default function AllTagsPage() {
  return (
    <>
      <AllTagsMain />
    </>
  )
}
AllTagsPage.getLayout = getMainLayout
