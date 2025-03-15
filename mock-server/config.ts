import type { SharedOptions } from 'msw'

export const config: SharedOptions = {
    onUnhandledRequest: (request, print) => {
        return
    },
}
