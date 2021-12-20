import { useEffect, useState } from 'react'
import { useCurrentUser } from '../src/contexts/CurrentUser'

const fetcher = (url) => fetch(url).then((res) => res.json())

function LikeButton({ likes, onClickMinus, onClickPlus }) {
  return (
    <div
      className="
        flex flex-row
        justify-between items-center
        p-2 px-3 w-100px
        bg-very-light-gray rounded-lg"
    >
      <button
        className="pb-[2px] pl-[2px] fill-light-grayish-blue hover:fill-moderate-blue"
        onClick={onClickPlus}
        aria-label="Like"
      >
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
          <title>plus</title>
          <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
        </svg>
      </button>
      <div className="flex flex-row justify-center w-32">
        <p className="text-moderate-blue font-heading-md font-medium">
          {likes}
        </p>
      </div>
      <button
        onClick={onClickMinus}
        aria-label="Unlike"
        className="py-2 fill-light-grayish-blue hover:fill-moderate-blue"
      >
        <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
          <title>minus</title>
          <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
        </svg>
      </button>
    </div>
  )
}

const DeleteButton = ({ onClick }) => {
  return (
    <div
      className="flex flex-row items-center justify-between gap-2"
      aria-label="Delete"
    >
      <img className="object-contain w-4" src="/icon-delete.svg" alt="" />
      <a className="text-body font-medium text-soft-red" href="#">
        Delete
      </a>
    </div>
  )
}

const EditButton = ({ onClick }) => {
  return (
    <div
      className="flex flex-row items-center justify-between gap-2"
      aria-label="Delete"
    >
      <img className="object-contain w-5" src="/icon-edit.svg" alt="" />
      <a className="text-body font-medium text-moderate-blue" href="#">
        Edit
      </a>
    </div>
  )
}

const ReplyButton = ({ onClick }) => {
  return (
    <div
      className="flex flex-row items-center justify-between gap-2"
      aria-label="Reply"
    >
      <img className="object-contain w-5" src="/icon-reply.svg" alt="" />
      <a
        className="text-body font-medium text-moderate-blue"
        href="#"
        onClick={
          onClick
            ? (e) => {
                e.preventDefault()
                onClick()
              }
            : null
        }
      >
        Reply
      </a>
    </div>
  )
}

const Post = (props) => {
  const { author, date, avatar, body, replyingTo, replies } = props
  const { currentUser, fetchCurrentUser } = useCurrentUser()
  const [showReply, setShowReply] = useState(false)

  useEffect(() => fetchCurrentUser(), [])
  const isPostFromCurrentUser =
    author === ((currentUser && currentUser.username) ?? '')

  const [likes, setLikes] = useState(props.likes)
  return (
    <div>
      <section
        className="
       flex flex-col gap-4
       bg-white rounded rounded-xl overflow-hidden
       font-rubik
       p-4"
      >
        <div className="flex flex-row justify-start items-center gap-4">
          <img className="w-8" src={`${avatar}`} alt={`${author} avatar`} />
          <p className="font-medium text-heading-md text-dark-blue">{author}</p>
          {isPostFromCurrentUser ? (
            <div className="bg-moderate-blue rounded px-2 py-1 text-white text-flair">
              you
            </div>
          ) : null}
          <p className="font-body text-grayish-blue">{date}</p>
        </div>
        <p className="text-body text-grayish-blue font-normal">{body}</p>
        <div className="flex flex-row justify-between items-center">
          <LikeButton
            likes={likes}
            onClickMinus={() => {
              setLikes(likes - 1)
            }}
            onClickPlus={() => {
              setLikes(likes + 1)
            }}
          />
          <div className="flex flex-row justify-end gap-4">
            {isPostFromCurrentUser ? (
              <>
                <DeleteButton />
                <EditButton />
              </>
            ) : (
              <ReplyButton
                onClick={() => {
                  setShowReply(!showReply)
                }}
              />
            )}
          </div>
        </div>
      </section>
      {showReply ? <ReplyForm className="mt-4" /> : null}
      {replies.length > 0 ? (
        <div className=" pt-4">
          <div className="pl-4 border-l">
            <PostList comments={replies ?? []} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

function PostList(props) {
  const comments = props.comments ?? []
  return (
    <div className="flex flex-col gap-4">
      {comments.map(({ id, content, createdAt, score, user, replies }) => {
        return (
          <Post
            key={id}
            author={user.username}
            avatar={user.image.png}
            date={createdAt}
            likes={score}
            body={content}
            replies={replies ?? []}
          />
        )
      })}
    </div>
  )
}

function ReplyForm({ className }) {
  const { currentUser, fetchCurrentUser } = useCurrentUser()
  useEffect(() => fetchCurrentUser(), [])
  if (currentUser) {
    const author = currentUser.username
    const avatar = currentUser.image.png ?? ''

    const isPostFromCurrentUser =
      author === ((currentUser && currentUser.username) ?? '')
    return (
      <div>
        <section
          className={`
        ${className || ''}
       flex flex-col gap-4
       p-4
       bg-white rounded rounded-xl overflow-hidden
       font-rubik
       `}
        >
          <textarea className="w-full h-32 border rounded-lg text-body text-grayish-blue p-4 resize-none">
            Add a comment...
          </textarea>
          <div className="flex flex-row items-center justify-between">
            <img className="w-8" src={`${avatar}`} alt={`${author} avatar`} />
            <button
              aria-label="Send"
              className="bg-moderate-blue text-white text-body font-medium py-4 px-8 uppercase rounded rounded-xl"
            >
              Send
            </button>
          </div>
        </section>
      </div>
    )
  } else {
    return <></>
  }
}

export default function Home() {
  const [comments, setComments] = useState([])
  useEffect(() => {
    fetcher('/api/hello').then(({ comments }) => {
      setComments(comments)
    })
  }, [])

  return (
    <div className="bg-very-light-gray  overflow-auto">
      <div className="w-[343px] mx-auto my-8">
        <PostList comments={comments} />
        <ReplyForm className="mt-4" />
      </div>
    </div>
  )
}
