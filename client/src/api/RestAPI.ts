import { makeRequest } from "./makeRequest"

interface IRestApiParams {
    baseURL: string
}

interface IGetParams<Endpoints> {
    endpoint: Endpoints
}

interface IPostParams<Endpoints> {
    endpoint: Endpoints
    body: string
}

export class RestAPI<Endpoints>{
    private baseURL: string

    constructor(params: IRestApiParams) {
        this.baseURL = params.baseURL
    }

    async get<ResponseFormat>(params: IGetParams<Endpoints>): Promise<ResponseFormat> {
        const url = `${this.baseURL}${params.endpoint}`
        const response = await makeRequest<ResponseFormat>(url)

        return response
    }

    async post<ResponseFormat>(params: IPostParams<Endpoints>): Promise<ResponseFormat> {
        const url = `${this.baseURL}${params.endpoint}`
        const response = await makeRequest<ResponseFormat>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: params.body
        })

        return response
    }
}

/**
 * const makeRequest = new Request<endpoints>({
 *  baseURL: 'http://localhost:3000/api/calculator/',
 * })
 * 
 * makeRequest.get({
 *  endpoint: '/history',
 *  query: {
 *  limit: 5
 * }
 * })
 * 
 * makeRequest.get({
 *  endpoint: '/operations',
 *  
 * })
 * 
 * makeRequest.post({
 *  endpoint: 'calculate',
 *  body: 
 * })
 */
