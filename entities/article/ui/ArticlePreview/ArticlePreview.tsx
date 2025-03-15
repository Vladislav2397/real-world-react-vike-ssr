import React from 'react'
import { routes } from '@/shared/routing'
import dayjs from 'dayjs'
import { Link } from '@/shared/ui/Link'
import type { Article } from '@/shared/api/queries/articles'

export type ArticlePreviewProps = {
    article: Article
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
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
