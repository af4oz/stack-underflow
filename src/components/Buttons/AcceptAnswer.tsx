import AcceptedIcon from '../../svg/accepted.svg'

import Checkbox from '../my-mui/Checkbox'
import 'twin.macro'
import { StyledSvgIcon } from './Vote'

interface Props {
  checked: boolean
  handleAcceptAns: () => void
}

const AcceptAnswerButton = ({ checked, handleAcceptAns }: Props) => {
  return (
    <Checkbox
      aria-label={checked ? 'Un accept the answer' : 'Accept the answer'}
      checked={checked}
      icon={
        <StyledSvgIcon tw="text-gray-400 " aria-hidden="true">
          <AcceptedIcon />
        </StyledSvgIcon>
      }
      checkedIcon={
        <StyledSvgIcon tw="text-green-600 " aria-hidden="true">
          <AcceptedIcon />
        </StyledSvgIcon>
      }
      onClick={handleAcceptAns}
    />
  )
}

export default AcceptAnswerButton
