import React from 'react'
import { useData } from 'vike-react/useData'

import { ArticlePreview } from '@/entities/article/ui/ArticlePreview'

import type { Article } from '@/shared/api/queries/articles'
import { Link } from '@/shared/ui/Link'

import type { Data } from './+data'

const LIMIT = 5

const Page: React.FC = () => {
    const data = useData<Data>()

    const pages = new Array(Math.ceil(data.articlesCount / LIMIT))
        .fill(0)
        .map((_, index) => index + 1)

    const renderArticle = (article: Article) => {
        return (
            <ArticlePreview
                key={article.slug}
                article={article}
            />
        )
    }
    const renderTag = (tag: string) => (
        <Link
            key={tag}
            href="#"
            className="tag-pill tag-default">
            {tag}
        </Link>
    )

    const renderPage = (page: number) => (
        <li
            key={page}
            className="page-item active">
            <Link
                className="page-link"
                href="">
                {page}
            </Link>
        </li>
    )

    return (
        <div className="home-page">
            <Banner />

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="">
                                        Your Feed
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        href="">
                                        Global Feed
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {data.articles.map(renderArticle)}
                        {pages.length > 1 && (
                            <ul className="pagination">
                                {pages.map(renderPage)}
                            </ul>
                        )}
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                {data.tags.map(renderTag)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Banner: React.FC = () => {
    return (
        <div className="banner">
            <div className="container">
                <h1 className="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
    )
}

export default Page
