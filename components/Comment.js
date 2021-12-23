import { useCurrentUser } from '../src/contexts/CurrentUser'
import { useEffect, useState } from 'react'
import { LikeButton } from './LikeButton'
import { Button, DeleteButton, EditButton, ReplyButton } from './Buttons'
import MediaQuery from 'react-responsive'
import { ReplyForm } from './ReplyForm'
import { DeleteModal } from './DeleteModal'
import * as PropTypes from 'prop-types'
import {
  deleteComment,
  downvoteComment,
  replyComment,
  updateComment,
  upvoteComment,
} from '../src/apiClient'
import { ACTIONS } from './reducer'

function CommentBody({ body, replyingTo }) {
  return (
    <p className="text-body text-grayish-blue font-normal">
      {replyingTo !== undefined ? (
        <span className="mr-1 text-moderate-blue font-medium">
          @{replyingTo}
        </span>
      ) : null}
      {body}
    </p>
  )
}

function CommentEditBody({ content, onSave }) {
  const [updateContent, setUpdateContent] = useState(content || '')

  return (
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
      <Button
        name="Update"
        onClick={(e) => {
          e.preventDefault()
          onSave(updateContent)
        }}
      />
    </div>
  )
}

function CommentInfoRow({ author, avatar, date, postFromCurrentUser }) {
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

function CommentButtonBar(props) {
  return (
    <div className="flex flex-row justify-end gap-4">
      {props.postFromCurrentUser ? (
        <>
          <DeleteButton onClick={props.onDelete} />
          <EditButton onClick={props.onEdit} />
        </>
      ) : (
        <ReplyButton onClick={props.onReply} />
      )}
    </div>
  )
}

CommentButtonBar.propTypes = {
  postFromCurrentUser: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onReply: PropTypes.func,
}
const Comment = ({ comment, dispatch }) => {
  const { id, user, date, content, replyingTo, replies, score } = comment
  const [author, avatar] = [user.username, user.image.png]

  const { currentUser, fetchCurrentUser } = useCurrentUser()

  const [showReply, setShowReply] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isEditMode, setEditMode] = useState(false)

  useEffect(() => fetchCurrentUser(), [])
  const isPostFromCurrentUser =
    author === ((currentUser && currentUser.username) ?? '')

  const handleDownVote = async () => {
    downvoteComment(id)
      .then((comment) => {
        dispatch({ type: ACTIONS.UPDATE_COMMENT, payload: comment })
        setEditMode(false)
      })
      .catch((error) => {
        alert(`Could not downvote comment: ${error.message || error}`)
        setEditMode(false)
      })
  }
  const handleUpVote = async () => {
    upvoteComment(id)
      .then((comment) => {
        dispatch({ type: ACTIONS.UPDATE_COMMENT, payload: comment })
        setEditMode(false)
      })
      .catch((error) => {
        alert(`Could not upvote comment: ${error.message || error}`)
        setEditMode(false)
      })
  }
  const handleUpdate = async (content) => {
    updateComment(id, content)
      .then((comment) => {
        dispatch({ type: ACTIONS.UPDATE_COMMENT, payload: comment })
        setEditMode(false)
      })
      .catch((error) => {
        alert(`Could not update comment: ${error.message || error}`)
        setEditMode(false)
      })
  }
  const handleDelete = async () => {
    deleteComment(id)
      .then((comments) => {
        dispatch({ type: ACTIONS.DELETE_COMMENT, payload: { id } })
      })
      .catch((error) => {
        alert(`Could not create comment: ${error.message || error}`)
      })
  }

  const handleReply = async (replyContent) => {
    replyComment(id, replyContent)
      .then((comment) => {
        dispatch({
          type: ACTIONS.ADD_COMMENT,
          payload: {
            ...comment,
            replies: [],
          },
        })
        setShowReply(false)
      })
      .catch((error) => {
        alert(`Could not reply to comment: ${error.message || error}`)
        setShowReply(false)
      })
  }

  let likeButton = (
    <LikeButton
      likes={score}
      onClickMinus={handleDownVote}
      onClickPlus={handleUpVote}
    />
  )

  let buttonBar = (
    <CommentButtonBar
      postFromCurrentUser={isPostFromCurrentUser}
      onDelete={() => setShowDeleteModal(true)}
      onEdit={() => setEditMode(true)}
      onReply={() => setShowReply(true)}
    />
  )

  let infoRow = (
    <CommentInfoRow
      avatar={avatar}
      author={author}
      postFromCurrentUser={isPostFromCurrentUser}
      date={date}
    />
  )

  let commentBody = isEditMode ? (
    <CommentEditBody content={content} onSave={handleUpdate} />
  ) : (
    <CommentBody replyingTo={replyingTo} body={content} />
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
            {commentBody}
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={1440 - 1}>
          {infoRow}
          {commentBody}
          <div className="flex flex-row justify-between items-center">
            {likeButton}
            {buttonBar}
          </div>
        </MediaQuery>
      </section>
      {showReply ? <ReplyForm onSubmit={handleReply} className="mt-4" /> : null}
      {replies.length > 0 ? (
        <div className=" pt-4">
          <div className="pl-4 border-l">
            <CommentList dispatch={dispatch} comments={replies ?? []} />
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

export function CommentList({ comments, dispatch }) {
  comments = comments ?? []
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => {
        return (
          <Comment key={comment.id} comment={comment} dispatch={dispatch} />
        )
      })}
    </div>
  )
}
