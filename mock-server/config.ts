import type { SharedOptions } from 'msw'

export function delay(ms = 1000) {
    return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
            resolve()
            clearTimeout(timeout)
        }, ms)
    })
}

export const config: SharedOptions = {
    onUnhandledRequest: (request, print) => {
        return
    },
}
