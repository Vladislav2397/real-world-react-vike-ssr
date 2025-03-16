import { http, HttpResponse } from 'msw'
import { delay } from '../config'

export const profileHandlers = [
    http.post('/api/profiles/:username/follow', async () => {
        await delay(1000)
        return HttpResponse.json({
            profile: {
                username: 'jake',
                bio: 'I work at statefarm',
                image: 'https://api.realworld.io/images/smiley-cyrus.jpg',
                following: true,
            },
        })
    }),
    http.delete('/api/profiles/:username/follow', async () => {
        await delay(1000)
        return HttpResponse.json({
            profile: {
                username: 'jake',
                bio: 'I work at statefarm',
                image: 'https://api.realworld.io/images/smiley-cyrus.jpg',
                following: false,
            },
        })
    }),
]
