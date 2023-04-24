import { IAppError, IError } from "./IErrors";
import { ErrorType } from "./error-type";

interface IAppErrorProps {
    type?: ErrorType
    errors?: IError[]
    errorInstance?: any
}

export class AppError implements IAppError {
    type: ErrorType
    errors: IError[]

    private defaultMessage = 'Unexpected error while execution'
    constructor(params?: IAppErrorProps) {
        this.type = params?.errorInstance?.type || params?.type || ErrorType.UnexpectedError;
        this.errors = params?.errorInstance?.errors || params?.errors || [{ message: this.defaultMessage }];
    }
}