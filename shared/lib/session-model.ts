import { createBarrier } from '@farfetched/core'
import { createStore, createEvent, combine } from 'effector'
import { persist } from 'effector-storage/local'

export const tokenReceived = createEvent<string>()

export const $token = createStore('').on(tokenReceived, (_, token) => token)

export const $isAuthorized = combine($token, Boolean)

persist({ store: $token, key: 'real-world/v1/token' })

const authBarrier = createBarrier({
    active: combine($token, (token) => isTokenInvalid(token)),
})

function isTokenInvalid(token: string) {
    return !token
}
