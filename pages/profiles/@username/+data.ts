import { PageContextServer } from 'vike/types'

export async function data(pageContext: PageContextServer) {
    const { username } = pageContext.routeParams
    const { favorited } = pageContext.urlParsed.search

    return {
        author: username,
        favorited: favorited === 'true' ? username : '',
    }
}

export type Data = Awaited<ReturnType<typeof data>>
