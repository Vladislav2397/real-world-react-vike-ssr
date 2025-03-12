import React from 'react'

export const TheHeader: React.FC = () => {
    return <Unauthenticated />
}

const Authenticated: React.FC = () => {
    return (
        <nav className="navbar navbar-light">
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
                            <i className="ion-compose"></i>&nbsp;New
                            Article{' '}
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
        </nav>
    )
}

const Unauthenticated: React.FC = () => {
    return (
        <nav className="navbar navbar-light">
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
                            href="/login">
                            Sign in
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            href="/register">
                            Sign up
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
