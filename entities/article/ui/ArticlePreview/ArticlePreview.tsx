import React from 'react'

import { routes } from '@/shared/routing'
import { Link } from '@/shared/ui/Link'
import type { Article } from '@/shared/api/queries/articles'

import { ArticleMeta } from '../ArticleMeta'

export type ArticlePreviewProps = {
    article: Article
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    const articleLink = routes.article.replace(':slug', article.slug)

    const renderTag = (tag: string, index: number) => {
        return (
            <li
                key={index}
                className="tag-default tag-pill tag-outline">
                {tag}
            </li>
        )
    }

    return (
        <div className="article-preview">
            <ArticleMeta article={article} />
            <Link
                href={articleLink}
                className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
                <ul className="tag-list">{article.tagList.map(renderTag)}</ul>
            </Link>
        </div>
    )
}
