import _ from 'lodash'
import * as API from '../NetworkAPI'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const fetchAllPosts = () => {
  return (dispatch) => {
    API.fetchPosts().then(posts => {
      dispatch({ type: 'FETCH_POSTS', posts })
    })
  }
}

const updatePost = (postId, title, body, callback) => {
  return (dispatch) => {
    API.updatePost(postId, title, body).then(updatedPost => {
      dispatch({ type: 'UPDATE_POST', updatedPost, postId })
    }).then(() => callback())
  }
}

const fetchCommentForPost = (parentId) => {
  return (dispatch) => {
    API.fetchComment(parentId).then(comments => {
      dispatch({ type: 'FETCH_COMMENTS', parentId, comments })
    })
  }
}

class EditPostForm extends Component {
  componentDidMount() {
    this.props.fetchAllPosts()
    this.props.fetchCommentForPost(this.props.match.params.postId)
  }

  editPost = (e) => {
    e.preventDefault()
    const postId = this.props.post.id
    const title = e.target.title.value
    const body = e.target.body.value

    if (body === "" || title === "") {
      alert("Both fields are mandatory")
    } else {
      this.props.updatePost(postId, title, body,
        () => this.props.history.push('/'))
    }
  }

  render() {
    const { post } = this.props

    return (
      <div>
        <form className="postForm" onSubmit={this.editPost}>
          <h2>Edit Post</h2>
          <ul className="form-style-1">
            <li>
              <label>Title <span className="required">*</span></label>
              <input defaultValue={post.title} type="text" name="title" className="field-long" />
            </li>
            <li>
              <label>Post <span className="required">*</span></label>
              <textarea defaultValue={post.body} name="body" id="field5" className="field-long field-textarea"></textarea>
            </li>
            <button>Update</button>
            <Link to={`/post/${post.id}`}>
              <button>Cancel</button>
            </Link>
          </ul>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: _.find(posts, { id: match.params.postId }),
    comments: comments[match.params.postId]
  }
}

export default connect(mapStateToProps, { fetchAllPosts, updatePost, fetchCommentForPost })(EditPostForm)
