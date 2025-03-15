import {
    getArticlesResponseContract,
    getTagsResponseContract,
} from '@/shared/api/queries/articles'
import axios from 'axios'

export const data = async () => {
    const dataResponse = (
        await axios.get(`http://localhost:4100/api/articles?limit=12&offset=0`)
    ).data

    const tagsResponse = (await axios.get(`http://localhost:4100/api/tags`))
        .data

    if (!getArticlesResponseContract.isData(dataResponse)) {
        throw new Error('Invalid data')
    }
    if (!getTagsResponseContract.isData(tagsResponse)) {
        throw new Error('Invalid data')
    }

    return { ...dataResponse, ...tagsResponse }
}

export type Data = Awaited<ReturnType<typeof data>>
