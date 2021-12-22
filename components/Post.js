import { useCurrentUser } from '../src/contexts/CurrentUser'
import { useEffect, useState } from 'react'
import { LikeButton } from './LikeButton'
import { Button, DeleteButton, EditButton, ReplyButton } from './Buttons'
import MediaQuery from 'react-responsive'
import { ReplyForm } from './ReplyForm'
import { DeleteModal } from './DeleteModal'

function PostBody(props) {
  return (
    <p className="text-body text-grayish-blue font-normal">
      {props.replyingTo !== undefined ? (
        <span className="mr-1 text-moderate-blue font-medium">
          @{props.replyingTo}
        </span>
      ) : null}
      {props.body}
    </p>
  )
}

function PostInfoRow({ author, avatar, date, postFromCurrentUser }) {
  return (
    <div className="flex flex-row justify-start items-center gap-4">
      <img className="w-8" src={`${avatar}`} alt={`${author} avatar`} />
      <p className="font-medium text-heading-md text-dark-blue">{author}</p>
      {postFromCurrentUser ? (
        <div className="bg-moderate-blue rounded px-2 py-1 text-white text-flair">
          you
        </div>
      ) : null}
      <p className="font-body text-grayish-blue">{date}</p>
    </div>
  )
}

const Post = (props) => {
  const { author, date, avatar, body, replyingTo, replies } = props
  const { currentUser, fetchCurrentUser } = useCurrentUser()
  const [showReply, setShowReply] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isEditMode, setEditMode] = useState(false)
  const [updateContent, setUpdateContent] = useState(body)
  console.log(isEditMode ? 'EDIT' : 'NO_EDIT')

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
          <EditButton
            onClick={() => {
              setEditMode(true)
            }}
          />
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
    <PostInfoRow
      avatar={avatar}
      author={author}
      postFromCurrentUser={isPostFromCurrentUser}
      date={date}
    />
  )

  let postBody = isEditMode ? (
    <div className="w-full flex flex-col justify-between items-end gap-4">
      <textarea
        className="w-full h-32
        placeholder
        border border-light-gray focus:border-moderate-blue desktop:hover:border-moderate-blue rounded-lg
        text-body text-dark-blue p-4 resize-none
        focus:outline-none focus:border-moderate-blue
        "
        value={updateContent}
        onChange={(e) => {
          setUpdateContent(e.target.value)
        }}
      />
      <Button name="Update" onClick={onHandleUpdate()} />
    </div>
  ) : (
    <PostBody replyingTo={replyingTo} body={body} />
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
          <div className="flex flex-col gap-4 w-full">
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
          onCancel={() => {
            setShowDeleteModal(false)
          }}
          onDelete={handleDelete}
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
