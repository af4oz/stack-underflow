import tw from 'twin.macro'
import { ComponentProps, ReactNode } from 'react'

interface CheckboxProps extends ComponentProps<'button'> {
  checkedIcon: ReactNode
  checked: boolean
  icon: ReactNode
  'aria-label': string
}
const Checkbox = ({
  checkedIcon,
  checked,
  icon,
  onClick,
  ...otherProps
}: CheckboxProps) => {
  return (
    <button
      css={[
        tw`items-center justify-center vertical-align[middle] transition-colors user-select[none] cursor-pointer bg-transparent border-none text-decoration[none] border-radius[50%]  outline-nonepadding[9px] hover:bg-gray-200  focus:bg-gray-200`,
      ]}
      onClick={onClick}
      {...otherProps}
    >
      {checked ? checkedIcon : icon}
    </button>
  )
}

export default Checkbox
