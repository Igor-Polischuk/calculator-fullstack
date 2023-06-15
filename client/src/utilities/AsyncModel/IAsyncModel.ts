import { AppError } from "@common/AppError/AppError";
import { IEventMap, IObserver } from "@utilities/Observer/IObserver";

export type LoadingMap = Record<string, boolean>

export interface IBaseEvents {
    loading: boolean
    error: AppError
}

export interface IAsyncModel<Events extends IEventMap> extends IObserver<Events & IBaseEvents> {
    setLoading(loading: boolean): void
    setError(error: AppError): void
    getLoadingHandledFunction<T extends (...args: any[]) => any>(apiFunction: T): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined>
}


export interface IAsyncModelParams {
    loading: boolean
}