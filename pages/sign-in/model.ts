import {
    signInMutation,
    signInResponseFailureContract,
} from '@/shared/api/queries/auth'
import { isHttpError } from '@farfetched/core'
import { createEffect, createEvent, createStore, sample } from 'effector'
import * as sessionModel from '@/shared/lib/session-model'
import { navigate } from 'vike/client/router'
import { routes } from '@/shared/routing'
import { combineEvents } from 'patronum'

const navigateFx = createEffect(navigate)

export const signInButtonTriggered = createEvent<{
    email: string
    password: string
}>()
export const errorReset = createEvent()

export const $errors = createStore<string[]>([]).reset(errorReset)

sample({
    clock: signInButtonTriggered,
    fn: (user) => ({ user }),
    target: signInMutation.start,
})
sample({
    clock: signInMutation.finished.success,
    fn: (data) => data.result.user.token,
    target: sessionModel.tokenReceived,
})
sample({
    clock: combineEvents([
        signInMutation.finished.success,
        sessionModel.tokenReceived,
    ]),
    fn: () => routes.home,
    target: navigateFx,
})
sample({
    clock: signInMutation.finished.failure,
    fn: (result) => {
        console.log('failure', result)
        if (!isHttpError(result)) return ['Unexpected error']

        const response = result.error.response

        if (!signInResponseFailureContract.isData(response)) {
            return ['Invalid response contract']
        }

        const errors: string[] = []

        Object.values(response.errors).forEach((itemOrArr) => {
            if (!itemOrArr) {
                return
            }
            if (Array.isArray(itemOrArr)) {
                return errors.push(...itemOrArr)
            }
            return errors.push(itemOrArr)
        })

        return errors
    },
    target: $errors,
})
