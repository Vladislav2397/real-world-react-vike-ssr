import type express from 'express'

export function sessionMiddleware(app: express.Application) {
    app.all(/api\/(.*)/, async (req, res, next) => {
        console.log('session middleware', req.url)
        return next()
    })
}
