import { combine, createEvent, restore, sample } from 'effector'
import { sessionModel } from '@/shared/lib/session-model'
import { Article, createCommentMutation } from '@/shared/api/queries/articles'
import { viewerModel } from '@/entities/viewer'

export const textChanged = createEvent<string>()
export const sendButtonTriggered = createEvent<Pick<Article, 'slug'>>()

export const $text = restore(textChanged, '')

export const $isAuthorized = sessionModel.$isAuthorized
export const $user = viewerModel.$user

const $params = combine($text, (text) => ({ body: text }))

sample({
    clock: sendButtonTriggered,
    source: $params,
    fn: (comment, article) => ({ slug: article.slug, comment }),
    target: createCommentMutation.start,
})
