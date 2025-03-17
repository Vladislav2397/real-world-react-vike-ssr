import { createPageStart } from '@utils/effector'
import type { Data } from './+data'
import { $pageContext } from './model'
import { sample } from 'effector'

export const pageStarted = createPageStart<Data>()

sample({
    clock: pageStarted,
    target: $pageContext,
})
