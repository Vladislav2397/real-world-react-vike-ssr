import type { PageContextServer } from 'vike/types'
import axios from 'axios'
import { baseURL } from '@/shared/api/config'

type DateISOString = string
type URLString = string

type Author = {
    username: string
    bio: string
    image: URLString
    following: boolean
}

type ArticleResponse = {
    article: {
        slug: string
        title: string
        description: string
        body: string
        tagList: string[]
        createdAt: DateISOString
        updatedAt: DateISOString
        favorited: boolean
        favoritesCount: number
        author: Author
    }
}

type Comment = {
    id: number
    createdAt: DateISOString
    updatedAt: DateISOString
    body: string
    author: Author
}

type CommentListResponse = {
    comments: Comment[]
}

export async function data(pageContext: PageContextServer) {
    const { slug } = pageContext.routeParams

    const { article } = (
        await axios.get<ArticleResponse>(baseURL(`/articles/${slug}`))
    ).data

    const commentsResponse = (
        await axios.get<CommentListResponse>(
            baseURL(`/articles/${slug}/comments`)
        )
    ).data

    return { article, comments: commentsResponse.comments }
}

export type Data = Awaited<ReturnType<typeof data>>
