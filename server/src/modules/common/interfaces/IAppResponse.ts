import { AppError } from "@utils/AppErrors/AppError"

export interface IAppResponse<T> {
    success: boolean
    status: number
    data: T | null
    error: AppError | null
}