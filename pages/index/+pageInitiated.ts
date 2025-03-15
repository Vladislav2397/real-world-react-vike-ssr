import { getArticlesQuery, getTagsQuery } from '@/shared/api/queries/articles'
import { createPageStart } from '@utils/effector'
import { sample } from 'effector'

export const pageInitiated = createPageStart()

sample({
    clock: pageInitiated,
    target: [getArticlesQuery.start, getTagsQuery.start],
})
