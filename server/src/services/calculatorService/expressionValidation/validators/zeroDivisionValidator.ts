import { regexPatterns } from "../../helpers/regex"
import { ValidationError } from "../validation-error"
import { IExpressionValidationError } from "../ExpressionValidationError"


export function zeroDivisionValidator(expression: string): IExpressionValidationError | undefined {
    const zeroDivisionMatch = expression.match(regexPatterns.ZERO_DIVISION)

    if (zeroDivisionMatch) {
        return {
            message: ValidationError.ZeroDivisionError,
            errorPlace: [{ from: zeroDivisionMatch.index!, to: zeroDivisionMatch.index! }]
        }
    }
}