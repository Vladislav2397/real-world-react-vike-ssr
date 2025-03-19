import { getCurrentUserQuery } from '@/shared/api/queries/user'
import { createEvent, sample } from 'effector'
import { PageContextServer } from 'vike/types'

export const appStarted = createEvent()
export const appInitialized = createEvent<PageContextServer>()

sample({
    clock: appInitialized,
    target: getCurrentUserQuery.start,
})
