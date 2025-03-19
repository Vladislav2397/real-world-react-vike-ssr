import React from 'react'
import { ArticleMeta as ArticleMetaRaw } from '@/entities/article/ui/ArticleMeta'
import { Article } from '@/shared/api/types'
import { ToggleFollowAuthor } from '@/features/article/ToggleFollowAuthor'
import { ToggleFavoriteArticle } from '@/features/article/ToggleFavoriteArticle'
import { useUnit } from 'effector-react'
import * as model from './model'
import { routes } from '@/shared/routing'
import { DeleteArticleButton } from '@/features/article/DeleteArticleButton'
import { Link } from '@/shared/ui/Link'

export type ArticleMetaProps = {
    article: Article
}

export const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }) => {
    const [user] = useUnit([model.$user])

    const isViewer = user?.username === article.author.username

    const linkToEdit = routes.editArticle.replace(':slug', article.slug)

    return (
        <ArticleMetaRaw article={article}>
            {isViewer ? (
                <>
                    <Link href={linkToEdit}>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-edit"></i> Edit Article
                        </button>
                    </Link>
                    &nbsp;
                    <DeleteArticleButton article={article} />
                </>
            ) : (
                <>
                    <ToggleFollowAuthor author={article.author} />
                    &nbsp;
                    <ToggleFavoriteArticle article={article} />
                </>
            )}
        </ArticleMetaRaw>
    )
}
