import React from 'react'
import { useData } from 'vike-react/useData'
import type { Data } from './+data'
import { ArticlePreview } from '@/entities/article/ui/ArticlePreview'
import { Article } from '@/shared/api/queries/articles'

const Page: React.FC = () => {
    const { profile, articles } = useData<Data>()

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
                                    <a
                                        className="nav-link active"
                                        href="">
                                        My Articles
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="">
                                        Favorited Articles
                                    </a>
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
