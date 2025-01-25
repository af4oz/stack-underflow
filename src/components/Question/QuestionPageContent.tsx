import { Question } from '~~/generated/graphql'
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
        quesId={question._id}
        answers={answers}
        acceptedAnswer={question.acceptedAnswer}
        quesAuthor={question.author}
      />
      <AnswerForm quesId={question._id} tags={question.tags} />
    </div>
  )
}

export default QuestionPageContent
