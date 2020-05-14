import { uuid } from './uuid'

it('return a unique value based a counter', () => {
  expect(uuid()).toEqual('id:0')
  expect(uuid()).toEqual('id:1')
  expect(uuid()).toEqual('id:2')
  expect(uuid()).toEqual('id:3')
})
