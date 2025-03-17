import {
    concurrency,
    createJsonMutation,
    createJsonQuery,
    declareParams,
} from '@farfetched/core'
import * as z from '@withease/contracts'
import { baseURL } from '../config'
import { $token } from '@/shared/lib/session-model'
import urlcat from 'urlcat'

const getProfileResponseContract = z.obj({
    profile: z.obj({
        username: z.str,
        bio: z.str,
        image: z.str,
        following: z.bool,
    }),
})

export const getProfileQuery = createJsonQuery({
    params: declareParams<{ username: string }>(),
    request: {
        url: ({ username }) => baseURL(`/profiles/${username}`),
        method: 'GET',
        headers: { Authorization: `Token ${$token.getState()}` },
    },
    response: {
        contract: getProfileResponseContract,
    },
})
concurrency(getProfileQuery, { strategy: 'TAKE_LATEST' })

export type GetProfileResponse = z.UnContract<typeof getProfileResponseContract>

export const followAuthorMutation = createJsonMutation({
    params: declareParams<{ username: string }>(),
    request: {
        url: ({ username }) =>
            urlcat(baseURL('/profiles/:username/follow'), { username }),
        method: 'POST',
    },
    response: {
        contract: getProfileResponseContract,
    },
})
export const unfollowAuthorMutation = createJsonMutation({
    params: declareParams<{ username: string }>(),
    request: {
        url: ({ username }) =>
            urlcat('http://localhost:4100/api/profiles/:username/follow', {
                username,
            }),
        method: 'DELETE',
    },
    response: {
        contract: getProfileResponseContract,
    },
})
