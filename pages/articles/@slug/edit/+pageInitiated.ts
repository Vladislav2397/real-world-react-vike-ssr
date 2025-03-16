import { createPageInit } from '@utils/effector'
import { Data } from './+data'
import { sample } from 'effector'
import { getArticleQuery } from '@/shared/api/queries/articles'

export const pageInitiated = createPageInit<Data>()

sample({
    clock: pageInitiated,
    fn: (context) => context.data,
    target: getArticleQuery.start,
})
