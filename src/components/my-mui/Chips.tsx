import tw from 'twin.macro'
import { ComponentProps } from 'react'
import IconButton from './IconButton'
import { FaTimes } from 'react-icons/fa'

export interface ChipWithCloseProps extends ComponentProps<'span'> {
  label: string
  onDelete?: React.MouseEventHandler<HTMLButtonElement>
}
const chipStyles = tw`bg-blue-200  hover:(bg-blue-900 text-white) outline-color[darkorange] text-xs opacity-75 border-solid border-width[1px] border-blue-800 rounded-sm padding[.1rem .5rem] no-underline
`
export const ChipWithClose = (props: ChipWithCloseProps) => {
  const { label, onDelete, ...rest } = props
  return (
    <span
      css={[
        chipStyles,
        tw`flex items-center h-6 box-content margin[2px] pl-3 pr-1`,
      ]}
      {...rest}
    >
      {label}
      <IconButton
        tag="button"
        onClick={onDelete}
        aria-label={`remove ${label} tag`}
      >
        <FaTimes />
      </IconButton>
    </span>
  )
}
