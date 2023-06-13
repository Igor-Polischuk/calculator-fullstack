import { AppError } from "@common/AppError/AppError"
import { logger } from "@common/Logger/Logger"

interface ILoadingRequestHandler {
    loadingSetter: (loading: boolean) => void
    errorHandler: (error: AppError) => void
}

export class LoadingRequestHandler {
    private loadingSetter
    private errorHandler

    constructor(params: ILoadingRequestHandler) {
        this.loadingSetter = params.loadingSetter
        this.errorHandler = params.errorHandler
    }

    getLoadingHandledFunction<T extends (...args: any[]) => any>(apiFunction: T) {
        return async (...args: Parameters<T>) => {
            try {
                this.loadingSetter(true)
                const result = await apiFunction(...args)

                return result as ReturnType<T>

            } catch (err) {
                logger.addLog('warn', `Catched error in calculator controller: ${apiFunction.name}`, err)

                const error = AppError.getErrorFrom(err)
                this.errorHandler(error)

            } finally {
                this.loadingSetter(false)
            }
        }
    }
}