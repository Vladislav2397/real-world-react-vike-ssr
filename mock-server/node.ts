import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { config } from './config'

export const server = setupServer(...handlers)

export const enableMocking = () => {
    server.listen(config)
}
