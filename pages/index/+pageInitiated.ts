import {
    getArticleListQuery,
    getTagsQuery,
} from '@/shared/api/queries/articles'
import { createPageInit } from '@utils/effector'
import { sample } from 'effector'
import { $tab, $tag } from './model'
import { spread } from 'patronum'

export const pageInitiated = createPageInit()

sample({
    clock: pageInitiated,
    fn: (context) => validateQueryParams(context.urlParsed.search),
    target: spread({
        tab: $tab,
        tag: $tag,
    }),
})
sample({
    clock: pageInitiated,
    source: { tab: $tab, tag: $tag },
    fn: (source) => source,
    target: [getArticleListQuery.start, getTagsQuery.start],
})

function validateQueryParams(params: { tag?: string; tab?: string }) {
    if (!params.tag || !params.tab) return params

    if (params.tab === 'tag' && !params.tag) return { tab: 'all', tag: '' }
    if (params.tab !== 'tag' && params.tag) return { tab: 'all', tag: '' }

    return params
}
