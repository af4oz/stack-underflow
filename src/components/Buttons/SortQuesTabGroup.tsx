import 'twin.macro'
import React from 'react'
import { TabGroupItem, TabGroup } from '../my-mui/Misc'
import { QuestionSortBy } from '~~/generated/graphql'
import Link from 'next/link'

interface SortQuesBarProps {
  sortBy: QuestionSortBy
}

const SortQuesBar = ({ sortBy }: SortQuesBarProps) => {
  return (
    <div tw="flex justify-end my-4 text-sm sm:text-base">
      <TabGroup>
        <Link href={`/?tab=${QuestionSortBy.Hot}`} passHref>
          <TabGroupItem active={sortBy === QuestionSortBy.Hot}>
            Hot
          </TabGroupItem>
        </Link>
        <Link href={`/?tab=${QuestionSortBy.Votes}`} passHref>
          <TabGroupItem active={sortBy === QuestionSortBy.Votes}>
            Votes
          </TabGroupItem>
        </Link>
        <Link passHref href={`/?tab=${QuestionSortBy.Views}`}>
          <TabGroupItem
            active={sortBy === QuestionSortBy.Views}
            href={`/?tab=${QuestionSortBy.Views}`}
          >
            Views
          </TabGroupItem>
        </Link>
        <Link href={`/?tab=${QuestionSortBy.Newest}`} passHref>
          <TabGroupItem active={sortBy === QuestionSortBy.Newest}>
            Newest
          </TabGroupItem>
        </Link>
        <Link href={`/?tab=${QuestionSortBy.Oldest}`} passHref>
          <TabGroupItem active={sortBy === QuestionSortBy.Oldest}>
            Oldest
          </TabGroupItem>
        </Link>
      </TabGroup>
    </div>
  )
}

export default SortQuesBar
