import UpvoteIcon from '../../svg/upvote.svg'
import DownvoteIcon from '../../svg/downvote.svg'

import { SvgIcon } from '../my-mui/Misc'
import Checkbox from '../my-mui/Checkbox'
import tw, { styled } from 'twin.macro' // eslint-disable-line no-unused-vars

export const StyledSvgIcon = styled(SvgIcon)(() => [
  tw`w-8 h-8 p-1 md:p-2 md:w-12 md:h-12`,
])

interface UpVoteButtonProps {
  checked: boolean
  onUpvote: (...args: any) => void
}
export const UpvoteButton = ({ checked, onUpvote }: UpVoteButtonProps) => {
  return (
    <Checkbox
      aria-label="upvote"
      checked={checked}
      icon={
        <StyledSvgIcon tw="text-gray-400 ">
          <UpvoteIcon />
        </StyledSvgIcon>
      }
      checkedIcon={
        <StyledSvgIcon tw="text-green-600 ">
          <UpvoteIcon />
        </StyledSvgIcon>
      }
      onClick={onUpvote}
    />
  )
}

interface DownVoteButtonProps {
  checked: boolean
  onDownvote: (...args: any) => void
}

export const DownvoteButton = ({
  checked,
  onDownvote,
}: DownVoteButtonProps) => {
  return (
    <Checkbox
      aria-label="downvote"
      checked={checked}
      icon={
        <StyledSvgIcon tw="text-gray-400 ">
          <DownvoteIcon />
        </StyledSvgIcon>
      }
      checkedIcon={
        <StyledSvgIcon tw="text-green-600 ">
          <DownvoteIcon />
        </StyledSvgIcon>
      }
      onClick={onDownvote}
    />
  )
}
