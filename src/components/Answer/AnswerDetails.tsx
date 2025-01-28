import * as React from 'react'
import 'twin.macro'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '~~/context/auth'
import { useAppContext } from '~~/context/state'
import {
  Answer,
  Author,
  CommentParentType,
  FetchQuestionDocument,
  FetchQuestionQuery,
  Question,
  useRemoveAnswerMutation,
  useSubmitAcceptAnsMutation,
  useSubmitAnsVoteMutation,
  useUpdateAnswerMutation,
  VoteType,
} from '~~/generated/graphql'
import { getErrorMsg } from '~~/utils/helperFuncs'
import AuthFormOnButton from '../Auth/AuthFormOnButton'
import AcceptAnswerButton from '../Buttons/AcceptAnswer'
import { DownvoteButton, UpvoteButton } from '../Buttons/Vote'
import CommentSection from '../Comment/Comments'
import DeleteDialog from '../Dialogs/DeleteDialog'
import { LightButton } from '../my-mui/Misc'
import TextField from '../my-mui/TextField'
import { PostedBy } from '../PostedBy'
import { calcPoints, getValidation } from '~~/utils'

interface AnswerDetailsProps {
  data: Answer
  quesId: string
  acceptedAnswer: Question['acceptedAnswer']
  questionAuthor?: Author
}

function AnswerDetails({
  data,
  quesId,
  acceptedAnswer,
  questionAuthor,
}: AnswerDetailsProps) {
  const {
    _id: ansId,
    author,
    body,
    comments,
    points,
    voted,
    createdAt,
    updatedAt,
  } = data

  const { user } = useAuthContext()
  const { notify } = useAppContext()
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const [isEditOpen, setEditOpen] = React.useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<{
    editedAnswerBody: string
  }>({
    mode: 'onChange',
    defaultValues: {
      editedAnswerBody: body,
    },
  })

  const [_updateAnswer] = useUpdateAnswerMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [_deleteAnswer] = useRemoveAnswerMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [_submitVote] = useSubmitAnsVoteMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [_submitAcceptAnswer] = useSubmitAcceptAnsMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const voteAnswer = (voteType: VoteType) => {
    _submitVote({
      variables: { quesId, ansId, voteType },
      optimisticResponse: {
        __typename: 'Mutation',
        voteAnswer: {
          __typename: 'Answer',
          _id: ansId,
          voted: voteType,
          points: calcPoints(voteType, points),
        },
      },
    })
  }

  const editAnswer = (editedAnswerBody: string) => {
    _updateAnswer({
      variables: { quesId, ansId, body: editedAnswerBody },
      update: () => {
        notify('Answer updated!')
      },
    })
  }

  const deleteAnswer = () => {
    _deleteAnswer({
      variables: { quesId, ansId },
      update: (proxy, { data }) => {
        const dataInCache = proxy.readQuery<FetchQuestionQuery>({
          query: FetchQuestionDocument,
          variables: { quesId },
        })

        const filteredAnswers = dataInCache?.viewQuestion.answers.filter(
          (c) => c?._id !== data?.deleteAnswer
        )

        const updatedData = {
          ...dataInCache?.viewQuestion,
          answers: filteredAnswers,
        }

        proxy.writeQuery({
          query: FetchQuestionDocument,
          variables: { quesId },
          data: { viewQuestion: updatedData },
        })

        notify('Answer deleted!')
      },
    })
  }

  const acceptAnswer = () => {
    _submitAcceptAnswer({
      variables: { quesId, ansId },
      optimisticResponse: {
        acceptAnswer: {
          _id: quesId,
          acceptedAnswer: acceptedAnswer === ansId ? null : ansId,
          __typename: 'Question',
        },
      },
      update: (_, { data }) => {
        if (data?.acceptAnswer.acceptedAnswer) {
          notify('Accepted the answer!')
        } else {
          notify('Un-accepted the answer.')
        }
      },
    })
  }

  const handleDeleteConfirm = () => {
    deleteAnswer()
    setDeleteModalOpen(false)
  }
  const handleUpvote = () => {
    voteAnswer(VoteType.Upvote)
  }
  const handleDownvote = () => {
    voteAnswer(VoteType.Downvote)
  }
  const handleAnswerEdit = () => {
    reset()
    editAnswer(getValues('editedAnswerBody'))
    setEditOpen(false)
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
        {user && user._id === questionAuthor?._id && (
          <AcceptAnswerButton
            checked={acceptedAnswer === ansId}
            handleAcceptAns={acceptAnswer!}
          />
        )}
      </div>
      <div tw="px-3 pt-2 w-full">
        {!isEditOpen ? (
          <p tw="m-0 pb-1 text-base text-gray-800">{body}</p>
        ) : (
          <form onSubmit={handleSubmit(handleAnswerEdit)}>
            <TextField
              tag="textarea"
              fullWidth
              error={'editedAnswerBody' in errors}
              helperText={
                'editedAnswerBody' in errors
                  ? errors.editedAnswerBody?.message
                  : ''
              }
              required
              placeholder="Enter at least 30 characters"
              rows={4}
              {...register(
                'editedAnswerBody',
                getValidation({ name: 'answer', min: 50 })
              )}
            />
            <div>
              <LightButton type="submit" tw="mr-4">
                Update Answer
              </LightButton>
              <LightButton onClick={() => setEditOpen(false)}>
                Cancel
              </LightButton>
            </div>
          </form>
        )}
        <div tw="flex flex-row flex-wrap justify-between gap-2 my-5">
          {!isEditOpen && (
            <div tw="inline-block mr-2">
              {user && user._id === author._id && (
                <>
                  <LightButton tw="mr-1" onClick={() => setEditOpen(true)}>
                    Edit
                  </LightButton>
                  <LightButton>Delete</LightButton>

                  <DeleteDialog
                    open={deleteModalOpen}
                    onConfirm={handleDeleteConfirm}
                    onClose={() => setDeleteModalOpen(false)}
                  >
                    <p>Are you sure you want to delete this answer?</p>
                  </DeleteDialog>
                </>
              )}
            </div>
          )}
          <PostedBy
            username={author.username}
            userId={author._id}
            createdAt={createdAt}
            updatedAt={updatedAt}
            postType="answered"
          />
        </div>
        <CommentSection
          user={user}
          comments={comments}
          parentId={ansId}
          quesId={quesId}
          parentType={CommentParentType.Answer}
        />
      </div>
    </div>
  )
}

export default AnswerDetails
