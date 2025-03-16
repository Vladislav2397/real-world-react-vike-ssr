import { createEvent, sample } from 'effector'

import {
    followAuthorMutation,
    unfollowAuthorMutation,
} from '@/shared/api/queries/profile'
import { type Author } from '@/shared/api/queries/articles'

export const toggleFollowAuthorTriggered = createEvent<Author>()

sample({
    clock: toggleFollowAuthorTriggered,
    filter: (author) => !author.following,
    target: followAuthorMutation.start,
})
sample({
    clock: toggleFollowAuthorTriggered,
    filter: (author) => author.following,
    target: unfollowAuthorMutation.start,
})
