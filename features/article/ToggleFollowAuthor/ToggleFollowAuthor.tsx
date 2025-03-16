import React from 'react'
import { Author } from '@/shared/api/types'
import { useUnit } from 'effector-react'
import * as model from './model'

export type ToggleFollowAuthorProps = {
    author: Author
}

export const ToggleFollowAuthor: React.FC<ToggleFollowAuthorProps> = ({
    author,
}) => {
    const [toggle] = useUnit([model.toggleFollowAuthorTriggered])

    return (
        <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => toggle(author)}>
            <i className="ion-plus-round"></i>
            &nbsp; {author.following ? 'Unfollow' : 'Follow'} {author.username}{' '}
            {/* <span className="counter">(10)</span> */}
        </button>
    )
}
