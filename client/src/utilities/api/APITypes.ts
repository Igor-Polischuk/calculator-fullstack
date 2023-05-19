import { QueryParams } from "@utilities/QueryParams/QueryParams"

export type HTTPMethods = 'GET' | 'HEAD' | 'PUT' | 'POST' | 'DELETE' | 'CONNECT' | 'PATCH' | 'OPTIONS' | 'TRACE'

export interface IBaseRequestParams {
    method: HTTPMethods
    endpoint?: string
    queryParams?: QueryParams
    headers?: HeadersInit
}

export type RequestWithBody = IBaseRequestParams & { method: 'PUT' | 'POST'; body: unknown };

export type RequestWithoutBody = IBaseRequestParams & { method: Exclude<HTTPMethods, 'PUT' | 'POST'> };

export type IRequestParams = RequestWithBody | RequestWithoutBody;

export interface IRestAPIParams {
    baseURL: string
    defaultHeaders: Record<string, string>;
}