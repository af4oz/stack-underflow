import React, { useState, useEffect } from 'react'
import DeleteDialog from '../Dialogs/DeleteDialog'
import { formatDayTime } from '~~/utils/helperFuncs'
import { StyledAnchor, LightButton } from '../my-mui/Misc'
import TextField from '../my-mui/TextField'

import 'twin.macro'
import { Author, Comment as IComment } from '~~/generated/graphql'
import Link from 'next/link'

interface CommentProps {
  comment: IComment
  user: Author
  onDelete: (commentId: string) => void
  onEdit: (editedCommentBody: string, commentId: string) => void
}
const Comment = ({ comment, user, onDelete, onEdit }: CommentProps) => {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editedCommentBody, setEditedCommentBody] = useState(comment.body)

  useEffect(() => {
    setEditedCommentBody(comment.body)
  }, [comment])

  const handleDeleteComment = () => {
    onDelete(comment._id)
    setDeleteModalOpen(false)
  }
  const handleCommentEdit = (e: React.FormEvent) => {
    // prevent default form post submit actions
    e.preventDefault()

    onEdit(editedCommentBody, comment._id)

    // close form
    setEditOpen(false)
  }

  return (
    <div tw="my-1">
      {!editOpen ? (
        <div>
          <p tw="text-xs md:text-xsm break-all inline mr-2">
            {comment.body} –{' '}
            <Link href={`/user/${comment.author.username}`} passHref>
              <StyledAnchor>{comment.author.username}</StyledAnchor>
            </Link>
            <span>{` ${formatDayTime(comment.createdAt)} `}</span>
            <span tw="font-size[.8em]">
              {comment.createdAt !== comment.updatedAt && '(edited)'}
            </span>
          </p>
          {user && user._id === comment.author._id && (
            <>
              <LightButton tw="mr-1" onClick={() => setEditOpen(true)}>
                Edit
              </LightButton>
              <LightButton onClick={() => setDeleteModalOpen(true)}>
                Delete
              </LightButton>
              <DeleteDialog
                open={deleteModalOpen}
                onConfirm={() => handleDeleteComment()}
                onClose={() => setDeleteModalOpen(false)}
              >
                <p>Are you sure you want to delete this comment?</p>
              </DeleteDialog>
            </>
          )}
        </div>
      ) : (
        <form tw="mt-3" onSubmit={handleCommentEdit}>
          <TextField
            tag="textarea"
            value={editedCommentBody}
            required
            fullWidth
            placeholder="Enter at least 15 characters"
            rows={2}
            onChange={(e: any) => setEditedCommentBody(e.target.value)}
          />
          <div>
            <LightButton type="submit" tw="mr-4">
              Update Comment
            </LightButton>
            <LightButton onClick={() => setEditOpen(false)}>Cancel</LightButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default Comment
