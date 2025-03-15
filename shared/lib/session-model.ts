import { createEvent, combine, restore } from 'effector'
// import { persist } from 'effector-storage/local'

export const tokenReceived = createEvent<string>()

export const $token = restore(tokenReceived, '')

export const $isAuthorized = combine($token, Boolean)

// const pickup = sample({
//     clock: [appStarted, tokenReceived],
// })

// persist({ store: $token, key: 'real-world/v1/token' })
