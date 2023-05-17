import { makeRequest } from "./makeRequest"
import { IRequestParams, IRestAPIParams } from './APITypes';

export class RestAPI<Endpoints> {
    readonly baseURL: string;
    private defaultHeaders: Record<string, string>;

    constructor(params: IRestAPIParams) {
        this.baseURL = params.baseURL;
        this.defaultHeaders = params.defaultHeaders;
    }

    protected async makeRequest<ResponseFormat>(params: IRequestParams<Endpoints>): Promise<ResponseFormat> {
        const url = `${this.baseURL}${params.endpoint}${params.queryParams?.toString() || ''}`
        const method = params.method
        const headers = { ...this.defaultHeaders, ...params?.headers }
        const body = params.method === 'POST' || params.method === 'PUT' ? JSON.stringify(params.body) : undefined

        const response = await makeRequest<ResponseFormat>(url, {
            method, headers, body
        })

        return response

    }
}
