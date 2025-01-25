// source: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import { UsePaginationProps, usePagination, DOTS } from '~~/hooks/usePagination'
import { styled } from 'twin.macro'
import Link from 'next/link'
import { QuestionSortBy } from '~~/generated/graphql'

const PaginationList = styled.ul`
  display: flex;
  list-style-type: none;
`
const PaginationListItem = styled.li`
  padding: 0 12px;
  height: 32px;
  text-align: center;
  margin: auto 4px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;

  &.dots:hover {
    background-color: transparent;
    cursor: default;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }

  &.selected {
    background-color: rgba(0, 0, 0, 0.08);
  }

  .arrow {
    &::before {
      position: relative;
      /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
      content: '';
      /* By using an em scale, the arrows will size with the font */
      display: inline-block;
      width: 0.4em;
      height: 0.4em;
      border-right: 0.12em solid rgba(0, 0, 0, 0.87);
      border-top: 0.12em solid rgba(0, 0, 0, 0.87);
    }

    &.left {
      transform: rotate(-135deg) translate(-50%);
    }

    &.right {
      transform: rotate(45deg);
    }
  }

  &.disabled {
    pointer-events: none;

    .arrow::before {
      border-right: 0.12em solid rgba(0, 0, 0, 0.43);
      border-top: 0.12em solid rgba(0, 0, 0, 0.43);
    }

    &:hover {
      background-color: transparent;
      cursor: default;
    }
  }
`

interface PaginationProps extends UsePaginationProps {
  tab: QuestionSortBy
}
const Pagination = (props: PaginationProps) => {
  const { totalCount, siblingCount = 1, currentPage, pageSize, tab } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (!paginationRange) return null

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <PaginationList>
      {/* Left navigation arrow */}
      <PaginationListItem
        className={currentPage === 1 ? 'disabled' : ''}
        // onClick={onPrevious}
      >
        <Link href={`/?tab=${tab}?page=${1}`}>1</Link>
      </PaginationListItem>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <PaginationListItem
              className="pagination-item dots"
              key={pageNumber}
            >
              &#8230;
            </PaginationListItem>
          )
        }

        // Render our Page Pills
        return (
          <PaginationListItem
            className={pageNumber === currentPage ? 'selected' : ''}
            key={pageNumber}
            // onClick={() => onPageChange(pageNumber)}
          >
            <Link href={`/?tab=${tab}?page=${pageNumber}`}>{pageNumber}</Link>
          </PaginationListItem>
        )
      })}
      {/*  Right Navigation arrow */}
      <PaginationListItem
        className={currentPage === lastPage ? 'disabled' : ''}
        // onClick={onNext}
      >
        <Link href={`/?tab=${tab}?page=${lastPage}`}>{lastPage}</Link>
        <div className="arrow right" />
      </PaginationListItem>
    </PaginationList>
  )
}
export default Pagination
