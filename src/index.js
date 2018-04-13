import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from '../src/reducers/index'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	  reducer,
	  composeEnhancers(
		      applyMiddleware(logger, thunk)
		      )
	  )

ReactDOM.render(
	  <BrowserRouter>
	    <Provider store={store}>
	      <App />
	    </Provider>
	  </BrowserRouter>
	  , document.getElementById('root'));
registerServiceWorker();
