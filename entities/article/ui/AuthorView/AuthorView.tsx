import React from 'react'

import type { Author } from '@/shared/api/queries/articles'
import { routes } from '@/shared/routing'
import { Link } from '@/shared/ui/Link'

export type AuthorViewProps = {
    author: Author
    className?: string
}

export const AuthorView: React.FC<React.PropsWithChildren<AuthorViewProps>> = ({
    author,
    className,
    children,
}) => {
    const link = routes.profile.replace(':username', author.username)

    return (
        <div className={className}>
            <Link
                href={link}
                className="comment-author">
                <img
                    src={author.image ?? ''}
                    className="comment-author-img"
                />
            </Link>
            &nbsp;
            <Link
                href={link}
                className="comment-author">
                {author.username}
            </Link>
            <span className="date-posted">Dec 29th</span>
            {children}
        </div>
    )
}
