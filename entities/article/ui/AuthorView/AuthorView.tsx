import type { Author } from '@/shared/api/types'
import { routes } from '@/shared/routing'
import { Link } from '@/shared/ui/Link'
import React from 'react'

export type AuthorViewProps = {
    author: Author
    className?: string
}

export const AuthorView: React.FC<AuthorViewProps> = ({
    author,
    className,
}) => {
    const link = routes.profile.replace(':username', author.username)

    return (
        <div className={className}>
            <Link
                href={link}
                className="comment-author">
                <img
                    src={author.image}
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
            <span className="mod-options">
                <i className="ion-trash-a"></i>
            </span>
        </div>
    )
}
