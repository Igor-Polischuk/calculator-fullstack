import { ErrorType } from "exceptions/error-type";
import { ErrorMessage } from "./output-components/ErrorMessage";
import { HighlightedValidationErrors } from "./output-components/HighlightedErrors";
import { DefaultErrorComponent } from "./output-components/DefaultErrorComponent";

export const errorComponentByType = {
    [ErrorType.RuntimeError]: ErrorMessage,
    [ErrorType.UnexpectedError]: ErrorMessage,
    [ErrorType.ValidationError]: HighlightedValidationErrors,
    defaultComponent: DefaultErrorComponent
}
