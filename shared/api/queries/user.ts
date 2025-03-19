import { concurrency, createJsonQuery, declareParams } from '@farfetched/core'
import { baseURL } from '../config'
import * as z from '@withease/contracts'

const userContract = z.obj({
    email: z.str,
    token: z.str,
    username: z.str,
    bio: z.str,
    image: z.or(z.str, z.nothing),
})
export type User = z.UnContract<typeof userContract>

const getCurrentUserResponseContract = z.obj({
    user: userContract,
})
export const getCurrentUserQuery = createJsonQuery({
    request: {
        url: baseURL('/user'),
        method: 'GET',
    },
    response: {
        contract: getCurrentUserResponseContract,
    },
})
concurrency(getCurrentUserQuery, { strategy: 'TAKE_LATEST' })

type UpdateCurrentUserDto = {
    user: Partial<{
        email: string
        username: string
        password: string
        bio: string
        image: string
    }>
}

export const updateCurrentUserMutation = createJsonQuery({
    params: declareParams<UpdateCurrentUserDto>(),
    request: {
        url: baseURL('/user'),
        method: 'PUT',
    },
    response: {
        contract: userContract,
    },
})
concurrency(updateCurrentUserMutation, { strategy: 'TAKE_LATEST' })
