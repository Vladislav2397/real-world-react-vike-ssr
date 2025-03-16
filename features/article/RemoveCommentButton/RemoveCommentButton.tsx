import { Article, Comment } from '@/shared/api/types'
import { useUnit } from 'effector-react'
import React from 'react'
import * as model from './model'

export type RemoveCommentButtonProps = {
    article: Article
    comment: Comment
}

export const RemoveCommentButton: React.FC<RemoveCommentButtonProps> = ({
    article,
    comment,
}) => {
    const [remove] = useUnit([model.removeButtonTriggered])

    const { slug } = article
    const { id } = comment

    return (
        <span
            className="mod-options"
            onClick={() => remove({ slug, id })}>
            <i className="ion-trash-a"></i>
        </span>
    )
}
