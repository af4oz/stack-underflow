import { Question } from '~~/lib/__generated__/graphql'
import AnswerForm from '../Answer/AnswerForm'
import AnswerList from '../Answer/AnswerList'
import QuestionDetails from './QuestionDetails'

interface QuesPageContentProps {
  data: Question
}

const QuestionPageContent = ({ data }: QuesPageContentProps) => {
  const { answers, ...question } = data

  return (
    <div>
      <QuestionDetails data={question} />
      <AnswerList
        quesId={question.id}
        answers={answers}
        acceptedAnswer={question.acceptedAnswer}
        quesAuthor={question.author}
      />
      <AnswerForm quesId={question.id} tags={question.tags} />
    </div>
  )
}

export default QuestionPageContent
