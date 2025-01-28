import tw from 'twin.macro'
import { useAppContext } from '~~/context/state'
import { useFetchAllTagsQuery } from '~~/generated/graphql'
import { getErrorMsg } from '~~/utils/helperFuncs'
import LoadingSpinner from '../../LoadingSpinner'
import { TagWithCount, Tags } from '../../Tags'

const Grid = tw.div`m-0 w-1/3 mt-4 rounded-sm hidden md:block`

const Heading = tw.h3`font-size[1.1rem] text-center mb-4`

const __RightSidePanel = () => {
  const { notify } = useAppContext()

  const { data, loading } = useFetchAllTagsQuery({
    variables: {
      limit: 10,
    },
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  return (
    <Grid>
      <div tw="hidden md:block min-height[45vh] p-4  rounded-md ">
        <Heading>Top Tags</Heading>
        {loading && <LoadingSpinner size="medium" />}
        {!loading && data && (
          <Tags col>
            {data.getAllTags.tags.map((t) => (
              <TagWithCount
                label={t.name}
                key={t._id}
                // `/` is needed because only `pages/index` handles these query param changes
                href={`/questions/tagged/${t.name}`}
                count={t?.questionCount}
              />
            ))}
          </Tags>
        )}
        {!loading && !data?.getAllTags && 'No Tags created yet!'}
      </div>
    </Grid>
  )
}

export default __RightSidePanel
