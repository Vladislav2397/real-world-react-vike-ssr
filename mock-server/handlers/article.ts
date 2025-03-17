import type {
    Article,
    CreateArticleCommentDto,
    CreateArticleDto,
} from '@/shared/api/types'
import { http, HttpResponse } from 'msw'
import { delay } from '../config'

export const articleHandlers = [
    http.get('http://localhost:4100/api/articles', ({ request }) => {
        let arr = [...articles]
        const searchParams = new URLSearchParams(request.url)

        const tag = searchParams.get('tag')
        const author = searchParams.get('author')
        const favorited = searchParams.get('favorited')

        if (tag) {
            arr = arr.filter((article) => article.tagList.includes(tag))
        }

        if (author) {
            arr = arr.filter(
                (article) =>
                    article.author.username.toLowerCase() ===
                    author.toLowerCase()
            )
        }

        if (favorited) {
            return HttpResponse.json({
                articles: [],
                articlesCount: 0,
            })
        }

        return HttpResponse.json({
            articles: arr,
            articlesCount: arr.length,
        })
    }),
    http.get('http://localhost:4100/api/articles/feed', () => {
        return HttpResponse.json({
            articles: [],
            articlesCount: 0,
        })
    }),
    http.get('http://localhost:4100/api/articles/:slug', ({ params }) => {
        const { slug } = params

        const found = articles.find((article) => article.slug === slug)

        if (!found) return HttpResponse.json(null, { status: 404 })

        return HttpResponse.json({
            article: found,
        })
    }),
    http.get('http://localhost:4100/api/articles/:slug/comments', () => {
        return HttpResponse.json({ comments })
    }),
    http.get('http://localhost:4100/api/tags', () => {
        return HttpResponse.json({
            tags: [
                ...new Set(articles.map((article) => article.tagList).flat()),
            ],
        })
    }),
    http.post(
        'http://localhost:4100/api/articles/:slug/favorite',
        async ({ params }) => {
            await delay()
            const { slug } = params

            const found = articles.find((article) => article.slug === slug)

            if (!found) return HttpResponse.json(null, { status: 404 })

            return HttpResponse.json({
                article: {
                    ...found,
                    favorited: true,
                },
            })
        }
    ),
    http.delete(
        'http://localhost:4100/api/articles/:slug/favorite',
        async ({ params }) => {
            await delay()
            const { slug } = params

            const found = articles.find((article) => article.slug === slug)

            if (!found) return HttpResponse.json(null, { status: 404 })

            return HttpResponse.json({
                article: {
                    ...found,
                    favorited: false,
                },
            })
        }
    ),
    http.post<object, CreateArticleDto>(
        'http://localhost:4100/api/articles',
        async ({ request }) => {
            await delay()
            const data = await request.json()

            const date = new Date().toISOString()

            return HttpResponse.json({
                article: {
                    id: 10,
                    slug: 'how-to-train-your-dragon',
                    title: data.title,
                    description: data.description,
                    body: data.body,
                    createdAt: date,
                    updatedAt: date,
                    favoritesCount: 2,
                    authorId: 1,
                    author: {
                        username: 'Admin',
                        bio: 'lore ipsum dolor sit',
                        image: 'https://avatar.iran.liara.run/public',
                        following: false,
                    },
                    tagList: data.tagList ?? [],
                    favorited: false,
                },
            })
        }
    ),
    http.put<object, CreateArticleDto>(
        'http://localhost:4100/api/articles',
        async ({ request }) => {
            await delay()
            const data = await request.json()

            const date = new Date().toISOString()

            return HttpResponse.json({
                article: {
                    id: 10,
                    slug: 'how-to-train-your-dragon',
                    title: data.title,
                    description: data.description,
                    body: data.body,
                    createdAt: '2025-03-12T17:09:25.478Z',
                    updatedAt: date,
                    favoritesCount: 2,
                    authorId: 1,
                    author: {
                        username: 'Admin',
                        bio: 'lore ipsum dolor sit',
                        image: 'https://avatar.iran.liara.run/public',
                        following: false,
                    },
                    tagList: data.tagList ?? [],
                    favorited: false,
                },
            })
        }
    ),
    http.post<object, CreateArticleCommentDto>(
        'http://localhost:4100/api/articles/:slug/comments',
        async ({ request }) => {
            await delay()
            const data = await request.json()

            const date = new Date().toISOString()

            return HttpResponse.json({
                comment: {
                    id: 1,
                    createdAt: date,
                    updatedAt: date,
                    body: data.comment.body,
                    author: {
                        username: 'jake',
                        bio: 'I work at statefarm',
                        image: 'https://i.stack.imgur.com/xHWG8.jpg',
                        following: false,
                    },
                },
            })
        }
    ),
    http.delete(
        'http://localhost:4100/api/articles/:slug/comments/:commentId',
        async ({ params }) => {
            await delay()
            const { commentId } = params

            if (!commentId) return HttpResponse.json(null, { status: 400 })

            const found = comments.find((item) => item.id === +commentId)

            if (!found) return HttpResponse.json(null, { status: 404 })

            return HttpResponse.json(null, { status: 204 })
        }
    ),
]

const articles: Article[] = [
    {
        id: 1,
        slug: 'how-to-train-your-dragon',
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'It a dragon',
        createdAt: '2025-03-12T17:09:25.478Z',
        updatedAt: '2025-03-12T17:09:25.478Z',
        favoritesCount: 2,
        authorId: 1,
        author: {
            username: 'Admin',
            bio: 'lore ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            image: 'https://avatar.iran.liara.run/public',
            following: false,
        },
        tagList: ['coffee'],
        favorited: false,
    },
    {
        id: 2,
        slug: 'how-to-train-your-dragon-2',
        title: 'How to train your dragon 2',
        description: 'So toothless',
        body: 'It a dragon',
        createdAt: '2025-03-12T17:09:25.478Z',
        updatedAt: '2025-03-12T17:09:25.478Z',
        favoritesCount: 1,
        authorId: 2,
        author: {
            username: 'TestUser',
            bio: 'elit sed do e lore ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
            image: 'https://avatar.iran.liara.run/public',
            following: false,
        },
        tagList: ['dragon'],
        favorited: false,
    },
    {
        id: 3,
        slug: 'how-to-train-your-dragon-3',
        title: 'How to train your dragon 3',
        description: 'So toothless',
        body: 'It a dragon',
        createdAt: '2025-03-12T17:09:25.478Z',
        updatedAt: '2025-03-12T17:09:25.478Z',
        favoritesCount: 0,
        authorId: 2,
        author: {
            username: 'TestUser',
            bio: 'elit sed do e lore ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
            image: 'https://avatar.iran.liara.run/public',
            following: false,
        },
        tagList: [],
        favorited: false,
    },
]

const comments = [
    {
        id: 1,
        createdAt: '2016-02-18T03:22:56.637Z',
        updatedAt: '2016-02-18T03:22:56.637Z',
        body: 'It takes a Jacobian',
        author: {
            username: 'jake',
            bio: 'I work at statefarm',
            image: 'https://i.stack.imgur.com/xHWG8.jpg',
            following: false,
        },
    },
]
