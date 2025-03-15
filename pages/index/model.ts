import { getArticlesQuery, getTagsQuery } from '@/shared/api/queries/articles'
import { combine, createStore, sample } from 'effector'
import { pageStarted } from './+pageStarted'
import * as sessionModel from '@/shared/lib/session-model'

const LIMIT = 5

export type Tab = {
    key: 'self' | 'all'
    name: string
    isActive: boolean
}

export const $articles = combine(
    getArticlesQuery.$data,
    (data) => data?.articles ?? []
)
export const $articlesCount = combine(
    getArticlesQuery.$data,
    (data) => data?.articlesCount ?? 0
)

export const $tab = createStore('all')
sample({
    clock: pageStarted,
    fn: (data) => data.urlParsed.search.tab ?? 'all',
    target: $tab,
})

export const $tags = combine(getTagsQuery.$data, (data) => data?.tags ?? [])
export const $tabs = combine(
    {
        isAuthorized: sessionModel.$isAuthorized,
        active: $tab,
    },
    ({ isAuthorized, active }) => {
        const arr: Tab[] = []

        if (isAuthorized) {
            arr.push({
                key: 'self',
                name: 'Your Feed',
                isActive: active === 'self',
            })
        }

        arr.push({
            key: 'all',
            name: 'Global Feed',
            isActive: active === 'all',
        })

        return arr
    }
)
export const $pages = combine($articlesCount, (articlesCount) =>
    new Array(Math.ceil(articlesCount / LIMIT))
        .fill(0)
        .map((_, index) => index + 1)
)
