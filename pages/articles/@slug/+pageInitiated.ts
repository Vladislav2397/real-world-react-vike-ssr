import {
    getArticleCommentListQuery,
    getArticleQuery,
} from '@/shared/api/queries/articles'
import { createPageInit } from '@utils/effector'
import { sample } from 'effector'
import { Data } from './+data'

export const pageInitiated = createPageInit<Data>()

sample({
    clock: pageInitiated,
    fn: (context) => context.data,
    target: [getArticleQuery.start, getArticleCommentListQuery.start],
})
