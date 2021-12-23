import { Reducer, useEffect, useReducer } from 'react'
import { ReplyForm } from '../components/ReplyForm'
import { CommentList } from '../components/Comment'
import { createComment } from '../src/apiClient'
import { reducer, ACTIONS } from '../components/reducer'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, {
    comments: [],
  })

  useEffect(() => {
    fetcher('/api/comments').then(({ comments }) => {
      dispatch({ type: ACTIONS.SET_COMMENTS, payload: comments })
    })
  }, [])

  const onFormSubmit = async (content: string) => {
    createComment(content)
      .then((comment) => {
        dispatch({
          type: ACTIONS.ADD_COMMENT,
          payload: { ...comment, replies: [] },
        })
      })
      .catch((error) => {
        console.log('error', error)
        alert(`Could not create comment: ${error.message || error}`)
      })
  }

  return (
    <div className="bg-very-light-gray  overflow-auto">
      <div
        // className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        className="hidden"
        id="my-modal"
      />
      <div className="w-[343px] desktop:w-[730px] mx-auto my-8">
        <CommentList comments={state.comments} dispatch={dispatch} />
        <ReplyForm className="mt-4" onSubmit={onFormSubmit} content="" />
      </div>
    </div>
  )
}
