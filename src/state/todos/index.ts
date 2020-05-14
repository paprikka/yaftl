import { timestamp } from '../../utils/timestamp'
import { uuid } from '../../utils/uuid'

export type Todo = {
  id: string
  descriptionText: string
  isDone: boolean
  createdAt: number
}

export type TodosState = {
  todos: Todo[]
}

export type AddTodoAction = {
  type: 'todo:add'
  descriptionText: string
}
export type RemoveTodoAction = { type: 'todo:remove'; id: string }
export type ToggleTodoAction = { type: 'todo:toggle'; id: string }

export type TodosAction =
  | AddTodoAction
  | RemoveTodoAction
  | ToggleTodoAction

const addTodo = (
  prevState: TodosState,
  { descriptionText }: AddTodoAction
): TodosState => {
  const newTodo: Todo = {
    id: uuid(),
    createdAt: timestamp(),
    descriptionText,
    isDone: false,
  }

  return {
    ...prevState,
    todos: [...prevState.todos, newTodo],
  }
}

const removeTodo = (
  prevState: TodosState,
  { id }: RemoveTodoAction
): TodosState => {
  const maybeTodoIndex = prevState.todos.findIndex(
    (todo) => todo.id === id
  )

  if (maybeTodoIndex === -1) {
    return prevState
  }

  const todos = [
    ...prevState.todos.slice(0, maybeTodoIndex),
    ...prevState.todos.slice(maybeTodoIndex + 1),
  ]

  return {
    ...prevState,
    todos,
  }
}

export const reducer = (
  prevState: TodosState,
  action: TodosAction
) => {
  switch (action.type) {
    case 'todo:add':
      return addTodo(prevState, action)
    case 'todo:remove':
      return removeTodo(prevState, action)
    default:
      return prevState
  }
}

export const initialState: TodosState = {
  todos: [],
}
