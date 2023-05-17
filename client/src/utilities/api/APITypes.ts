import { QueryParams } from "@utilities/QueryParams/QueryParams"

export type HTTPMethods = 'GET' | 'HEAD' | 'PUT' | 'POST' | 'DELETE' | 'CONNECT' | 'PATCH' | 'OPTIONS' | 'TRACE'

export interface IBaseRequestParams<Endpoints> {
    method: HTTPMethods
    endpoint?: Endpoints
    queryParams?: QueryParams
    headers?: HeadersInit
}

export type RequestWithBody<Endpoints> = IBaseRequestParams<Endpoints> & { method: 'PUT' | 'POST'; body: unknown };

export type RequestWithoutBody<Endpoints> = IBaseRequestParams<Endpoints> & { method: Exclude<HTTPMethods, 'PUT' | 'POST'> };

export type IRequestParams<Endpoints> = RequestWithBody<Endpoints> | RequestWithoutBody<Endpoints>;

export interface IRestAPIParams {
    baseURL: string
    defaultHeaders: Record<string, string>;
}