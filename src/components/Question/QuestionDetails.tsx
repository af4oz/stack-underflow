import * as React from 'react'
import { useRouter } from 'next/router'
import tw from 'twin.macro' // eslint-disable-line no-unused-vars
import { useAuthContext } from '~~/context/auth'
import { useAppContext } from '~~/context/state'
import {
  CommentParentType,
  Question,
  useRemoveQuestionMutation,
  useSubmitQuesVoteMutation,
  VoteType,
} from '~~/generated/graphql'
import { calcPoints } from '~~/utils'
import { getErrorMsg } from '~~/utils/helperFuncs'
import AuthFormOnButton from '../Auth/AuthFormOnButton'
import { DownvoteButton, UpvoteButton } from '../Buttons/Vote'
import CommentSection from '../Comment/Comments'
import DeleteDialog from '../Dialogs/DeleteDialog'
import { LightButton } from '../my-mui/Misc'
import Tag from '../my-mui/Tag'
import { PostedBy } from '../PostedBy'

interface QuestionDetailsProps {
  data: Omit<Question, 'answers'>
}

function QuestionDetails({ data }: QuestionDetailsProps) {
  const {
    _id: quesId,
    author,
    body,
    title,
    tags,
    comments,
    points,
    voted,
    createdAt,
    updatedAt,
  } = data

  const { user } = useAuthContext()
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const router = useRouter()
  const { setEditingQuestion, notify, editingQuestion } = useAppContext()

  const [submitVote] = useSubmitQuesVoteMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })
  const [removeQuestion] = useRemoveQuestionMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })
  const voteQuestion = (voteType: VoteType, points: number) => {
    submitVote({
      variables: { quesId, voteType },
      optimisticResponse: {
        __typename: 'Mutation',
        voteQuestion: {
          __typename: 'Question',
          _id: quesId,
          points: calcPoints(voteType, points),
          voted: voteType,
        },
      },
    })
  }

  const editQuestion = () => {
    setEditingQuestion({ quesId, title, body, tags })
    router.push('/ask')
  }

  const deleteQuestion = () => {
    removeQuestion({
      variables: { quesId },
      onCompleted: () => {
        router.push('/')
        notify('Question deleted!')
      },
    })
  }
  const handleDeleteConfirm = () => {
    deleteQuestion()
    setDeleteModalOpen(false)
  }
  const handleUpvote = () => {
    voteQuestion(VoteType.Upvote, points)
  }
  const handleDownvote = () => {
    voteQuestion(VoteType.Downvote, points)
  }

  return (
    <div tw="flex flex-row flex-nowrap w-full">
      <div tw="flex flex-col items-center">
        {user ? (
          <UpvoteButton
            checked={voted === VoteType.Upvote}
            onUpvote={handleUpvote}
          />
        ) : (
          <AuthFormOnButton buttonType="upvote" />
        )}
        <span>{points}</span>
        {user ? (
          <DownvoteButton
            checked={voted === VoteType.Downvote}
            onDownvote={handleDownvote}
          />
        ) : (
          <AuthFormOnButton buttonType="downvote" />
        )}
      </div>
      <div tw="px-3 pt-2 w-full">
        <p tw="m-0 pb-1 text-base text-gray-800">{body}</p>
        <ul tw="flex flex-wrap">
          {tags &&
            tags.map((t) => (
              <li key={t}>
                <Tag
                  tag="a"
                  label={t}
                  href={`/questions/tagged/${t}`}
                  styles={{ link: tw`margin[0 .25em .25em]` }}
                />
              </li>
            ))}
        </ul>
        <div tw="flex flex-row flex-wrap justify-between gap-2 my-5">
          {user && user._id === author._id && (
            <div tw="inline-block mr-2">
              <LightButton tw="mr-1" onClick={editQuestion}>
                Edit
              </LightButton>
              <LightButton onClick={deleteQuestion}>Delete</LightButton>

              <DeleteDialog
                open={deleteModalOpen}
                onConfirm={handleDeleteConfirm}
                onClose={() => setDeleteModalOpen(false)}
              >
                <p>Are you sure you want to delete this question</p>
              </DeleteDialog>
            </div>
          )}
          <PostedBy
            username={author.username}
            userId={author._id}
            createdAt={createdAt}
            updatedAt={updatedAt}
            postType={'asked'}
          />
        </div>
        <CommentSection
          user={user}
          comments={comments}
          parentId={quesId}
          quesId={quesId}
          parentType={CommentParentType.Question}
        />
      </div>
    </div>
  )
}

export default QuestionDetails
