import * as React from 'react'
import {
  render as rtlRender,
  fireEvent,
} from '@testing-library/react'
import { TodolistView } from '.'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer, initialState, TodosState } from '../../state/todos'

const render = (state = initialState) =>
  rtlRender(
    <Provider store={createStore(reducer, state)}>
      <TodolistView />
    </Provider>
  )

it('should render the title', () => {
  const { getByText } = render()
  expect(getByText('Today')).toBeTruthy()
})

it('should render todo items', () => {
  const state: TodosState = {
    todos: [1, 2, 3].map((ind) => ({
      id: ind.toString(),
      createdAt: Date.now() + ind,
      descriptionText: `Todo item #${ind}`,
      isDone: Boolean(ind % 2),
    })),
  }

  const { getByText, getByTestId } = render(state)

  const list = getByTestId('todo-list')
  expect(list).toBeTruthy()
  expect(list.children.length).toBe(3)
  expect(getByText('Todo item #1')).toBeTruthy()
  expect(getByText('Todo item #2')).toBeTruthy()
  expect(getByText('Todo item #3')).toBeTruthy()
})

it('should add a new todo', () => {
  const state: TodosState = {
    todos: [1, 2, 3].map((ind) => ({
      id: ind.toString(),
      createdAt: Date.now() + ind,
      descriptionText: `Todo item #${ind}`,
      isDone: Boolean(ind % 2),
    })),
  }

  const { getByPlaceholderText, getByTestId, getByText } = render(
    state
  )

  const list = getByTestId('todo-list')

  const addNewTodoInput = getByPlaceholderText('Add...')
  expect(addNewTodoInput).toBeTruthy()
  fireEvent.change(addNewTodoInput, {
    target: {
      value: 'Hey handsome 🦐',
    },
  })

  expect(addNewTodoInput).toHaveValue('Hey handsome 🦐')

  const form = getByTestId('add-todo-form')
  expect(form).toBeTruthy()

  fireEvent.submit(form)

  expect(list.children.length).toBe(4)
  expect(getByText('Todo item #1')).toBeTruthy()
  expect(getByText('Todo item #2')).toBeTruthy()
  expect(getByText('Todo item #3')).toBeTruthy()
  expect(getByText('Hey handsome 🦐')).toBeTruthy()

  expect(addNewTodoInput).toHaveValue('')
})

it('should remove a todo', () => {
  const state: TodosState = {
    todos: [
      {
        id: 'keep-me',
        createdAt: Date.now(),
        descriptionText: 'Please keep me',
        isDone: false,
      },
      {
        id: 'kill-me',
        createdAt: Date.now() + 1,
        descriptionText: 'Kill it with 🐈',
        isDone: false,
      },
    ],
  }

  const { getByLabelText, queryByText, getByTestId } = render(state)

  const removeButton = getByLabelText('Remove: Kill it with 🐈')
  expect(removeButton).toBeTruthy()

  fireEvent.click(removeButton)

  expect(queryByText('Kill it with 🐈')).toBeFalsy()
  expect(queryByText('Please keep me')).toBeTruthy()

  const list = getByTestId('todo-list')
  expect(list.children.length).toBe(1)
})
