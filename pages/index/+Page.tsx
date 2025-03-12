import React from 'react'
// import * as model from './model'
import type { Article } from '@/shared/api/queries/articles'
import { useData } from 'vike-react/useData'
import dayjs from 'dayjs'

import type { Data } from './+data'
import { Link } from '@/shared/ui/Link'
import { routes } from '@/shared/routing'

const LIMIT = 5

const Page: React.FC = () => {
    const data = useData<Data>()

    const pages = new Array(Math.ceil(data.articlesCount / LIMIT))
        .fill(0)
        .map((_, index) => index + 1)

    const renderArticle = (article: Article) => {
        return (
            <ArticleRow
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

type ArticleRowProps = {
    article: Article
}

const ArticleRow: React.FC<ArticleRowProps> = ({ article }) => {
    const { author } = article
    const profileLink = routes.profile.replace(':username', author.username)
    const articleLink = routes.article.replace(':slug', article.slug)

    return (
        <div className="article-preview">
            <div className="article-meta">
                <Link href={profileLink}>
                    <img src={author.image} />
                </Link>
                <div className="info">
                    <Link
                        href={profileLink}
                        className="author">
                        {author.username}
                    </Link>
                    <span className="date">
                        {dayjs(article.updatedAt).format('MMMM D, YYYY')}
                    </span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {article.favoritesCount}
                </button>
            </div>
            <Link
                href={articleLink}
                className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
                <ul className="tag-list">
                    {article.tagList.map((tag, index) => {
                        return (
                            <li
                                key={index}
                                className="tag-default tag-pill tag-outline">
                                {tag}
                            </li>
                        )
                    })}
                </ul>
            </Link>
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
