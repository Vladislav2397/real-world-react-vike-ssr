import React from 'react'
import { useData } from 'vike-react/useData'
import type { Data } from './+data'
import { routes } from '@/shared/routing'

type Comment = Data['comments'][number]

const Page: React.FC = () => {
    const { article, comments } = useData<Data>()
    const { author } = article

    const authorLink = routes.profile.replace(
        ':username',
        article.author.username
    )

    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{article.title}</h1>

                    <div className="article-meta">
                        <a href={authorLink}>
                            <img src={author.image} />
                        </a>
                        <div className="info">
                            <a
                                href={authorLink}
                                className="author">
                                {author.username}
                            </a>
                            <span className="date">January 20th</span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp; Follow {author.username}{' '}
                            <span className="counter">(10)</span>
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Post{' '}
                            <span className="counter">(29)</span>
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-edit"></i> Edit Article
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                            <i className="ion-trash-a"></i> Delete Article
                        </button>
                    </div>
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>{article.description}</p>
                        <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                        <p>
                            It&apos;s a great solution for learning how other
                            frameworks work.
                        </p>
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
                    <div className="article-meta">
                        <a href="profile.html">
                            <img src="http://i.imgur.com/Qr71crq.jpg" />
                        </a>
                        <div className="info">
                            <a
                                href=""
                                className="author">
                                Eric Simons
                            </a>
                            <span className="date">January 20th</span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp; Follow Eric Simons
                        </button>
                        &nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Article{' '}
                            <span className="counter">(29)</span>
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-edit"></i> Edit Article
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                            <i className="ion-trash-a"></i> Delete Article
                        </button>
                    </div>
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

const CommentView: React.FC<{ comment: Comment }> = ({ comment }) => {
    return (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
            </div>
            <div className="card-footer">
                <a
                    href="/profile/author"
                    className="comment-author">
                    <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                    />
                </a>
                &nbsp;
                <a
                    href="/profile/jacob-schmidt"
                    className="comment-author">
                    Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                    <i className="ion-trash-a"></i>
                </span>
            </div>
        </div>
    )
}

const AddCommentForm: React.FC = () => {
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
