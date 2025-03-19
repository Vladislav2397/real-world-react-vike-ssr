import {
    type Article,
    deleteArticleMutation,
} from '@/shared/api/queries/articles'
import { createEvent, sample } from 'effector'

export const removeButtonTriggered = createEvent<Article>()

sample({
    clock: removeButtonTriggered,
    target: deleteArticleMutation.start,
})
