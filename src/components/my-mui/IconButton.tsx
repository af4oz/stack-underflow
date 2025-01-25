import React, { RefObject, ComponentProps } from 'react'
import tw, { css } from 'twin.macro' // eslint-disable-line no-unused-vars
import { TCustomStyleClasses } from './types'
import Link from 'next/link'

const iconButtonStyles = css`
  ${tw`flex items-center justify-center vertical-align[middle] bg-transparent user-select[none] cursor-pointer transition-colors  border-none  border-radius[50%] padding[9px]  text-decoration[none] outline-offset[4px] hover:bg-black-25 focus:bg-black-75`}
`
type IconButtonProps<T extends 'button' | 'a'> = {
  tag: T
  styles?: TCustomStyleClasses
  'aria-label': string
} & ComponentProps<T>

declare function IconButtonFn<Tag extends 'a' | 'button'>(
  props: IconButtonProps<Tag>
): JSX.Element

const IconButton = React.forwardRef<HTMLElement, IconButtonProps<any>>(
  function IconButton(props, ref) {
    const { tag, styles, href, children, ...rest } = props
    let iconButton
    if (tag === 'a') {
      iconButton = (
        <Link href={href} passHref>
          <a
            css={[iconButtonStyles, styles && styles.iconButton]}
            {...rest}
            ref={ref as RefObject<HTMLAnchorElement>}
          >
            {children}
          </a>
        </Link>
      )
    } else {
      iconButton = (
        <button
          css={[iconButtonStyles, styles && styles.iconButton]}
          type="button"
          ref={ref as RefObject<HTMLButtonElement>}
          {...rest}
        >
          {children}
        </button>
      )
    }
    return <>{iconButton}</>
  }
) as typeof IconButtonFn

export default IconButton
