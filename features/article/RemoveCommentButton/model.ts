import { viewerModel } from '@/entities/viewer'
import { removeCommentMutation } from '@/shared/api/queries/articles'
import { createEvent, sample } from 'effector'

export const removeButtonTriggered = createEvent<{ slug: string; id: number }>()

export const $isLoading = removeCommentMutation.$pending
export const $user = viewerModel.$user

sample({
    clock: removeButtonTriggered,
    target: removeCommentMutation.start,
})
