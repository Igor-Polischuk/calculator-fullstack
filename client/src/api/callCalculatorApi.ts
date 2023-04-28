import { AppError } from "../errors/AppError"
import { QueryParams } from "../utilities/QueryParams/QueryParams"
import { ApiEndpoint } from "./api-endpoint"
import { makeRequest } from "./makeRequest"

interface IOption {
    endpoint: ApiEndpoint
    searchParams?: QueryParams
}

interface ICalculatorResponse<DataType> {
    success: boolean,
    status: number
    error: AppError
    data: DataType
}

export async function callCalculatorApi<DataType>(options: IOption): Promise<ICalculatorResponse<DataType>> {
    const base = 'http://192.168.0.136:3000/api/calculator/'
    const url = base + options.endpoint + (options.searchParams?.toString() || ''
    )
    const result = await makeRequest<ICalculatorResponse<DataType>>(url)

    if (result.error) {
        throw result.error
    }

    return result
}
