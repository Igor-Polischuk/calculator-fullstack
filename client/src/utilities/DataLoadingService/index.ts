import { AppError } from "common/AppError/AppError";
import { IDataLoadingServiceParams, ISetAsyncDataParams } from "./IDataLoadingService";

export class DataLoadingService {
    private loadingStateFunction
    private changeErrorStateFunction
    private defaultLoadingEvent
    constructor(params: IDataLoadingServiceParams) {
        this.loadingStateFunction = params.loadingStateFunction
        this.changeErrorStateFunction = params.changeErrorStateFunction
        this.defaultLoadingEvent = params.defaultLoadingEvent
    }

    async setAsyncData(params: ISetAsyncDataParams): Promise<void> {
        const loadingEvent = params.loadingEvent || this.defaultLoadingEvent

        this.loadingStateFunction({
            loading: true,
            loadingEvent
        })

        for (const callback of params.callbacks) {
            try {
                await callback();
            } catch (error: any) {
                const appError = AppError.getErrorFrom(error)
                this.changeErrorStateFunction(appError as AppError)
            }
        }
        this.loadingStateFunction({
            loading: false,
            loadingEvent
        })
    }
}