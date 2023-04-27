
import { IError } from "errors/IErrors"
import { regexPatterns } from "../../regex"
import { ValidationError } from "../validation-error"

export function zeroDivisionValidator(expression: string): IError | undefined {
    const zeroDivisionMatch = expression.match(regexPatterns.ZERO_DIVISION)

    if (zeroDivisionMatch) {
        return {
            message: ValidationError.ZeroDivisionError,
            payload: {
                errorPlace: [{ from: zeroDivisionMatch.index!, to: zeroDivisionMatch.index! }]
            }
        }
    }
}