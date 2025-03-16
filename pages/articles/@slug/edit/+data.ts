import { PageContextServer } from 'vike/types'

export async function data(pageContext: PageContextServer) {
    const { slug } = pageContext.routeParams

    return {
        slug,
    }
}
export type Data = Awaited<ReturnType<typeof date>>
