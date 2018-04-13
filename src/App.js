import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import './App.css';
import { connect } from 'react-redux'
import * as API from './NetworkAPI'

import NewPostForm from './components/NewPostForm'
import NewCommentForm from './components/NewCommentForm'
import EditCommentForm from './components/EditCommentForm'
import EditPostForm from './components/EditPostForm'
import WelcomeScreen from './components/WelcomeScreen'
import PostDetail from './components/PostDetail'

const sortPost = (sortKey) => {
  return dispatch => {
    dispatch({ type: 'SORT_POST', sortKey })
  }
}

const fetchCategories = () => {
  return (dispatch) => {
    API.fetchCategories().then(res => {
      dispatch({ type: 'FETCH_CATEGORY', res })
    })
  }
}

class App extends Component {
  static propTypes = {
    posts: PropTypes.array,
    categories: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories, sortPost } = this.props

    return (
      <div className="App">
        <div className="nav-header">
          <Link className="home" to="/">
            READABLE HOME
          </Link>
          <Link className="new-post" to="/new">
            NEW POST
          </Link>
        </div>

        <div className="filters">
          <div className="sort-changer">
            <p>Sort Posts By</p>
            <button onClick={() => sortPost("timestamp")}>Time</button>
            <button onClick={() => sortPost("voteScore")}>Vote Score</button>
          </div>
          <div className="category-changer">
            <p>Filter Posts by Category</p>
            {categories && categories.map(category => (
              <Link key={category.name} to={`/${category.path}`}>
                <button>{category.name}</button>
              </Link>
            ))}
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={WelcomeScreen} />
          <Route exact path="/new" component={NewPostForm} />
          <Route exact path="/:category" component={WelcomeScreen} />
          <Route exact path="/:category/:postId" component={PostDetail} />
          <Route path="/:category/:postId/edit" component={EditPostForm} />
          <Route path="/:category/:postId/comment" component={NewCommentForm} />
          <Route path="/:category/:postId/:commentId/edit" component={EditCommentForm} />
        </Switch>

      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

export default withRouter(connect(mapStateToProps, { sortPost, fetchCategories })(App))
