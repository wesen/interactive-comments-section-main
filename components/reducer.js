export const ACTIONS = {
  SET_COMMENTS: 'SET_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
}

export default function reducer(state, action) {
  console.log('state', state, 'action', action)
  switch (action.type) {
    case ACTIONS.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      }

    default:
      return state
  }
}
