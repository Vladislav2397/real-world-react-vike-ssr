import React from 'react'
import { Link } from '@/shared/ui/Link'
import { routes } from '@/shared/routing'
import * as sessionModel from '@/shared/lib/session-model'
import { useUnit } from 'effector-react'

export const TheHeader: React.FC = () => {
    const [isAuthorized] = useUnit([sessionModel.$isAuthorized])

    return (
        <nav className="navbar navbar-light">
            {isAuthorized ? <Authenticated /> : <Unauthenticated />}
        </nav>
    )
}

const Authenticated: React.FC = () => {
    return (
        <div className="container">
            <a
                className="navbar-brand"
                href="/">
                conduit
            </a>
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <a
                        className="nav-link active"
                        href="/">
                        Home
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="/editor">
                        {' '}
                        <i className="ion-compose"></i>&nbsp;New Article{' '}
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="/settings">
                        {' '}
                        <i className="ion-gear-a"></i>&nbsp;Settings{' '}
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="/profile/eric-simons">
                        <img
                            src=""
                            className="user-pic"
                        />
                        Eric Simons
                    </a>
                </li>
            </ul>
        </div>
    )
}

const Unauthenticated: React.FC = () => {
    return (
        <div className="container">
            <a
                className="navbar-brand"
                href="/">
                conduit
            </a>
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        href={routes.home}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        href={routes.signIn}>
                        Sign in
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        href={routes.signUp}>
                        Sign up
                    </Link>
                </li>
            </ul>
        </div>
    )
}
