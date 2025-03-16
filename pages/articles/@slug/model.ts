import {
    Article,
    Comment,
    getArticleCommentListQuery,
    getArticleQuery,
} from '@/shared/api/queries/articles'
import { combine } from 'effector'
import * as sessionModel from '@/shared/lib/session-model'

export const $article = combine(
    getArticleQuery.$data,
    (data) => (data?.article ?? null) as unknown as Article
)
export const $comments = combine(
    getArticleCommentListQuery.$data,
    (data) => (data?.comments ?? []) as unknown as Comment[]
)

export const $isAuthorized = sessionModel.$isAuthorized
