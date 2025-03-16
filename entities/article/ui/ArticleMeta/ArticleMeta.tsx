import { Article } from '@/shared/api/types'
import { routes } from '@/shared/routing'
import { Link } from '@/shared/ui/Link'
import dayjs from 'dayjs'
import React from 'react'

export type ArticleMetaProps = {
    article: Article
}

export const ArticleMeta: React.FC<
    React.PropsWithChildren<ArticleMetaProps>
> = ({ article, children }) => {
    const { author } = article
    const profileLink = routes.profile.replace(':username', author.username)

    return (
        <div className="article-meta">
            <Link href={profileLink}>
                <img src={author.image ?? ''} />
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
            {children}
        </div>
    )
}
