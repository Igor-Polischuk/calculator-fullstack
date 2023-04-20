import { IError } from "exceptions/IErrors";
import { Error } from "../error"
import { regexPatterns } from "../../regex";

export function expressionStartValidator(expression: string): IError | undefined {
    const isCorrectStart = regexPatterns.EXPRESSION_START.test(expression)

    if (!isCorrectStart) {
        return {
            message: Error.LineStartError,
            payload: {
                errorPlace: [{ from: 0, to: 0 }]
            }
        }
    }
}