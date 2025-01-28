import tw from 'twin.macro'
import React, { ComponentProps } from 'react'
import Link from 'next/link'

interface OwnTagProps<T> {
  tag: T
  label?: string
  styles?: {
    link?: any
    tag?: any
  }
}

type TagProps<T extends 'span' | 'a'> = OwnTagProps<T> & ComponentProps<T>

declare function TagFn<T extends 'span' | 'a'>(props: TagProps<T>): JSX.Element

const tagStyles = tw`inline-flex items-center line-height[1.2rem]  outline-color[darkblue] bg-blue-200 bg-opacity-75 rounded-md text-blue-700 no-underline text-xxs md:text-xs padding[.2em .5em]  hover:bg-opacity-100`

const Tag = React.forwardRef<HTMLElement, TagProps<any>>(function Tag(
  props,
  ref
) {
  const { href, label, styles, children, ...rest } = props
  let tag
  if (href) {
    tag = (
      <Link href={href} passHref>
        <a {...rest} ref={ref} css={[tw`no-underline`, styles && styles.link]}>
          <span css={[tagStyles, styles && styles.tag]}>
            <span tw="block max-width[15ch] truncate">{label}</span>
          </span>
        </a>
      </Link>
    )
  } else {
    tag = (
      <span ref={ref} css={[tagStyles, styles && styles.tag]} {...rest}>
        <span tw="block max-width[15ch] truncate">{label}</span>
      </span>
    )
  }
  return <>{tag}</>
}) as typeof TagFn

export default Tag
