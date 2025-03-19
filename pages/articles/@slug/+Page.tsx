import React from 'react'
import { useUnit } from 'effector-react'

import { CommentView } from '@/entities/article/ui/CommentView'
import { ArticleMeta } from '@/widgets/ArticleMeta'

import * as model from './model'
import { AddCommentForm } from '@/features/article/AddCommentForm'
import { RemoveCommentButton } from '@/features/article/RemoveCommentButton'

const Page: React.FC = () => {
    const [article, comments] = useUnit([model.$article, model.$comments])

    if (!article) return null
    if (!comments) return null

    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>

                    <ArticleMeta article={article} />
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>{article.body}</p>
                        <ul className="tag-list">
                            {article.tagList.map((tag, index) => (
                                <li
                                    key={index}
                                    className="tag-default tag-pill tag-outline">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    <ArticleMeta article={article} />
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-8 offset-md-2">
                        <AddCommentForm article={article} />

                        {comments.map((comment) => (
                            <CommentView
                                key={comment.id}
                                comment={comment}>
                                <RemoveCommentButton
                                    article={article}
                                    comment={comment}
                                />
                            </CommentView>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
