import React from 'react'
import { useUnit } from 'effector-react'

import { ToggleFollowAuthor } from '@/features/article/ToggleFollowAuthor'
import { ToggleFavoriteArticle } from '@/features/article/ToggleFavoriteArticle'

import { CommentView } from '@/entities/article/ui/CommentView'
import { ArticleMeta } from '@/entities/article/ui/ArticleMeta'

import * as model from './model'
import { Link } from '@/shared/ui/Link'
import { routes } from '@/shared/routing'

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
                        <AddCommentForm />

                        {comments.map((comment) => (
                            <CommentView
                                key={comment.id}
                                comment={comment}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddCommentForm: React.FC = () => {
    const [isAuthorized] = useUnit([model.$isAuthorized])

    if (!isAuthorized)
        return (
            <p>
                Please <Link href={routes.signIn}>sign in</Link> or{' '}
                <Link href={routes.signUp}>sign up</Link> to add a comment.
            </p>
        )
    return (
        <form className="card comment-form">
            <div className="card-block">
                <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}></textarea>
            </div>
            <div className="card-footer">
                <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
            </div>
        </form>
    )
}

export default Page
