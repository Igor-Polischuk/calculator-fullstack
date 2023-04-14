
import { IValidationError } from "@components/Calculator/interfaces/ICalculator"
import { regexPatterns } from "../../regex"
import { Error } from "../error"

export function zeroDivisionValidator(expression: string): IValidationError | undefined {
    const zeroDivisionMatch = expression.match(regexPatterns.ZERO_DIVISION)

    if (zeroDivisionMatch) {
        return {
            message: Error.ZeroDivisionError,
            errorPlace: [{ from: zeroDivisionMatch.index!, to: zeroDivisionMatch.index! }]
        }
    }
}