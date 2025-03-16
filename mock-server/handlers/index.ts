import { articleHandlers } from './article'
import { userHandlers } from './user'
import { profileHandlers } from './profile'

export const handlers = [
    ...articleHandlers,
    ...userHandlers,
    ...profileHandlers,
]
