import Link from 'next/link'
import { MiniPostedBy } from '../PostedBy'
import tw from 'twin.macro' //eslint-disable-line no-unused-vars
import { Question as IQuestion } from '../../generated/graphql'

import Tag from '../my-mui/Tag'

const StatsContainer = tw.div`ml-0 mr-1 sm:(ml-2 mr-3) text-center text-xs`

const QuestionContainer = tw.div`w-full`

const Container = tw.div`flex p-1 sm:p-2`

const Question = tw.h3`m-0 mb-2`

interface QuesCardProps {
  question: IQuestion
}

const QuestionCard = ({ question }: QuesCardProps) => {
  const {
    _id,
    title,
    author,
    body,
    tags,
    points,
    views,
    answerCount,
    createdAt,
  } = question

  return (
    <Container>
      <StatsContainer>
        <div>
          <span tw="block text-gray-600 text-sm">{points}</span>
          <div>votes</div>
        </div>
        <div tw="my-2">
          <span tw="block text-gray-600 text-sm">{answerCount}</span>
          <div>answers</div>
        </div>
        <div>{views} views</div>
      </StatsContainer>
      <QuestionContainer>
        <Question>
          <Link href={`/questions/${_id}`} passHref>
            <a tw="no-underline text-blue-600 font-normal hover:text-blue-800 text-lg">
              {title}
            </a>
          </Link>
        </Question>
        <p tw="m-0 pb-1 text-sm">{body}</p>
        <div tw="flex flex-wrap items-center justify-between">
          <div tw="float-left flex flex-wrap items-center gap-2">
            {tags.map((t) => (
              <Tag
                tag="a"
                key={t}
                // `/` is needed because only `pages/index` handles these query param changes
                href={`/questions/tagged/${t}`}
                styles={{ link: tw`margin[0 .25em .25em]` }}
                label={t}
              />
            ))}
          </div>
          <div tw="ml-auto flex items-center justify-end text-sm">
            <MiniPostedBy
              username={author.username}
              userId={author._id}
              createdAt={createdAt}
            />
          </div>
        </div>
      </QuestionContainer>
    </Container>
  )
}

export default QuestionCard
