import { ErrorType } from "common/AppError/error-type";
import { ErrorMessage } from "./output-components/ErrorMessage";
import { HighlightedValidationErrors } from "./output-components/HighlightedErrors";

export const errorComponentByType = {
    [ErrorType.RuntimeError]: ErrorMessage,
    [ErrorType.UnexpectedError]: ErrorMessage,
    [ErrorType.ValidationError]: HighlightedValidationErrors,
    [ErrorType.ServerError]: ErrorMessage
}
