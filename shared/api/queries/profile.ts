import {
    concurrency,
    createJsonMutation,
    createJsonQuery,
    declareParams,
    update,
} from '@farfetched/core'
import * as z from '@withease/contracts'
import { baseURL } from '../config'
import { $token } from '@/shared/lib/session-model'
import urlcat from 'urlcat'
import { getArticleQuery } from './articles'

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
            urlcat('http://localhost:4100/api/profiles/:username/follow', {
                username,
            }),
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

update(getArticleQuery, {
    on: followAuthorMutation,
    by: {
        success: ({ mutation, query }) => ({
            result: {
                article: {
                    ...query.result.article,
                    author: {
                        ...query.result.article.author,
                        following: mutation.result.profile.following,
                    },
                },
            },
        }),
    },
})
update(getArticleQuery, {
    on: unfollowAuthorMutation,
    by: {
        success: ({ mutation, query }) => ({
            result: {
                article: {
                    ...query.result.article,
                    author: {
                        ...query.result.article.author,
                        following: mutation.result.profile.following,
                    },
                },
            },
        }),
    },
})
