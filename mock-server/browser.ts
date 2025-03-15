import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { config } from './config'

export const worker = setupWorker(...handlers)

export const enableMocking = () => {
    worker.start(config)
}
