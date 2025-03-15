import { concurrency, createJsonQuery } from '@farfetched/core'
import * as z from '@withease/contracts'

const authorContract = z.obj({
    id: z.num,
    username: z.str,
    bio: z.str,
    image: z.str,
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

export const getArticlesResponseContract = z.obj({
    articles: z.arr(articleContract),
    articlesCount: z.num,
})

export const getTagsResponseContract = z.obj({
    tags: z.arr(z.str),
})

export const getArticlesQuery = createJsonQuery({
    request: {
        url: 'http://localhost:8888/api/articles?limit=12&offset=0',
        method: 'GET',
    },
    response: {
        contract: getArticlesResponseContract,
    },
})
concurrency(getArticlesQuery, { strategy: 'TAKE_LATEST' })
export const getTagsQuery = createJsonQuery({
    request: {
        url: 'http://localhost:8888/api/tags',
        method: 'GET',
    },
    response: {
        contract: getTagsResponseContract,
    },
})
concurrency(getTagsQuery, { strategy: 'TAKE_LATEST' })

export type Article = z.UnContract<typeof articleContract>
