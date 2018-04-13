function categories(state=[], action) {
  switch(action.type) {
    case 'FETCH_CATEGORY':
      return action.res.categories
    default:
      return state
  }
}

export default categories
