import clsx from 'clsx'
import { useUnit } from 'effector-react'
import React from 'react'
import * as model from './model'

const Page: React.FC = () => {
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <ErrorList />

                        <form>
                            <fieldset>
                                <ArticleTitleInput />
                                <ArticleDescriptionInput />
                                <ArticleBodyTextarea />

                                <fieldset className="form-group">
                                    <ArticleTagListInput />
                                    <TagList />
                                </fieldset>
                                <PublishButton />
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ArticleTitleInput: React.FC = () => {
    const [value, setValue] = useUnit([model.$title, model.titleChanged])

    return (
        <fieldset className="form-group">
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Article Title"
                value={value}
                onInput={(e) => setValue(e.currentTarget.value)}
            />
        </fieldset>
    )
}

const ArticleDescriptionInput: React.FC = () => {
    const [value, setValue] = useUnit([
        model.$description,
        model.descriptionChanged,
    ])

    return (
        <fieldset className="form-group">
            <input
                type="text"
                className="form-control"
                placeholder="What's this article about?"
                value={value}
                onInput={(e) => setValue(e.currentTarget.value)}
            />
        </fieldset>
    )
}

const ArticleBodyTextarea: React.FC = () => {
    const [value, setValue] = useUnit([model.$body, model.bodyChanged])

    return (
        <fieldset className="form-group">
            <textarea
                className="form-control"
                rows={8}
                placeholder="Write your article (in markdown)"
                value={value}
                onInput={(e) => setValue(e.currentTarget.value)}></textarea>
        </fieldset>
    )
}

const ArticleTagListInput: React.FC = () => {
    const [value, setValue, add] = useUnit([
        model.$tagName,
        model.tagNameChanged,
        model.tagNameAdded,
    ])

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Enter tags"
            value={value}
            onInput={(e) => setValue(e.currentTarget.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    add(value)
                }
            }}
        />
    )
}

const TagList: React.FC = () => {
    const [tags, remove] = useUnit([model.$tags, model.tagNameRemoved])

    return (
        <div className="tag-list">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className={clsx('tag-default tag-pill', {
                        'tag-active': tag === 'react',
                    })}
                    onClick={() => remove(tag)}>
                    {tag}
                </span>
            ))}
        </div>
    )
}

const ErrorList: React.FC = () => {
    const [errors] = useUnit([model.$errors])

    if (!errors.length) {
        return null
    }

    return (
        <ul className="error-messages">
            {errors.map((error, index) => (
                <li key={index}>{error}</li>
            ))}
        </ul>
    )
}

const PublishButton: React.FC = () => {
    const [isLoading, update] = useUnit([
        model.$isLoading,
        model.updateButtonTriggered,
    ])

    return (
        <button
            className="btn btn-lg pull-xs-right btn-primary"
            type="button"
            onClick={update}>
            {isLoading ? 'Updating...' : 'Update Article'}
        </button>
    )
}

export default Page
