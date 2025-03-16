import React from 'react'
import { useUnit } from 'effector-react'

import { ToggleFollowAuthor } from '@/features/article/ToggleFollowAuthor'
import { ToggleFavoriteArticle } from '@/features/article/ToggleFavoriteArticle'

import { CommentView } from '@/entities/article/ui/CommentView'
import { ArticleMeta } from '@/entities/article/ui/ArticleMeta'

import * as model from './model'
import { AddCommentForm } from '@/features/article/AddCommentForm'
import { RemoveCommentButton } from '@/features/article/RemoveCommentButton'

const Page: React.FC = () => {
    const [article, comments] = useUnit([model.$article, model.$comments])

    if (!article) return null
    if (!comments) return null

    const { author } = article

    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>

                    <ArticleMeta article={article}>
                        <ToggleFollowAuthor author={author} />
                        &nbsp;&nbsp;
                        <ToggleFavoriteArticle article={article} />
                        {/* <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-edit"></i> Edit Article
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                            <i className="ion-trash-a"></i> Delete Article
                        </button> */}
                    </ArticleMeta>
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
                    <ArticleMeta article={article}>
                        <ToggleFollowAuthor author={author} />
                        &nbsp;&nbsp;
                        <ToggleFavoriteArticle article={article} />
                        {/* <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-edit"></i> Edit Article
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                            <i className="ion-trash-a"></i> Delete Article
                        </button> */}
                    </ArticleMeta>
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
