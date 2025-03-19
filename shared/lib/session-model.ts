import { createEvent, combine, restore } from 'effector'

export const tokenReceived = createEvent<string>()

// export const $token = restore(tokenReceived, '')
export const $token = restore(tokenReceived, 'jwt.token.here')

export const $isAuthorized = combine($token, Boolean)

export const sessionModel = {
    tokenReceived,
    $token,
    $isAuthorized,
}
