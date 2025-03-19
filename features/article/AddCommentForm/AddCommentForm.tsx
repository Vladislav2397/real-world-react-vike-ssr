import React from 'react'
import { useUnit } from 'effector-react'
import { routes } from '@/shared/routing'
import { Link } from '@/shared/ui/Link'
import * as model from './model'
import { Article } from '@/shared/api/types'

export type AddCommentFormProps = {
    article: Pick<Article, 'slug'>
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ article }) => {
    const [isAuthorized, user] = useUnit([model.$isAuthorized, model.$user])

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
                <Textarea />
            </div>
            <div className="card-footer">
                <img
                    src={user.image ?? ''}
                    className="comment-author-img"
                />
                <AddCommentButton article={article} />
            </div>
        </form>
    )
}

const Textarea: React.FC = () => {
    const [value, setValue] = useUnit([model.$text, model.textChanged])

    return (
        <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            value={value}
            onInput={(e) => setValue(e.currentTarget.value)}></textarea>
    )
}

const AddCommentButton: React.FC<Pick<AddCommentFormProps, 'article'>> = ({
    article,
}) => {
    const [send] = useUnit([model.sendButtonTriggered])

    return (
        <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => send(article)}>
            Post Comment
        </button>
    )
}
