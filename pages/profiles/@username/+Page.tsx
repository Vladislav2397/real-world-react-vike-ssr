import React from 'react'
import { useUnit } from 'effector-react'

import { ArticlePreview } from '@/entities/article/ui/ArticlePreview'

import type { Article } from '@/shared/api/types'

import * as model from './model'

const Page: React.FC = () => {
    const [profile, articles, isViewer, update] = useUnit([
        model.$profile,
        model.$articles,
        model.$isViewer,
        model.updateQueryParams,
    ])

    if (!profile) return null

    console.log('isViewer', isViewer)

    const renderArticle = (article: Article) => {
        return (
            <ArticlePreview
                key={article.slug}
                article={article}
            />
        )
    }

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img
                                src={profile.image}
                                className="user-img"
                            />
                            <h4>{profile.username}</h4>
                            <p>{profile.bio}</p>
                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-plus-round"></i>
                                &nbsp; Follow {profile.username}
                            </button>
                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-gear-a"></i>
                                &nbsp; Edit Profile Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <div
                                        className="nav-link active"
                                        onClick={() =>
                                            update({ favorited: false })
                                        }>
                                        My Articles
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className="nav-link"
                                        onClick={() =>
                                            update({ favorited: true })
                                        }>
                                        Favorited Articles
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {articles.map(renderArticle)}

                        <ul className="pagination">
                            <li className="page-item active">
                                <a
                                    className="page-link"
                                    href="">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    href="">
                                    2
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
