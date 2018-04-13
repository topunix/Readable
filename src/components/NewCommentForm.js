import React, { Component } from 'react';
import * as API from '../NetworkAPI'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export function guid() {
  function random() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return random()
}


const createComment = (comment, parentId, callback) => {
  return (dispatch) => {
    API.addComment(comment).then(comment => {
      dispatch({ type: 'ADD_COMMENT', parentId, comment })
    }).then(() => callback())
  }
}

class NewCommentForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const postId = this.props.match.params.postId
    const commendBody = e.target.body.value
    const author = e.target.author.value

    if (commendBody === "" || author === "") {
      alert("Both fields are mandatory");
    } else {
      const submitComment = {
        id: guid(),
        parentId: postId,
        timestamp: Date.now(),
        body: commendBody,
        author: author
      }
      this.props.createComment(submitComment, postId,
        () => this.props.history.push(`/post/${postId}`))
    }
  }

  render() {
    const { post } = this.props

    return (
      <form className="postForm" onSubmit={this.handleSubmit}>
        <ul className="form-style-1">
          <li>
            <label>Name <span className="required">*</span></label>
            <input type="text" name="author" className="field-long" />
          </li>
          <li>
            <label>Comment <span className="required">*</span></label>
            <textarea name="body" id="field5" className="field-long field-textarea"></textarea>
          </li>
          <button>Submit</button>
        </ul>
      </form>
    )
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts: posts,
  }
}

export default connect(mapStateToProps, { createComment })(NewCommentForm)
