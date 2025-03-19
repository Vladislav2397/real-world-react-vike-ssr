import { attach, combine, createEvent, createStore, sample } from 'effector'
import { getProfileQuery } from '@/shared/api/queries/profile'
import { getArticleListQuery } from '@/shared/api/queries/articles'
import { PageContextClient } from 'vike/types'
import { Data } from './+data'
import { navigate } from 'vike/client/router'
import { viewerModel } from '@/entities/viewer'

export const $pageContext = createStore<PageContextClient<Data>>(
    null as unknown as PageContextClient<Data>
)

const navigateFx = attach({
    source: $pageContext,
    effect: (pageContext: PageContextClient, url: string) =>
        navigate(`${pageContext.urlPathname}${url}`, {
            overwriteLastHistoryEntry: true,
        }),
})

export const updateQueryParams = createEvent<{ favorited: boolean }>()

export const $profile = combine(
    getProfileQuery.$data,
    (data) => data?.profile ?? null
)
export const $articles = combine(
    getArticleListQuery.$data,
    (data) => data?.articles ?? []
)

export const $isViewer = combine(
    viewerModel.$user,
    $profile,
    (user, profile) => {
        return user?.username.toLowerCase() === profile?.username.toLowerCase()
    }
)

sample({
    clock: updateQueryParams,
    fn: queryParamsToString,
    target: navigateFx,
})

function queryParamsToString(
    queryParams: Record<string, string | boolean | null>
) {
    return Object.entries(queryParams)
        .filter(([, value]) => Boolean(value))
        .reduce((total, [key, value]) => {
            if (!total) {
                return `?${key}=${value}`
            }

            return `${total}&${key}=${value}`
        }, '')
}
