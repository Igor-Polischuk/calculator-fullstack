import { HTTPMethods } from "./APITypes"

interface IOptions {
    method?: HTTPMethods
    headers?: HeadersInit
    body?: string
}

export async function makeRequest(url: string, options?: IOptions): Promise<unknown> {
    const response = await fetch(url, options)

    if (response.status >= 500) {
        throw new Error('Server error')
    }

    return response.json()
}
