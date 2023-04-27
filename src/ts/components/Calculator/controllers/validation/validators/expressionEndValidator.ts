import { IError } from "errors/IErrors";
import { ValidationError } from "../validation-error"
import { regexPatterns } from "../../regex";

export function expressionEndValidator(expression: string): IError | undefined {
    const isCorrectEnd = regexPatterns.EXPRESSION_END.test(expression)

    if (!isCorrectEnd) {
        return {
            message: ValidationError.LineEndError,
            payload: {
                errorPlace: [{ from: expression.length - 1, to: expression.length - 1 }]
            }
        }
    }
}