import {
  reducer,
  initialState,
  TodosState,
  AddTodoAction,
  RemoveTodoAction,
} from '.'
import { timestamp } from '../../utils/timestamp'
import { uuid } from '../../utils/uuid'

jest.mock('../../utils/timestamp', () => ({
  timestamp: jest.fn().mockReturnValue(0),
}))

jest.mock('../../utils/uuid', () => {
  let counter = 0
  return {
    uuid: () => `${counter++}`,
  }
})

it('returns the initial state', () => {
  expect(initialState).toEqual({
    todos: [],
  })
})

describe('AddTodoAction', () => {
  it('should prepend a new todo', () => {
    const prevState: TodosState = {
      todos: [
        {
          createdAt: 666,
          id: '666',
          isDone: true,
          descriptionText: 'hello darkness my old friend 🦐',
        },
      ],
    }
    const action: AddTodoAction = {
      type: 'todo:add',
      descriptionText: 'hello',
    }
    const result = reducer(prevState, action)
    const expectedResult: TodosState = {
      todos: [
        {
          createdAt: 666,
          id: '666',
          isDone: true,
          descriptionText: 'hello darkness my old friend 🦐',
        },
        {
          createdAt: 0,
          descriptionText: 'hello',
          id: '0',
          isDone: false,
        },
      ],
    }
    expect(result).toEqual(expectedResult)
  })
})

describe('RemoveTodoAction', () => {
  it('should remove a todo', () => {
    const prevState: TodosState = {
      todos: [
        {
          createdAt: 555,
          id: '555',
          isDone: true,
          descriptionText: '🦐',
        },
        {
          createdAt: 666,
          id: '666',
          isDone: true,
          descriptionText: 'hello darkness my old friend 🦐',
        },
        {
          createdAt: 777,
          id: '777',
          isDone: false,
          descriptionText: 'hello dankness my moist friend 🐬',
        },
      ],
    }
    const action: RemoveTodoAction = {
      type: 'todo:remove',
      id: '666',
    }
    const result = reducer(prevState, action)
    const expectedResult: TodosState = {
      todos: [
        {
          createdAt: 555,
          id: '555',
          isDone: true,
          descriptionText: '🦐',
        },
        {
          createdAt: 777,
          id: '777',
          isDone: false,
          descriptionText: 'hello dankness my moist friend 🐬',
        },
      ],
    }
    expect(result).toEqual(expectedResult)
  })
  it('should return the original state if todo item does not exist', () => {
    const prevState: TodosState = {
      todos: [
        {
          createdAt: 555,
          id: '555',
          isDone: true,
          descriptionText: '🦐',
        },
        {
          createdAt: 777,
          id: '777',
          isDone: true,
          descriptionText: '🦐',
        },
      ],
    }
    const action: RemoveTodoAction = {
      type: 'todo:remove',
      id: 'i dont exist',
    }
    const result = reducer(prevState, action)

    expect(result).toBe(prevState)
  })
})
