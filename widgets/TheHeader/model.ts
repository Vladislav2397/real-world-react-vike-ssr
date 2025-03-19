import { viewerModel } from '@/entities/viewer'
import { sessionModel } from '@/shared/lib/session-model'

export const $user = viewerModel.$user
export const $isAuthorized = sessionModel.$isAuthorized
