import { createPageStart } from '@utils/effector'
import { sample } from 'effector'
import { $pageContext } from './model'

export const pageStarted = createPageStart()

sample({
    clock: pageStarted,
    target: $pageContext,
})
