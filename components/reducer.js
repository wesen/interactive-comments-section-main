export const ACTIONS = {
  SET_COMMENTS: 'SET_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
}

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }

    case ACTIONS.ADD_COMMENT:
      const addedComment = action.payload
      const { replyToId } = addedComment

      const addReply = (comment) => {
        if (comment.id === replyToId) {
          return {
            ...comment,
            replies: [...(comment.replies ?? []), addedComment],
          }
        } else {
          return {
            ...comment,
            replies: (comment.replies ?? []).map(addReply),
          }
        }
      }

      if (replyToId == null) {
        return {
          ...state,
          comments: [...state.comments, addedComment],
        }
      } else {
        return {
          ...state,
          comments: state.comments.map(addReply),
        }
      }

    case ACTIONS.DELETE_COMMENT:
      const deleteComment = (comments) => {
        return comments
          .filter((c) => c.id !== action.payload.id)
          .map((c) => {
            return {
              ...c,
              replies: c.replies && deleteComment(c.replies),
            }
          })
      }
      return {
        ...state,
        comments: deleteComment(state.comments),
      }

    case ACTIONS.UPDATE_COMMENT:
      const { id, content, score } = action.payload

      const updateComment = (c) => {
        if (c.id === id) {
          return {
            ...c,
            content: content ?? c.content,
            score: score ?? c.score,
          }
        } else {
          return {
            ...c,
            replies: c.replies.map(updateComment),
          }
        }
      }
      return {
        ...state,
        comments: state.comments.map(updateComment),
      }

    default:
      return state
  }
}
