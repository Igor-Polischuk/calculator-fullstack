import { ErrorType } from "exceptions/error-type";
import { ErrorMessage } from "./output-components/ErrorMessage";
import { HighlightedErrors } from "./output-components/HighlightedErrors";
import { DefaultErrorComponent } from "./output-components/DefaultErrorComponent";

export const errorComponentByType = {
    [ErrorType.RuntimeError]: ErrorMessage,
    [ErrorType.UnexpectedError]: ErrorMessage,
    [ErrorType.ValidationError]: HighlightedErrors,
    defaultComponent: DefaultErrorComponent
}
