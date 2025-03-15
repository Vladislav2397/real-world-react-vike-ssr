import React from 'react'
import { navigate } from 'vike/client/router'
import { useUnit } from 'effector-react'
import clsx from 'clsx'

import { ArticlePreview } from '@/entities/article/ui/ArticlePreview'

import { Link } from '@/shared/ui/Link'

import * as model from './model'

const Page: React.FC = () => {
    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <Tabs />
                        <Articles />
                        <Pagination />
                    </div>

                    <Tags />
                </div>
            </div>
        </div>
    )
}

const Tabs: React.FC = () => {
    const [tabs] = useUnit([model.$tabs])

    return (
        <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
                {tabs.map((tab) => (
                    <li
                        key={tab.key}
                        className="nav-item">
                        <div
                            className={clsx(
                                'nav-link',
                                tab.isActive && 'active'
                            )}
                            onClick={() => navigate(`?tab=${tab.key}`)}>
                            {tab.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Articles: React.FC = () => {
    const [articles] = useUnit([model.$articles])

    return (
        <>
            {articles.map((article) => (
                <ArticlePreview
                    key={article.slug}
                    article={article}
                />
            ))}
        </>
    )
}

const Pagination: React.FC = () => {
    const [pages] = useUnit([model.$pages])

    if (pages.length <= 1) {
        return null
    }

    return (
        <ul className="pagination">
            {pages.map((page) => (
                <li
                    key={page}
                    className="page-item active">
                    <Link
                        className="page-link"
                        href="">
                        {page}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

const Tags: React.FC = () => {
    const [tags] = useUnit([model.$tags])

    return (
        <div className="col-md-3">
            <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href="#"
                            className="tag-pill tag-default">
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page
