import React, { Component } from 'react';
import * as API from '../NetworkAPI'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Approve from '../images/approve.png'
import Disapprove from '../images/disapprove.png'

function formatTimestamp(timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleString()
}
 
function fetchCommentForPost(parentId) {
  return (dispatch) => {
    API.fetchComment(parentId).then(comments => {
      dispatch({ type: 'FETCH_COMMENTS', parentId, comments })
    })
  }
}


class SinglePost extends Component {

  componentDidMount() {
    fetchCommentForPost(this.props.post.id)
  }

  render() {
    const { post, comments, votePost, fetchAllPosts } = this.props


    return (
      <div>
        {post && (
          <div className="post">
            <div className="post-description">
              <Link to={`/${post.category}/${post.id}`}>
                <div className="post-title"><h3>{post.title}</h3></div>
              </Link>
              <div className="post-body"><p>{post.body}</p></div>

              <div className="post-likes">
                <img src={Approve} width="28" height="28" onClick={() => {
                  votePost(post.id, "upVote")
                  fetchAllPosts()
                }} />
                <img src={Disapprove} width="28" height="28" onClick={() => {
                  votePost(post.id, "downVote")
                  fetchAllPosts()
                }} />
              </div>
              <div className="post-likes-comments">
                {post.voteScore} votes {comments && comments ? comments.length : 0} comments
              </div>
            </div>
            <div>
              <div className="post-author"><p><b>Category: </b> {post.category}</p></div>
              <div className="post-author"><p><b>Author: </b> {post.author}</p></div>
              <div className="post-author"><p><b>Time: </b> {formatTimestamp(post.timestamp)}</p></div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ comments }, { post }) {
  return {
    comments: comments[post.id]
  }
}

export default SinglePost
