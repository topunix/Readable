import React, { Component } from 'react';
import * as API from '../NetworkAPI'
import PropTypes from 'prop-types';
import SinglePost from './SinglePost'
import { connect } from 'react-redux'

const fetchAllPosts = () => {
  return (dispatch) => {
    API.fetchPosts().then(posts => {
      dispatch({ type: 'FETCH_POSTS', posts })
    })
  }
}
 
const fetchCommentForPost = (parentId) => {
  return (dispatch) => {
    API.fetchComment(parentId).then(comments => {
      dispatch({ type: 'FETCH_COMMENTS', parentId, comments })
    })
  }
}

const fetchPostsByCategory = (category) => {
  return (dispatch) => {
    API.fetchPostsByCategory(category).then(posts => {
      dispatch({ type: 'GET_CATEGORY_POSTS', posts })
    })
  }
}

const deletePost = (postId, callback) => {
  return dispatch => {
    API.deletePost(postId).then(() => callback())
    dispatch({ type: 'DELETE_POST', postId })
  }
}

const votePost = (postId, option) => {
  return (dispatch) => {
    API.votePost(postId, option).then(post => {
      dispatch({ type: 'VOTE_POST', postId, option })
    })
  }
}

class WelcomeScreen extends Component {
  static propTypes = {
    posts: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchAllPosts()
  }

  render() {
    const { posts, votePost, fetchAllPosts } = this.props
    return <div>
      {posts.map(post => (
        <SinglePost key={post.id} post={post} votePost={votePost} fetchAllPosts={fetchAllPosts} />
      ))}
    </div>
  }
}

function mapStateToProps({ posts }, { match }) {
  const category = match.params.category
  return {
    posts: category ? posts.filter(post => post.category === category) : posts
  }
}

export default connect(mapStateToProps, {fetchAllPosts, votePost})(WelcomeScreen)
