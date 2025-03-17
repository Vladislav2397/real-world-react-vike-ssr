import { createPageInit } from '@utils/effector'
import { sample } from 'effector'
import { Data } from './+data'
import { getProfileQuery } from '@/shared/api/queries/profile'
import { getArticleListQuery } from '@/shared/api/queries/articles'

export const pageInitiated = createPageInit<Data>()

sample({
    clock: pageInitiated,
    fn: (context) => ({ username: context.data.author }),
    target: getProfileQuery.start,
})
sample({
    clock: pageInitiated,
    fn: (context) => context.data,
    target: getArticleListQuery.start,
})
