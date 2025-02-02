import tw, { css, styled } from 'twin.macro'

type DividerProps = {
  orientation?: 'vertical' | 'horizontal'
  color?: string
}
const Divider = styled.hr<DividerProps>(
  ({ orientation, color = 'lightgray' }) => [
    tw`my-0 border-width[1px] h-auto`,
    orientation === 'vertical' ? tw`border-l-0` : tw`border-b-0`,
    css`
      border-color: ${color};
    `,
  ]
)

export default Divider
