import { http, HttpResponse } from 'msw'

export const articleHandlers = [
    http.get('http://localhost:4100/api/articles', () => {
        return HttpResponse.json({
            articles: articles,
            articlesCount: articles.length,
        })
    }),
    http.get('http://localhost:4100/api/articles/:slug', ({ params }) => {
        const { slug } = params

        const found = articles.find((article) => article.slug === slug)

        return HttpResponse.json({
            article: found,
        })
    }),
    http.get('http://localhost:4100/api/tags', () => {
        return HttpResponse.json({
            tags: [
                ...new Set(articles.map((article) => article.tagList).flat()),
            ],
        })
    }),
]

const articles = [
    {
        id: 1,
        slug: 'how-to-train-your-dragon',
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'It takes a Jacobian',
        createdAt: '2025-03-12T17:09:25.478Z',
        updatedAt: '2025-03-12T17:09:25.478Z',
        favoritesCount: 2,
        authorId: 1,
        author: {
            id: 1,
            username: 'Admin',
            bio: 'lore ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        },
        tagList: ['dragon', 'coffee', 'nest'],
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
            id: 2,
            username: 'TestUser',
            bio: 'elit sed do e lore ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
            image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        },
        tagList: ['dragon'],
        favorited: false,
    },
]
