import React from 'react'
import { Link } from '@/shared/ui/Link'
import { routes } from '@/shared/routing'
import * as sessionModel from '@/shared/lib/session-model'
import { useUnit } from 'effector-react'

const userRoutes: Item[] = [
    {
        route: routes.home,
        kind: 'default',
        text: 'Home',
    },
    {
        route: routes.createArticle,
        kind: 'with-icon',
        iconClass: 'ion-compose',
        text: 'New Article',
    },
    {
        route: routes.settings,
        kind: 'with-icon',
        iconClass: 'ion-gear-a',
        text: 'Settings',
    },
    {
        route: routes.profile,
        kind: 'with-image',
        src: '',
        text: 'Eric Simons',
    },
]

const guestRoutes: Item[] = [
    {
        route: routes.home,
        kind: 'default',
        text: 'Home',
    },
    {
        route: routes.signIn,
        kind: 'default',
        text: 'Sign in',
    },
    {
        route: routes.signUp,
        kind: 'default',
        text: 'Sign up',
    },
]

export const TheHeader: React.FC = () => {
    const [isAuthorized] = useUnit([sessionModel.$isAuthorized])

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link
                    className="navbar-brand"
                    href="/">
                    conduit
                </Link>
                <List list={isAuthorized ? userRoutes : guestRoutes} />
            </div>
        </nav>
    )
}

type Item =
    | {
          route: string
          text: string
          kind: 'default'
      }
    | {
          route: string
          text: string
          kind: 'with-icon'
          iconClass: string
      }
    | {
          route: string
          text: string
          kind: 'with-image'
          src?: string
      }

type ListProps = { list: Item[] }

const List: React.FC<ListProps> = ({ list }) => {
    return (
        <ul className="nav navbar-nav pull-xs-right">
            {list.map((item) => (
                <li
                    className="nav-item"
                    key={item.text}>
                    <Link
                        href={item.route}
                        className="nav-link">
                        {item.kind === 'with-icon' && (
                            <>
                                <i className={item.iconClass}></i>&nbsp;
                            </>
                        )}
                        {item.kind === 'with-image' && (
                            <>
                                <img
                                    src={item.src}
                                    className="user-pic"
                                />
                                &nbsp;
                            </>
                        )}
                        {item.text}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
