import { baseURL } from '@/shared/api/config'
import { Article } from '@/shared/api/queries/articles'
import axios from 'axios'
import { PageContextServer } from 'vike/types'

export async function data(pageContext: PageContextServer) {
    const { username } = pageContext.routeParams

    const { profile } = (await axios.get(baseURL(`/profiles/${username}`))).data
    const { articles } = (
        await axios.get<{ articles: Article[] }>(
            baseURL(`/articles/?author=${username}&limit=20&offset=0`)
        )
    ).data

    return {
        profile,
        articles,
    }
}

export type Data = Awaited<ReturnType<typeof data>>
