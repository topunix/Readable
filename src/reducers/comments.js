function comments(state={}, action) {
  const { comments, commentId, parentId, updatedComment} = action
  switch(action.type) {
    case 'FETCH_COMMENTS':
      return Object.assign({}, state, {[parentId]: comments})
    case 'ADD_COMMENT':
      return Object.assign({}, state, {[parentId]: comments})
    case 'UPDATE_COMMENT':
      return {
        ...state,
        [parentId]: state[parentId].map(comment => {
          if(comment.id === commentId) {
            comment = updatedComment
          }
          return comment
        })
      }
    case 'VOTE_COMMENT':
      return {
        ...state,
        [parentId]: state[parentId].map(comment => {
          if(comment.id === commentId) {
            comment = updatedComment
          }
          return comment
        })
      }
    case 'DELETE_COMMENT':
      return state
    default:
    return state
  }
}

export default comments
