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
                image: 'https://avatar.iran.liara.run/public',
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
                image: 'https://avatar.iran.liara.run/public',
            },
        })
    }),
    http.get('http://localhost:4100/api/user', () => {
        return HttpResponse.json(
            {
                user: {
                    email: 'jake@statefarm',
                    token: 'jwt.token.here',
                    username: 'Admin',
                    bio: 'I work at statefarm',
                    image: 'https://avatar.iran.liara.run/public',
                },
            },
            { status: 200 }
        )
    }),
]
