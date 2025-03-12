import { createStore, createEvent } from 'effector'

const tokenReceived = createEvent<string>()

export const $token = createStore('').on(tokenReceived, (_, token) => token)
