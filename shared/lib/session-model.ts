import { createStore, createEvent, combine } from 'effector'

export const tokenReceived = createEvent<string>()

export const $token = createStore('').on(tokenReceived, (_, token) => token)

export const $isAuthorized = combine($token, Boolean)
