import { articleHandlers } from './article'
import { userHandlers } from './user'

export const handlers = [...articleHandlers, ...userHandlers]
