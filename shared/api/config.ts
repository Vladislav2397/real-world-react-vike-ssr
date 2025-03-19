export function baseURL(path: string) {
    return `${import.meta.env.PUBLIC_ENV__API_HOST}/api${path}`
}
