import { formatDateAgo } from '../../utils/helperFuncs'

import tw, { styled } from 'twin.macro' // eslint-disable-line no-unused-vars
import { StyledAnchor } from '../my-mui/Misc'
import { RecentActivity } from '../../generated/graphql'
import Link from 'next/link'

const PointsBox = styled.div(() => [
  tw`inline-flex px-2 py-1 border-width[1px] border-solid border-blue-900 rounded-md line-height[1.2em]`,
])

const RecentQuestions = ({ creedo }: { creedo: RecentActivity }) => {
  return (
    <div tw="flex justify-between  px-1 py-3 items-center">
      <div tw="flex items-center flex-basis[80%] flex-grow-0 flex-shrink-0">
        <PointsBox>{creedo.points}</PointsBox>
        <Link href={`/questions/${creedo._id}`} passHref>
          <StyledAnchor tw="font-normal ml-2">{creedo.title}</StyledAnchor>
        </Link>
      </div>
      <span tw="text-xs md:text-sm">{formatDateAgo(creedo.createdAt)} ago</span>
    </div>
  )
}

export default RecentQuestions
