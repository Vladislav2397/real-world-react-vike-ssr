import {
    concurrency,
    createJsonMutation,
    createJsonQuery,
    declareParams,
    update,
} from '@farfetched/core'
import * as z from '@withease/contracts'
import urlcat from 'urlcat'

const authorContract = z.obj({
    username: z.str,
    bio: z.str,
    image: z.or(z.str, z.nothing),
    following: z.bool,
})

const articleContract = z.obj({
    id: z.num,
    slug: z.str,
    title: z.str,
    description: z.str,
    body: z.str,
    createdAt: z.str,
    updatedAt: z.str,
    favoritesCount: z.num,
    authorId: z.num,
    author: authorContract,
    tagList: z.arr(z.str),
    favorited: z.bool,
})

export const getArticleListResponseContract = z.obj({
    articles: z.arr(articleContract),
    articlesCount: z.num,
})

export const getTagsResponseContract = z.obj({
    tags: z.arr(z.str),
})
export const getArticleResponseContract = z.obj({
    article: articleContract,
})

export const getArticleListQuery = createJsonQuery({
    params: declareParams<{ tag?: string; tab?: string }>(),
    request: {
        url: ({ tab, tag }) => {
            if (tab === 'self') {
                return urlcat('http://localhost:4100/api/articles/feed', {
                    limit: 12,
                    offset: 0,
                })
            }

            return urlcat('http://localhost:4100/api/articles', {
                limit: 12,
                offset: 0,
                tag: tag ?? '',
            })
        },
        method: 'GET',
    },
    response: {
        contract: getArticleListResponseContract,
    },
})
concurrency(getArticleListQuery, { strategy: 'TAKE_LATEST' })
export type Author = z.UnContract<typeof authorContract>
export type Article = z.UnContract<typeof articleContract>
export type GetArticleListResponse = z.UnContract<
    typeof getArticleListResponseContract
>

export const getArticleQuery = createJsonQuery({
    params: declareParams<{ slug: string }>(),
    request: {
        url: ({ slug }) =>
            urlcat('http://localhost:4100/api/articles/:slug', { slug }),
        method: 'GET',
    },
    response: {
        contract: getArticleResponseContract,
    },
})
concurrency(getArticleQuery, { strategy: 'TAKE_LATEST' })
export type GetArticleResponse = z.UnContract<typeof getArticleResponseContract>

const commentContract = z.obj({
    id: z.num,
    createdAt: z.str,
    updatedAt: z.str,
    body: z.str,
    author: authorContract,
})
const getArticleCommentListResponseContract = z.obj({
    comments: z.arr(commentContract),
})

export const getArticleCommentListQuery = createJsonQuery({
    params: declareParams<{ slug: string }>(),
    request: {
        url: ({ slug }) =>
            urlcat('http://localhost:4100/api/articles/:slug/comments', {
                slug,
            }),
        method: 'GET',
    },
    response: {
        contract: getArticleCommentListResponseContract,
    },
})
concurrency(getArticleCommentListQuery, { strategy: 'TAKE_LATEST' })
export type Comment = z.UnContract<typeof commentContract>
export type GetArticleCommentListResponse = z.UnContract<
    typeof getArticleCommentListResponseContract
>

export const getTagsQuery = createJsonQuery({
    request: {
        url: 'http://localhost:4100/api/tags',
        method: 'GET',
    },
    response: {
        contract: getTagsResponseContract,
    },
})
concurrency(getTagsQuery, { strategy: 'TAKE_LATEST' })
export type GetTagsResponse = z.UnContract<typeof getTagsResponseContract>

export const favoriteArticleMutation = createJsonMutation({
    params: declareParams<{ slug: string }>(),
    request: {
        url: ({ slug }) =>
            urlcat('http://localhost:4100/api/articles/:slug/favorite', {
                slug,
            }),
        method: 'POST',
    },
    response: {
        contract: getArticleResponseContract,
    },
})
export type FavoriteArticleResponse = GetArticleResponse
export const unfavoriteArticleMutation = createJsonMutation({
    params: declareParams<{ slug: string }>(),
    request: {
        url: ({ slug }) =>
            urlcat('http://localhost:4100/api/articles/:slug/favorite', {
                slug,
            }),
        method: 'DELETE',
    },
    response: {
        contract: getArticleResponseContract,
    },
})
export type UnfavoriteArticleResponse = GetArticleResponse

update(getArticleQuery, {
    on: favoriteArticleMutation,
    by: {
        success: ({ mutation, query }) => ({
            result: {
                article: {
                    ...query.result.article,
                    favorited: mutation.result.article.favorited,
                },
            },
        }),
    },
})
update(getArticleQuery, {
    on: unfavoriteArticleMutation,
    by: {
        success: ({ mutation, query }) => ({
            result: {
                article: {
                    ...query.result.article,
                    favorited: mutation.result.article.favorited,
                },
            },
        }),
    },
})
