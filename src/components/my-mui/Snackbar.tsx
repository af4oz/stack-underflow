import tw from 'twin.macro'
import React, { ComponentProps, ReactNode } from 'react'

interface SnackbarProps extends ComponentProps<'div'> {
  open: boolean
  anchorOrigin: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  children: ReactNode
}
const positionToStyles = {
  'left-top': tw`md:(left[15%] top[24px] right-auto)`,
  'right-top': tw`md:(right[15%] top[24px] left-auto)`,
  'center-top': tw`md:(left-1/2 top[24px] -translate-x-1/2)`,
  'right-bottom': tw`md:(right[15%] bottom[50px] left-auto)`,
  'left-bottom': tw`md:(left[15%] bottom[50px] right-auto)`,
  'center-bottom': tw`bottom[24px] left-1/2 -translate-x-1/2 right-auto`,
}
export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  function SnackBar(props, ref) {
    const { open, anchorOrigin, children, ...rest } = props
    let posStyles
    let mobilePosStyles = tw`bottom[24px] left-1/2 transform -translate-x-1/2 right-auto`
    const { vertical, horizontal } = anchorOrigin
    posStyles = positionToStyles[`${horizontal}-${vertical}`]
    return (
      <>
        {open ? (
          <div
            css={[
              tw`fixed z-index[1400] flex items-center justify-start min-width[250px] max-width[90%] xl:max-width[20%] md:max-width[60%]`,
              mobilePosStyles,
              posStyles,
            ]}
            ref={ref}
            {...rest}
          >
            {children}
          </div>
        ) : null}
      </>
    )
  }
)
