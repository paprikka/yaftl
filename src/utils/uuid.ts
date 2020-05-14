let counter = 0

export const uuid = () => {
  const newID = `id:${counter}`
  counter++
  return newID
}
