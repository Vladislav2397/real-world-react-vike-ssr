import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

export const enableMocking = () => {
    server.listen()
}
