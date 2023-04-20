import { IError } from "exceptions/IErrors";
import { Error } from "../error";

export function bracketsOrderValidator(expression: string): IError | undefined {
    let bracketCount = 0
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]

        if (char === "(") {
            bracketCount++
        } else if (char === ")") {

            if (bracketCount === 0) {
                return {
                    message: Error.ClosedBracketError,
                    payload: {
                        errorPlace: [{ from: i, to: i }]
                    }
                }
            }
            bracketCount--
        }
    }

    if (bracketCount > 0) {
        const bracketIndex = expression.indexOf('(')
        return {
            message: Error.OpenBracketError,
            payload: {
                errorPlace: [{ from: bracketIndex, to: bracketIndex }]
            }
        }
    }
}