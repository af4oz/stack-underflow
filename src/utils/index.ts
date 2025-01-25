import { RegisterOptions } from 'react-hook-form'
import { QuestionSortBy, VoteType } from '~~/generated/graphql'

export const calcPoints = (voteType: VoteType, points: number) => {
  return voteType === VoteType.Upvote ? points + 1 : points > 0 ? points - 1 : 0
}

interface GetValidation {
  name: string
  type?: 'string' | 'number'
  min?: number
  max?: number
  req?: boolean
}
export const getValidation = ({
  max,
  min,
  type = 'string',
  name,
  req = true,
}: GetValidation) => {
  const itemType = type === 'string' ? 'characters' : 'digits'
  return {
    required: req ? `${name} is required` : undefined,
    minLength: min
      ? {
          value: min,
          message: `${name} cannot be less than ${min} ${itemType}`,
        }
      : undefined,
    maxLength: max
      ? {
          value: max,
          message: `${name} cannot be more than ${max} ${itemType}`,
        }
      : undefined,
  } as RegisterOptions
}

export const usernameValidation = {
  ...getValidation({ name: 'username', min: 3, max: 20 }),
  pattern: {
    value: /^[a-zA-Z0-9-_]*$/,
    message: 'Only alphanum, dash & underscore characters are allowed',
  },
} as RegisterOptions

export const range = (start: number, end: number) => {
  const len = Math.max(end - start, 0)
  return Array(len)
    .fill(null)
    .map((_, i) => start + i)
}

export const getPageTitleBasedOnSortBy = (sortBy: QuestionSortBy) => {
  let title = ''
  switch (sortBy) {
    case QuestionSortBy.Newest:
      title += 'Newest'
      break
    case QuestionSortBy.Votes:
      title += 'High Voted'
      break
    case QuestionSortBy.Views:
      title += 'Most Viewed'
      break
    case QuestionSortBy.Oldest:
      title += 'Oldest'
      break
    case QuestionSortBy.Hot:
      title += 'Hot'
      break
    default:
      title += 'All'
      break
  }
  return title + ' Questions'
}

const validTabs = [
  QuestionSortBy.Newest,
  QuestionSortBy.Oldest,
  QuestionSortBy.Votes,
  QuestionSortBy.Views,
  QuestionSortBy.Hot,
] as string[]
export const isValidTab = (tab: string) => {
  return validTabs.includes(tab)
}
