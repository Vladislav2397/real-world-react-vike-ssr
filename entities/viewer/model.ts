import { getCurrentUserQuery, type User } from '@/shared/api/queries/user'
import { combine } from 'effector'

export const $user = combine(getCurrentUserQuery.$data, (data) => {
    return (data?.user ?? null) as unknown as User
})
