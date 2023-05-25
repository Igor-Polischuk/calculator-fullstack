import { AppError } from "@utils/AppErrors/AppError"

interface IResponseFormatterParams {
    status?: number
    data?: Record<string, any>
    error?: AppError
}

export class ResponseFormatter {
    private success: boolean
    private status: number
    private data: Record<string, any> | null
    private error: AppError | null

    constructor(params: IResponseFormatterParams) {
        this.success = params.data ? true : false
        this.status = params.status || params.error?.status || (params.data ? 200 : 500)
        this.data = params.data || null
        this.error = params.error || null
    }

    json(): string {
        return JSON.stringify(this)
    }
}