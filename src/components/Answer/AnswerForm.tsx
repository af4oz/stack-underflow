import { useForm } from 'react-hook-form'
import { useAuthContext } from '~~/context/auth'
import { useAppContext } from '~~/context/state'
import AuthFormOnButton from '../Auth/AuthFormOnButton'
import { getErrorMsg } from '~~/utils/helperFuncs'

import 'twin.macro'
import { Button, StyledAnchor } from '../my-mui/Misc'
import TextField from '../my-mui/TextField'
import Tag from '../my-mui/Tag'
import {
  FetchQuestionDocument,
  FetchQuestionQuery,
  useAddAnswerMutation,
} from '../../generated/graphql'
import * as React from 'react'
import { getValidation } from '~~/utils'
import Link from 'next/link'

interface Props {
  quesId: string
  tags: string[]
}
const AnswerForm = ({ quesId, tags }: Props) => {
  const { user } = useAuthContext()
  const { notify } = useAppContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ answerBody: string }>({
    mode: 'onChange',
  })

  const [addAnswer, { loading }] = useAddAnswerMutation({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const postAnswer = React.useCallback(
    ({ answerBody }: { answerBody: string }) => {
      addAnswer({
        variables: { quesId, body: answerBody },
        update: (proxy, { data }) => {
          // reset form state
          reset()

          const dataInCache = proxy.readQuery<FetchQuestionQuery>({
            query: FetchQuestionDocument,
            variables: { quesId },
          })

          const updatedData = {
            ...dataInCache?.viewQuestion,
            answers: data?.postAnswer,
          }

          proxy.writeQuery({
            query: FetchQuestionDocument,
            variables: { quesId },
            data: { viewQuestion: updatedData },
          })

          notify('Answer submitted!')
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quesId, notify, reset]
  )

  return (
    <div>
      {user && <h3 tw="mt-5 mb-4 font-normal text-lg">Your Answer</h3>}
      {user && (
        <form onSubmit={handleSubmit(postAnswer)}>
          <TextField
            tag="textarea"
            {...register(
              'answerBody',
              getValidation({ name: 'answer', min: 50 })
            )}
            name="answerBody"
            required
            rows={5}
            fullWidth
            placeholder="Enter atleast 30 characters"
            error={'answerBody' in errors}
            helperText={
              'answerBody' in errors ? errors?.answerBody?.message : ''
            }
          />
          <Button tw="mt-10 block" type="submit" disabled={loading}>
            {loading ? 'processing...' : 'Post Your Answer'}
          </Button>
        </form>
      )}
      <div tw="mt-8 text-sm sm:text-base leading-6">
        Browse other questions tagged &nbsp;
        {tags.map((t) => (
          // `/` is needed because only `pages/index` handles these query param changes
          <Tag tag="a" key={t} label={t} href={`/?tag=${t}`} tw="mr-1" />
        ))}
        &nbsp; or &nbsp;
        {user ? (
          <>
            <Link href="/ask" passHref>
              <StyledAnchor>ask your own question.</StyledAnchor>
            </Link>
          </>
        ) : (
          <AuthFormOnButton />
        )}
      </div>
    </div>
  )
}

export default AnswerForm
