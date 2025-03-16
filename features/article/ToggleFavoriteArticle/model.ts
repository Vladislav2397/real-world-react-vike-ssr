import type { Article } from '@/shared/api/types'
import { createEvent, sample } from 'effector'
import {
    favoriteArticleMutation,
    unfavoriteArticleMutation,
} from '@/shared/api/queries/articles'

export const toggleButtonTriggered = createEvent<Article>()

sample({
    clock: toggleButtonTriggered,
    filter: (article) => !article.favorited,
    target: favoriteArticleMutation.start,
})
sample({
    clock: toggleButtonTriggered,
    filter: (article) => article.favorited,
    target: unfavoriteArticleMutation.start,
})
