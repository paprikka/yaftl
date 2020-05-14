import { timestamp } from './timestamp'

beforeAll(() => jest.spyOn(Date, 'now').mockReturnValue(666_666_666))

afterAll(() => (Date.now as any).mockRestore())

it('should return a UNIX timestamp', () => {
  expect(Date.now).not.toHaveBeenCalled()

  const result = timestamp()

  expect(Date.now).toHaveBeenCalledTimes(1)
  expect(result).toBe(666_666_666)
})
