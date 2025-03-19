/// <reference types="vite/client" />
import type { Scope } from 'effector'

declare global {
    interface Window {
        __VIKE_EFX_SCOPE?: Scope
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv
    }
}

interface ImportMetaEnv {
    readonly PUBLIC_ENV__APP_TITLE: string
    readonly PUBLIC_ENV__API_HOST: string
    // more env variables...
}

export {}
