import {
    getArticleListQuery,
    getTagsQuery,
} from '@/shared/api/queries/articles'
import { attach, combine, createEvent, createStore, sample } from 'effector'
import * as sessionModel from '@/shared/lib/session-model'
import { navigate } from 'vike/client/router'
import { PageContextClient } from 'vike/types'
import { spread } from 'patronum'

const LIMIT = 5

export type Tab = {
    key: 'self' | 'all' | 'tag'
    name: string
    isActive: boolean
}

export const $pageContext = createStore<PageContextClient>(
    null as unknown as PageContextClient
)

const navigateFx = attach({
    source: $pageContext,
    effect: (pageContext: PageContextClient, url: string) =>
        navigate(`${pageContext.urlPathname}${url}`, {
            overwriteLastHistoryEntry: true,
        }),
})

export const $articles = combine(
    getArticleListQuery.$data,
    (data) => data?.articles ?? []
)
export const $articlesCount = combine(
    getArticleListQuery.$data,
    (data) => data?.articlesCount ?? 0
)

export const $tab = createStore('all')
export const $tag = createStore('')

export const $tags = combine(getTagsQuery.$data, (data) => data?.tags ?? [])
export const $tabs = combine(
    {
        isAuthorized: sessionModel.$isAuthorized,
        activeTag: $tag,
        activeTab: $tab,
    },
    ({ isAuthorized, activeTag, activeTab }) => {
        const arr: Tab[] = []

        if (isAuthorized) {
            arr.push({
                key: 'self',
                name: 'Your Feed',
                isActive: activeTab === 'self',
            })
        }

        arr.push({
            key: 'all',
            name: 'Global Feed',
            isActive: activeTab === 'all',
        })

        if (activeTab === 'tag') {
            arr.push({
                key: 'tag',
                name: `#${activeTag}`,
                isActive: true,
            })
        }

        return arr
    }
)
export const $pages = combine($articlesCount, (articlesCount) =>
    new Array(Math.ceil(articlesCount / LIMIT))
        .fill(0)
        .map((_, index) => index + 1)
)

export const queryParamsUpdated =
    createEvent<Partial<{ tab: Tab['key']; tag: string }>>()
sample({
    clock: queryParamsUpdated,
    fn: ({ tag, tab }) => ({ tab, tag }),
    target: spread({ tag: $tag, tab: $tab }),
})
sample({
    source: { tab: $tab, tag: $tag },
    fn: queryParamsToString,
    target: navigateFx,
})

function queryParamsToString(queryParams: Record<string, string | null>) {
    return Object.entries(queryParams)
        .filter(([, value]) => Boolean(value))
        .reduce((total, [key, value]) => {
            if (!total) {
                return `?${key}=${value}`
            }

            return `${total}&${key}=${value}`
        }, '')
}
