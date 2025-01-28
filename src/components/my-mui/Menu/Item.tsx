import tw, { styled, css } from 'twin.macro'
import React, { ComponentProps } from 'react'
import Link from 'next/link'

type MenuItemStyledProps = {
  selected?: boolean
}
type MenuItemProps<T extends 'div' | 'a'> = {
  tag: T
  selected?: boolean
} & ComponentProps<T>

declare function MenuItemFn<T extends 'div' | 'a'>(
  props: MenuItemProps<T>
): JSX.Element

const MenuItemStyled = styled.div(({ selected }: MenuItemStyledProps) => [
  tw`flex items-center justify-start whitespace-nowrap no-underline relative cursor-pointer text-left overflow-hidden transition-colors w-auto px-2 py-1 font[inherit] bg-white text-black-900 hover:(bg-black-900 bg-opacity-5) align-middle my-[.1em] rounded-sm select-none`,
  selected && tw`bg-black-900 bg-opacity-10 border-r-4 border-secondary`,
  css`
    -webkit-tap-highlight-color: transparent;
  `,
])

const MenuItem = React.forwardRef<HTMLElement, MenuItemProps<any>>(
  function MenuItem(props, ref) {
    const { tag, href, selected, children, ...rest } = props
    if (tag === 'a') {
      return (
        <Link href={href} passHref>
          <a ref={ref} {...rest}>
            <MenuItemStyled selected={selected}>{children}</MenuItemStyled>
          </a>
        </Link>
      )
    }
    return (
      <MenuItemStyled selected={selected} ref={ref} {...rest}>
        {children}
      </MenuItemStyled>
    )
  }
) as typeof MenuItemFn

export default MenuItem
