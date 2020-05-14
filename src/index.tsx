import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { TodolistView } from './views/todolist'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer, initialState } from './state/todos'

const store = createStore(reducer, initialState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodolistView />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
