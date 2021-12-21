import { useCurrentUser } from '../src/contexts/CurrentUser'
import { useEffect, useState } from 'react'
import { LikeButton } from '../component/LikeButton'
import { DeleteButton, EditButton, ReplyButton } from './Buttons'
import MediaQuery from 'react-responsive'
import { ReplyForm } from './ReplyForm'
import { DeleteModal } from './DeleteModal'

const Post = (props) => {
  const { author, date, avatar, body, replyingTo, replies } = props
  const { currentUser, fetchCurrentUser } = useCurrentUser()
  const [showReply, setShowReply] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => fetchCurrentUser(), [])
  const isPostFromCurrentUser =
    author === ((currentUser && currentUser.username) ?? '')

  const [likes, setLikes] = useState(props.likes)

  let likeButton = (
    <LikeButton
      likes={likes}
      onClickMinus={() => {
        setLikes(likes - 1)
      }}
      onClickPlus={() => {
        setLikes(likes + 1)
      }}
    />
  )

  let buttonBar = (
    <div className="flex flex-row justify-end gap-4">
      {isPostFromCurrentUser ? (
        <>
          <DeleteButton
            onClick={() => {
              setShowDeleteModal(true)
            }}
          />
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
  )

  let infoRow = (
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
  )

  let postBody = (
    <p className="text-body text-grayish-blue font-normal">
      {replyingTo !== undefined ? (
        <span className="mr-1 text-moderate-blue font-medium">
          @{replyingTo}
        </span>
      ) : null}
      {body}
    </p>
  )
  return (
    <div>
      <section
        className="
       flex flex-col gap-4 desktop:gap-6 desktop:flex-row
       bg-white rounded rounded-xl overflow-hidden
       font-rubik
       p-4 desktop:p-6"
      >
        <MediaQuery minWidth={1440}>
          {likeButton}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              {infoRow}
              {buttonBar}
            </div>
            {postBody}
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={1440 - 1}>
          {infoRow}
          {postBody}
          <div className="flex flex-row justify-between items-center">
            {likeButton}
            {buttonBar}
          </div>
        </MediaQuery>
      </section>
      {showReply ? <ReplyForm className="mt-4" /> : null}
      {replies.length > 0 ? (
        <div className=" pt-4">
          <div className="pl-4 border-l">
            <PostList comments={replies ?? []} />
          </div>
        </div>
      ) : null}
      {showDeleteModal ? (
        <DeleteModal
          closeModal={() => {
            setShowDeleteModal(false)
          }}
        />
      ) : null}
    </div>
  )
}

export function PostList(props) {
  const comments = props.comments ?? []
  return (
    <div className="flex flex-col gap-4">
      {comments.map(
        ({ id, content, createdAt, score, user, replyingTo, replies }) => {
          return (
            <Post
              key={id}
              author={user.username}
              avatar={user.image.png}
              replyingTo={replyingTo}
              date={createdAt}
              likes={score}
              body={content}
              replies={replies ?? []}
            />
          )
        },
      )}
    </div>
  )
}