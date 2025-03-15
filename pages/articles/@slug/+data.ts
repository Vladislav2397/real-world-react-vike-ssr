import { baseURL } from '@/shared/api/config'
import axios from 'axios'
import { PageContextServer } from 'vike/types'

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

export async function data(pageContext: PageContextServer) {
    const { slug } = pageContext.routeParams

    const response = (
        await axios.get<ArticleResponse>(baseURL(`/articles/${slug}`))
    ).data

    return response
}

export type Data = Awaited<ReturnType<typeof data>>
