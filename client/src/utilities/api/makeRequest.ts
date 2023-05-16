interface IOptions {
    method?: 'GET' | 'HEAD' | 'PUT' | 'POST' | 'DELETE' | 'CONNECT' | 'PATCH' | 'OPTIONS' | 'TRACE'
    headers?: HeadersInit
    body?: string
}

export async function makeRequest<T>(url: string, options?: IOptions): Promise<T> {
    const response = await fetch(url, options)
    return await response.json().catch((e) => { console.log(e) })
}
