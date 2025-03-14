import { sample } from 'effector'
import { pageStarted } from './+pageStarted'
import { getProfileQuery } from '@/shared/api/queries/profile'
import { debug } from 'patronum'

export const $data = getProfileQuery.$data
export const $isPending = getProfileQuery.$pending

sample({
    clock: pageStarted,
    fn: ({ routeParams }) => routeParams as { username: string },
    target: getProfileQuery.start,
})

debug({
    getProfileQueryFx: getProfileQuery.__.executeFx,
})
