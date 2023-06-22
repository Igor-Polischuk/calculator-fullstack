import { IEventMap } from "@utilities/Observer/IObserver";
import { AppError } from "@common/AppError/AppError";
import { Observer } from "@utilities/Observer";
import { logger } from "@common/Logger/Logger";

import { IAsyncModel, IBaseEvents } from "./IAsyncModel";

export class AsyncModel<Events extends IEventMap> extends Observer<Events & IBaseEvents & Record<string, IBaseEvents>> implements IAsyncModel<Events & IBaseEvents>{
    protected loading: boolean = false;
    protected error: AppError | null = null

    protected loadingMap: Record<string, IBaseEvents> = {}

    constructor(loadingEvents: string[]) {
        super();

        loadingEvents.forEach(loadingEventName => {
            this.loadingMap[loadingEventName] = {
                error: null,
                loading: false
            }
        })
    }

    subscribeOnLoadingEvent(loadingEvent: string, callback: (loadingState: IBaseEvents) => void): void {
        this.subscribe(loadingEvent, () => callback(this.loadingMap[loadingEvent]))
    }

    setLoadingEvent(loadingEvent: string, newState: IBaseEvents): void {
        this.loadingMap[loadingEvent] = newState

        this.notifyAll(loadingEvent, newState as Events[string])
    }

    setLoading(loading: boolean): void {
        this.loading = loading
        this.notifyAll('loading', loading as Events['loading'])
    }

    setError(error: AppError): void {
        this.error = error
        this.notifyAll('error', error as Events['loading'])
    }

    getLoadingHandledFunction<T extends (...args: any[]) => any>(apiFunction: T, loadingEvent: string)
        : (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
        return async (...args: Parameters<T>) => {
            try {
                this.setLoadingEvent(loadingEvent, { error: null, loading: true })
                const result = await apiFunction(...args)

                return result as ReturnType<T>

            } catch (err) {
                logger.log('warn', `Catched error in loading handled function: ${apiFunction.name}`, err)

                const error = AppError.getErrorFrom(err)
                this.setError(error)

            } finally {
                this.setLoadingEvent(loadingEvent, { error: null, loading: false })
            }
        }
    }
}
