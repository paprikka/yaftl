import React, {
  useState,
  ChangeEventHandler,
  FormEventHandler,
} from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  TodosState,
  AddTodoAction,
  RemoveTodoAction,
} from '../../state/todos'

const mapState = (state: TodosState) => state
const mapDispatch = {
  addTodo: (descriptionText: string): AddTodoAction => ({
    descriptionText,
    type: 'todo:add',
  }),
  removeTodo: (id: string): RemoveTodoAction => ({
    id,
    type: 'todo:remove',
  }),
}

const connector = connect(mapState, mapDispatch)
type TodoListViewProps = ConnectedProps<typeof connector>

const TodolistViewPresenter = ({
  todos,
  addTodo,
  removeTodo,
}: TodoListViewProps) => {
  const [newTodoText, setNewTodoText] = useState('')
  const handleTodosAddInput: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => setNewTodoText(e.target.value)
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    addTodo(newTodoText)
    setNewTodoText('')
  }

  return (
    <div className='todos'>
      <h1 className='todos__header'>Today</h1>

      <ul className='todos__items' data-testid='todo-list'>
        {todos.map((todo, key) => (
          <li key={key}>
            {todo.descriptionText}
            <button
              onClick={() => removeTodo(todo.id)}
              aria-label={`Remove: ${todo.descriptionText}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      <form data-testid='add-todo-form' onSubmit={handleFormSubmit}>
        <input
          value={newTodoText}
          onChange={handleTodosAddInput}
          className='todos__add'
          placeholder='Add...'
        />
      </form>
    </div>
  )
}

export const TodolistView = connector(TodolistViewPresenter)
