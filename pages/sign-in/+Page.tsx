import { useUnit } from 'effector-react'
import React from 'react'
import * as model from './model'

const Page: React.FC = () => {
    const [signIn] = useUnit([model.signInMutation.start])

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const data = Object.fromEntries(
            formData.entries()
        ) as unknown as model.SignUpDto['user']

        signIn({ user: data })
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
                            <li>That email is already taken</li>
                        </ul>

                        <form onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                                <input
                                    name="email"
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    name="password"
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
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
