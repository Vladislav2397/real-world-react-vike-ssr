import React from 'react'
import { Article } from '@/shared/api/types'
import { useUnit } from 'effector-react'
import * as model from './model'

export type ToggleFavoriteArticleProps = {
    article: Article
}

export const ToggleFavoriteArticle: React.FC<ToggleFavoriteArticleProps> = ({
    article,
}) => {
    const [toggle] = useUnit([model.toggleButtonTriggered])

    return (
        <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => toggle(article)}>
            <i className="ion-heart"></i>
            &nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post&nbsp;
            {/* <span className="counter">(29)</span> */}
        </button>
    )
}
