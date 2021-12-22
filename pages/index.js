import { useEffect, useState } from 'react'
import { ReplyForm } from '../components/ReplyForm'
import { PostList } from '../components/Post'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const [comments, setComments] = useState([])
  useEffect(() => {
    fetcher('/api/comments').then(({ comments }) => {
      setComments(comments)
    })
  }, [])

  return (
    <div className="bg-very-light-gray  overflow-auto">
      <div
        // className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        className="hidden"
        id="my-modal"
      ></div>
      <div className="w-[343px] desktop:w-[730px] mx-auto my-8">
        <PostList comments={comments} />
        <ReplyForm className="mt-4" />
      </div>
    </div>
  )
}
