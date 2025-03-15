import { http, HttpResponse } from 'msw'

export const userHandlers = [
    // login
    http.post<
        object,
        {
            user: {
                email: string
                password: string
            }
        }
    >('http://localhost:4100/api/users/login', async ({ request }) => {
        const data = await request.json()

        console.log('request data', data)

        return HttpResponse.json({
            user: {
                email: data.user.email,
                token: 'jwt.token.here',
                username: 'jake',
                bio: 'I work at statefarm',
                image: null,
            },
        })
    }),
    // registration
    http.post<
        object,
        {
            user: {
                username: string
                email: string
                password: string
            }
        }
    >('http://localhost:4100/api/users', async ({ request }) => {
        const data = await request.json()
        console.log('request data', data)

        return HttpResponse.json({
            user: {
                email: data.user.email,
                token: 'jwt.token.here',
                username: data.user.username,
                bio: 'I work at statefarm',
                image: null,
            },
        })
    }),
]
