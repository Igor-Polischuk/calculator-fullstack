import { IValidationError } from "@components/Calculator/interfaces/ICalculator";
import { Error } from "../error";

export function bracketsOrderValidator(expression: string): IValidationError | undefined {
    let bracketCount = 0
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]

        if (char === "(") {
            bracketCount++
        } else if (char === ")") {

            if (bracketCount === 0) {
                return {
                    message: Error.ClosedBracketError,
                    errorPlace: [{ from: i, to: i }]
                }
            }
            bracketCount--
        }
    }

    if (bracketCount > 0) {
        const bracketIndex = expression.indexOf('(')
        return {
            message: Error.OpenBracketError,
            errorPlace: [{ from: bracketIndex, to: bracketIndex }]
        }
    }
}