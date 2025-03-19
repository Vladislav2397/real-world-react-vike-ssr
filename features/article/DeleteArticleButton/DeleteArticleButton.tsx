import React from 'react'
import { Article } from '@/shared/api/types'
import { useUnit } from 'effector-react'
import * as model from './model'

export type DeleteArticleButtonProps = {
    article: Article
}

export const DeleteArticleButton: React.FC<DeleteArticleButtonProps> = ({
    article,
}) => {
    const [remove] = useUnit([model.removeButtonTriggered])

    const onClick = () => remove(article)

    return (
        <button className="btn btn-sm btn-outline-danger">
            <i className="ion-trash-a"></i> Delete Article
        </button>
    )
}
