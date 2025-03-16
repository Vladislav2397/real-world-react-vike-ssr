import React from 'react'
import { AuthorView } from '../AuthorView'
import { Comment } from '@/shared/api/types'

export type CommentViewProps = {}

export const CommentView: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
            </div>
            <AuthorView
                className="card-footer"
                author={comment.author}
            />
        </div>
    )
}
