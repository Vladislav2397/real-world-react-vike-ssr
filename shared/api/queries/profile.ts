import { concurrency, createJsonQuery, declareParams } from '@farfetched/core'
import * as z from '@withease/contracts'
import { baseURL } from '../config'
import { $token } from '@/shared/lib/session-model'

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

type ProfileResponse = z.UnContract<typeof getProfileResponseContract>
