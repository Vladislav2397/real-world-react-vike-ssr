import { allSettled } from 'effector'
import type { PageContextClient } from 'vike/types'

import * as appModel from '../app/model'
import { getScope } from '@utils/effector'

export const onBeforeRenderClient = async (pageContext: PageContextClient) => {
    const { scopeValues } = pageContext
    const scope = getScope(scopeValues)

    if (pageContext.isHydration) {
        const { enableMocking } = await import('@/mock-server/browser')
        enableMocking()
        await allSettled(appModel.appStarted, { scope })
    }
}
