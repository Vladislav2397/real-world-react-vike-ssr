import { useUnit } from 'effector-react'
import React from 'react'
import * as model from './model'

const Page: React.FC = () => {
    const [errors, resetErrors, signIn] = useUnit([
        model.$errors,
        model.errorReset,
        model.signInButtonTriggered,
    ])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(formData.entries())

        signIn(data as { email: string; password: string })
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="/register">Need an account?</a>
                        </p>

                        <ul className="error-messages">
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>

                        <form onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                                <input
                                    name="email"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                    onInput={resetErrors}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    name="password"
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    onInput={resetErrors}
                                />
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
