import { QueryParams } from '@utilities/QueryParams/QueryParams';
import { Cache } from '@utilities/Cache/Cache';
import { makeRequest } from "./makeRequest"

interface IRequestParams<Endpoints> {
    endpoint?: Endpoints
    queryParams?: QueryParams
    requestOptions?: {
        method?: 'GET' | 'HEAD' | 'PUT' | 'POST' | 'DELETE' | 'CONNECT' | 'PATCH' | 'OPTIONS' | 'TRACE'
        headers?: HeadersInit
        body?: unknown
    }
}

interface IRestAPIParams {
    baseURL: string
    defaultHeaders: Record<string, string>;
}

export class RestAPI<Endpoints> {
    readonly baseURL: string;
    private defaultHeaders: Record<string, string>;

    constructor(params: IRestAPIParams) {
        this.baseURL = params.baseURL;
        this.defaultHeaders = params.defaultHeaders;
    }

    protected async makeRequest<ResponseFormat>(params: IRequestParams<Endpoints>): Promise<ResponseFormat> {
        const url = `${this.baseURL}${params.endpoint}${params.queryParams?.toString() || ''}`
        const method = params.requestOptions?.method || 'GET'
        const headers = { ...this.defaultHeaders, ...params.requestOptions?.headers }
        const body = JSON.stringify(params.requestOptions?.body)

        const response = await makeRequest<ResponseFormat>(url, {
            method, headers, body
        })

        return response

    }
}
