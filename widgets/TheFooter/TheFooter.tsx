import { Link } from '@/shared/ui/Link'
import React from 'react'

export type TheFooterProps = {}

export const TheFooter: React.FC<TheFooterProps> = () => {
    return (
        <footer>
            <div className="container">
                <Link
                    href="/"
                    className="logo-font">
                    conduit
                </Link>
                <span className="attribution">
                    An interactive learning project from{' '}
                    <a href="https://thinkster.io">Thinkster</a>. Code &amp;
                    design licensed under MIT.
                </span>
            </div>
        </footer>
    )
}
