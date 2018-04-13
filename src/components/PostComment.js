import React, { Component } from 'react'
import * as API from '../NetworkAPI'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Approve from '../images/approve.png'
import Disapprove from '../images/disapprove.png'

export function formatTimestamp(timestamp) {
  const d = new Date(timestamp)
  return d.toLocaleString()
}

const fetchCommentForPost = (parentId) => {
  return (dispatch) => {
    API.fetchComment(parentId).then(comments => {
      dispatch({ type: 'FETCH_COMMENTS', parentId, comments })
    })
  }
}

const deleteComment = (commentId, callback) => {
  return (dispatch) => {
    API.deleteComment(commentId).then(() => callback())
    dispatch({ type: 'DELETE_COMMENT', commentId })
  }
}

const voteComment = (commentId, parentId, option) => {
  return (dispatch) => {
    API.voteComment(commentId, option).then(updatedComment => {
      dispatch({ type: 'VOTE_COMMENT', updatedComment, commentId, parentId })
    })
  }
}

class PostComment extends Component {

  onCommentDelete = (comment) => {
    let parentId = comment.parentId
    this.props.deleteComment(comment.id, () => {
      this.props.history.push(`/post/${parentId}`)
      this.props.fetchCommentForPost(comment.parentId)      
    })
  }

  render() {
    return (
      <div>
        {this.props.comments.map(comment => (
          <div className="comment" key={comment.id}>
            <div>
              <p>{comment.body}</p>
              <div className="comment-author"><p> by <b>{comment.author}</b> at {formatTimestamp(comment.timestamp)}</p></div>
              <div className="post-likes">
                <img src={Approve} width="28" height="28" onClick={() => {
                  this.props.voteComment(comment.id, comment.parentId, "upVote")
                }} />
                <img src={Disapprove} width="28" height="28" onClick={() => {
                  this.props.voteComment(comment.id, comment.parentId, "downVote")
                }} />
                {comment.voteScore} votes
                </div>
            </div>
            <div className="button-action">
              <Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => this.onCommentDelete(comment)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, {fetchCommentForPost,deleteComment,voteComment})(PostComment)
