import * as React from 'react'
import 'twin.macro' // eslint-disable-line no-unused-vars
import { Question } from '../../generated/graphql'
import { AnsSortBy } from '../../types'
import sortAnswers from '../../utils/sortAnswers'
import SortAnsBar from '../Buttons/SortAnsTabGroup'
import Divider from '../my-mui/Divider'
import AnswerDetails from './AnswerDetails'

interface AnswerListProps {
  quesId: string
  answers: Question['answers']
  acceptedAnswer: Question['acceptedAnswer']
  quesAuthor: Question['author']
}

const AnswerList = ({
  quesId,
  answers,
  acceptedAnswer,
  quesAuthor,
}: AnswerListProps) => {
  const [sortBy, setSortBy] = React.useState<AnsSortBy>('VOTES')

  const answerList = sortAnswers(sortBy, answers, acceptedAnswer)

  return (
    <div tw="mt-10">
      {answerList.length !== 0 && (
        <div tw="flex justify-between items-center flex-wrap">
          <h2 tw="font-normal text-xl mb-4">
            {answerList.length} {answerList.length === 1 ? 'Answer' : 'Answers'}
          </h2>
          <SortAnsBar sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      )}
      <div tw="mt-4">
        {answerList.map((answer, i) => (
          <div key={answer?._id}>
            <AnswerDetails
              data={answer!}
              quesId={quesId}
              acceptedAnswer={acceptedAnswer}
              questionAuthor={quesAuthor}
            />
            {i >= 0 && i < answerList.length && (
              <Divider tw="my-4 border-[hsl(210,8%,90%)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnswerList
