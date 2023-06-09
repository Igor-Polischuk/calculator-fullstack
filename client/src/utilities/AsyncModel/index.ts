import { IEventMap } from "@utilities/Observer/IObserver";
import { AppError } from "@common/AppError/AppError";
import { Observer } from "@utilities/Observer";
import { logger } from "@common/Logger/Logger";

import { IAsyncModel, IBaseEvents } from "./IAsyncModel";

export class AsyncModel<Events extends IEventMap> extends Observer<Events & IBaseEvents & Record<string, IBaseEvents>> implements IAsyncModel<Events & IBaseEvents>{
    protected error: AppError | null = null

    protected loadingComponents: Record<string, IBaseEvents> = {}

    constructor(loadingEvents: string[]) {
        super();

        loadingEvents.forEach(loadingEventName => {
            this.loadingComponents[loadingEventName] = {
                error: null,
                isLoading: false
            }
        })
    }

    subscribeOnLoadingEvent(loadingEvent: string, callback: (loadingState: IBaseEvents) => void): void {
        this.subscribe(loadingEvent, () => callback(this.loadingComponents[loadingEvent]))
    }

    setLoadingState(loadingEvent: string, newState: IBaseEvents): void {
        this.loadingComponents[loadingEvent] = newState

        this.notifyAll(loadingEvent, newState as Events[string])
    }

    setError(error: AppError): void {
        this.error = error
        this.notifyAll('error', error as Events['loading'])
    }

    getLoadingHandledFunction<T extends (...args: any[]) => any>(apiFunction: T, loadingEvent: string)
        : (...args: Parameters<T>) => Promise<ReturnType<T> | undefined> {
        return async (...args: Parameters<T>) => {
            try {
                this.setLoadingState(loadingEvent, { error: null, isLoading: true })
                const result = await apiFunction(...args)

                return result as ReturnType<T>

            } catch (err) {
                logger.log('warn', `Catched error in loading handled function: ${apiFunction.name}`, err)

                const error = AppError.getErrorFrom(err)
                this.setLoadingState(loadingEvent, { error, isLoading: false })

            } finally {
                const error = this.loadingComponents[loadingEvent].error
                this.setLoadingState(loadingEvent, { error, isLoading: false })
            }
        }
    }
}
