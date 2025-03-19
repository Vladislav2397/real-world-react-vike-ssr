import { createJsonMutation, declareParams } from '@farfetched/core'
import * as z from '@withease/contracts'
import { baseURL } from '../config'

const signUpResponseContract = z.obj({
    user: z.obj({
        email: z.str,
        token: z.str,
        username: z.str,
        bio: z.or(z.str, z.nothing),
        image: z.or(z.str, z.nothing),
    }),
})

export const signUpMutation = createJsonMutation({
    params: declareParams<SignUpDto>(),
    request: {
        url: baseURL('/users'),
        method: 'POST',
        body: (params) => params,
    },
    response: {
        contract: signUpResponseContract,
    },
})

const signInResponseContract = signUpResponseContract
export const signInResponseFailureContract = z.obj({
    errors: z.obj({
        email: z.or(z.arr(z.str), z.nothing),
        password: z.or(z.arr(z.str), z.nothing),
        Error: z.or(z.str, z.nothing),
    }),
})

export const signInMutation = createJsonMutation({
    params: declareParams<SignInDto>(),
    request: {
        url: baseURL('/users/login'),
        method: 'POST',
        body: (params) => params,
    },
    response: {
        contract: signInResponseContract,
    },
})

export type SignUpDto = {
    user: {
        email: string
        username: string
        password: string
    }
}
export type SignUpResponse = z.UnContract<typeof signUpResponseContract>

export type SignInDto = {
    user: {
        email: string
        password: string
    }
}
export type SignInResponse = z.UnContract<typeof signInResponseContract>
