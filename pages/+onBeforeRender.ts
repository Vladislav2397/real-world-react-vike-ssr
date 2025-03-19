import { appInitialized } from '@/app/model'
import { allSettled, fork, serialize } from 'effector'
import type { OnBeforeRenderAsync } from 'vike/types'

export const onBeforeRender: OnBeforeRenderAsync = async (
    pageContext
): ReturnType<OnBeforeRenderAsync> => {
    const { pageInitiated } = pageContext.config

    const scope = fork()

    if (pageInitiated) {
        await allSettled(appInitialized, { scope, params: pageContext })
        await allSettled(pageInitiated, { scope, params: pageContext })
    }

    return {
        pageContext: {
            scope,
            scopeValues: serialize(scope),
        },
    }
}
