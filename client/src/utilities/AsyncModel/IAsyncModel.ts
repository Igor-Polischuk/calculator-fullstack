import { AppError } from "@common/AppError/AppError";
import { IEventMap, IObserver } from "@utilities/Observer/IObserver";

export type LoadingMap = Record<string, boolean>

export interface IBaseEvents {
    isLoading: boolean
    error: AppError | null
}

export interface IAsyncModel<Events extends IEventMap> extends IObserver<Events & IBaseEvents & Record<string, IBaseEvents>> {
    setError(error: AppError): void
    getLoadingHandledFunction<T extends (...args: any[]) => any>(apiFunction: T, loadingEvent: string): (...args: Parameters<T>) => Promise<ReturnType<T> | undefined>
    setLoadingState(loadingEvent: string, newState: IBaseEvents): void
    subscribeOnLoadingEvent(loadingEvent: string, callback: (loadingState: IBaseEvents) => void): void
}


export interface IAsyncModelParams {
    loading: boolean
}