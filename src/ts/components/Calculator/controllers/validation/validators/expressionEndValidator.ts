import { IError } from "exceptions/IErrors";
import { Error } from "../error"
import { regexPatterns } from "../../regex";

export function expressionEndValidator(expression: string): IError | undefined {
    const isCorrectEnd = regexPatterns.EXPRESSION_END.test(expression)

    if (!isCorrectEnd) {
        return {
            message: Error.LineEndError,
            payload: {
                errorPlace: [{ from: expression.length - 1, to: expression.length - 1 }]
            }
        }
    }
}