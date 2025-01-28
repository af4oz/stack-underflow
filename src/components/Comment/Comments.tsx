import * as React from 'react'
import { useForm } from 'react-hook-form'
import Comment from '.'

import { LightButton } from '../my-mui/Misc'
import 'twin.macro'
import {
  Author,
  CommentParentType,
  FetchQuestionDocument,
  FetchQuestionQuery,
  Question,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} from '../../generated/graphql'
import TextField from '../my-mui/TextField'
import Divider from '../my-mui/Divider'
import { useAppContext } from '~~/context/state'
import { getErrorMsg } from '~~/utils/helperFuncs'
import { getValidation } from '~~/utils'

interface CommentSectionProps {
  parentId: string
  quesId: string
  parentType: CommentParentType
  user: Author
  comments: Question['comments']
}

const CommentSection = ({
  user,
  comments,
  parentId,
  quesId,
  parentType,
}: CommentSectionProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)
  const [inputOpen, setInputOpen] = React.useState(false)
  const { notify } = useAppContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ commentBody: string }>({
    mode: 'onChange',
  })

  const [_addComment] = useAddCommentMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })
  const [_editComment] = useEditCommentMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [_deleteComment] = useDeleteCommentMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })
  const addComment = React.useCallback(
    (commentBody: string) => {
      _addComment({
        variables: { parentId, parentType, body: commentBody },
        update: (proxy, { data }) => {
          const dataInCache = proxy.readQuery<FetchQuestionQuery>({
            query: FetchQuestionDocument,
            variables: { quesId },
          })

          let updatedData
          if (parentType === CommentParentType.Question) {
            updatedData = {
              ...dataInCache?.viewQuestion,
              comments: [
                ...(dataInCache?.viewQuestion?.comments ?? []),
                data?.addComment,
              ],
            }
          } else if (parentType === CommentParentType.Answer) {
            const targetAnswer = dataInCache?.viewQuestion.answers.find(
              (a) => a?._id === parentId
            )
            const updatedComments = [
              ...(targetAnswer?.comments ?? []),
              data?.addComment,
            ]

            const updatedAnswers = dataInCache?.viewQuestion.answers.map((a) =>
              a?._id === parentId ? { ...a, comments: updatedComments } : a
            )
            updatedData = {
              ...dataInCache?.viewQuestion,
              answers: updatedAnswers,
            }
          }

          proxy.writeQuery({
            query: FetchQuestionDocument,
            variables: { quesId },
            data: { viewQuestion: updatedData },
          })
          notify('Comment added!')
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notify, parentId, quesId, parentType]
  )

  const editComment = React.useCallback(
    (editedCommentBody: string, commentId: string) => {
      _editComment({
        variables: { commentId, body: editedCommentBody },
        update: () => {
          notify('Comment edited!')
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [, notify]
  )

  const deleteComment = React.useCallback(
    (commentId: string) => {
      _deleteComment({
        variables: { commentId },
        update: (proxy, { data }) => {
          const dataInCache = proxy.readQuery<FetchQuestionQuery>({
            query: FetchQuestionDocument,
            // currently, we fetch question and related data(answers,comments) in one network call
            // apollo cache is tightly linked to quesId
            // TODO: fetch questions,answers,comments separately and change backend accrodingly
            variables: { quesId },
          })

          let updatedData
          if (parentType === CommentParentType.Question) {
            const filteredComments = dataInCache?.viewQuestion?.comments.filter(
              (comment) => comment?._id !== commentId
            )
            updatedData = {
              ...dataInCache?.viewQuestion,
              comments: filteredComments,
            }
          } else if (parentType === CommentParentType.Answer) {
            const targetAnswer = dataInCache?.viewQuestion.answers.find(
              (a) => a?._id === parentId
            )
            const updatedComments = targetAnswer?.comments.filter(
              (c) => c?._id !== data?.deleteComment
            )
            const updatedAnswers = dataInCache?.viewQuestion.answers.map((a) =>
              a?._id === parentId ? { ...a, comments: updatedComments } : a
            )
            updatedData = {
              ...dataInCache?.viewQuestion,
              answers: updatedAnswers,
            }
          }

          proxy.writeQuery({
            query: FetchQuestionDocument,
            variables: { quesId },
            data: { viewQuestion: updatedData },
          })

          notify('Comment deleted!')
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notify, parentId, parentType, quesId]
  )
  const handleAddComment = ({ commentBody }: { commentBody: string }) => {
    addComment(commentBody)
    // show all comments
    setIsCollapsed(false)
    // close form
    setInputOpen(false)
    // reset form values
    reset()
  }

  // TODO: Haha, need to make an actual api call
  const visibleComments = isCollapsed ? comments.slice(0, 3) : comments

  return (
    <div>
      {comments.length !== 0 && <Divider tw="border-[hsl(210,8%,90%)]" />}
      {visibleComments.map((c) => (
        <div key={c?._id} tw="border-bottom[1px solid rgba(0,0,0,.08)]">
          <Comment
            comment={c!}
            user={user}
            onDelete={deleteComment}
            onEdit={editComment}
          />
        </div>
      ))}
      {visibleComments.length !== comments.length ? (
        <LightButton onClick={() => setIsCollapsed(false)}>
          show {comments.length - visibleComments.length} more comments
        </LightButton>
      ) : (
        user &&
        !inputOpen && (
          <LightButton onClick={() => setInputOpen(true)}>
            Add a comment
          </LightButton>
        )
      )}
      {inputOpen && (
        <form onSubmit={handleSubmit(handleAddComment)} tw="mt-1">
          <TextField
            tag="textarea"
            {...register(
              'commentBody',
              getValidation({ name: 'comment', min: 15 })
            )}
            required
            placeholder="Enter at least 15 characters"
            rows={3}
            fullWidth
            error={'commentBody' in errors}
            helperText={
              'commentBody' in errors ? errors?.commentBody?.message : ''
            }
            tw="text-sm"
          />
          <div>
            <LightButton type="submit" style={{ marginRight: 9 }}>
              Add Comment
            </LightButton>
            <LightButton onClick={() => setInputOpen(false)}>
              Cancel
            </LightButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default CommentSection
