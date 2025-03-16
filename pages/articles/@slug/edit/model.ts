import { combine, createEvent, createStore, restore, sample } from 'effector'
import {
    getArticleQuery,
    updateArticleMutation,
} from '@/shared/api/queries/articles'

export const titleChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()
export const bodyChanged = createEvent<string>()
export const tagNameChanged = createEvent<string>()
export const tagNameAdded = createEvent<string>()
export const tagNameRemoved = createEvent<string>()
export const updateButtonTriggered = createEvent()

export const $title = restore(titleChanged, '')
export const $description = restore(descriptionChanged, '')
export const $body = restore(bodyChanged, '')
export const $tagName = restore(tagNameChanged, '').reset(tagNameAdded)
export const $tags = createStore<string[]>([])
    .on(tagNameAdded, (state, tag) => [...state, tag])
    .on(tagNameRemoved, (state, tag) => state.filter((t) => t !== tag))
export const $errors = createStore<string[]>([])

export const $isLoading = updateArticleMutation.$pending
const $slug = combine(getArticleQuery.$data, (data) => data?.article.slug ?? '')

const $fields = combine({
    title: $title,
    description: $description,
    body: $body,
    tagList: $tags,
    slug: $slug,
})

sample({
    clock: updateButtonTriggered,
    source: $fields,
    target: updateArticleMutation.start,
})
