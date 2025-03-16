import { combine, createEvent, createStore, restore, sample } from 'effector'
import {
    createArticleMutation,
    getArticleQuery,
} from '@/shared/api/queries/articles'
import { spread } from 'patronum'

export const titleChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()
export const bodyChanged = createEvent<string>()
export const tagNameChanged = createEvent<string>()
export const tagNameAdded = createEvent<string>()
export const tagNameRemoved = createEvent<string>()
export const publishButtonTriggered = createEvent()

export const $title = restore(titleChanged, '')
export const $description = restore(descriptionChanged, '')
export const $body = restore(bodyChanged, '')
export const $tagName = restore(tagNameChanged, '').reset(tagNameAdded)
export const $tags = createStore<string[]>([])
    .on(tagNameAdded, (state, tag) => [...state, tag])
    .on(tagNameRemoved, (state, tag) => state.filter((t) => t !== tag))
export const $errors = createStore<string[]>([])

export const $isLoading = createArticleMutation.$pending

const $fields = combine({
    title: $title,
    description: $description,
    body: $body,
    tagList: $tags,
})

sample({
    clock: getArticleQuery.$data,
    filter: Boolean,
    fn: (data) => data.article,
    target: spread({
        title: $title,
        description: $description,
        body: $body,
        tags: $tags,
    }),
})
sample({
    clock: publishButtonTriggered,
    source: $fields,
    target: createArticleMutation.start,
})
