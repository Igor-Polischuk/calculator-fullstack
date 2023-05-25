import { AppError } from "common/AppError/AppError"

export interface IDataLoadingServiceParams {
    defaultLoadingEvent: string
    loadingStateFunction: (params: { loading: boolean, loadingEvent: string }) => void
    changeErrorStateFunction: (err: AppError) => void
}

export interface ISetAsyncDataParams {
    callbacks: (() => Promise<void>)[]
    loadingEvent?: string
}