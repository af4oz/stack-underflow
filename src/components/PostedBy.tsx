import tw from 'twin.macro' //eslint-disable-line no-unused-vars
import { Scalars } from '../generated/graphql'
import { formatDateAgo } from '../utils/helperFuncs'
import Avatar from './my-mui/Avatar'
import { StyledAnchor } from './my-mui/Misc'
import Link from 'next/link'

const Details = tw.div`text-xs md:text-sm flex-grow-[0] break-all`

interface PostedByProps {
  username: string
  userId: string
  postType?: 'asked' | 'answered'
  createdAt?: Scalars['DateTime']
  updatedAt?: Scalars['DateTime']
}
export const PostedBy = ({
  username,
  userId,
  postType = 'asked',
  createdAt,
  updatedAt,
}: PostedByProps) => {
  return (
    <div tw="float-right ml-auto max-w-[175px] md:max-w-[200px] ">
      <div tw="break-words text-gray-700 text-xs ">
        {`${postType} ${formatDateAgo(createdAt)} ago`}
      </div>
      {updatedAt && createdAt !== updatedAt && (
        <div tw="text-gray-700 text-xs ">
          {`updated ${formatDateAgo(updatedAt)} ago`}
          <br />
        </div>
      )}
      <div tw="flex items-start mt-1">
        <Avatar
          src={`https://secure.gravatar.com/avatar/${userId}?s=164&d=identicon`}
          alt={username}
          to={`/user/${username}`}
          tw="w-10 h-10"
        />
        <Details>
          <Link href={`/user/${username}`} passHref>
            <StyledAnchor>
              <span>{username}</span>
            </StyledAnchor>
          </Link>
        </Details>
      </div>
    </div>
  )
}

export const MiniPostedBy = ({
  username,
  userId,
  postType = 'asked',
  createdAt,
}: PostedByProps) => {
  return (
    <>
      <Avatar
        src={`https://secure.gravatar.com/avatar/${userId}?s=164&d=identicon`}
        alt={username}
        to={`/user/${username}`}
        tw="w-4"
      />
      <Link href={`/user/${username}`} passHref>
        <StyledAnchor>
          <span>{username}</span>
        </StyledAnchor>
      </Link>
      &nbsp;
      <span tw="text-black-500">
        {`${postType} ${formatDateAgo(createdAt)} ago`}
      </span>
    </>
  )
}
