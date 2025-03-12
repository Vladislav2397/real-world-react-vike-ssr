import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('http://localhost:4100/api/user', () => {
        return HttpResponse.json({
            user: {
                email: 'jake@jake.jake',
                token: 'jwt.token.here',
                username: 'jake',
                bio: 'I work at state farm',
                image: null,
            },
        })
    }),
]
