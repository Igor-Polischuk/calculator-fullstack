import { IExpressionValidationError } from "../ExpressionValidationError"
import { ValidationError } from "../validation-error"


export function bracketsOrderValidator(expression: string): IExpressionValidationError | undefined {
    let bracketCount = 0
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]

        if (char === "(") {
            bracketCount++
        } else if (char === ")") {

            if (bracketCount === 0) {
                return {
                    message: ValidationError.ClosedBracketError,
                    errorPlace: [{ from: i, to: i }]
                }
            }
            bracketCount--
        }
    }

    if (bracketCount > 0) {
        const bracketIndex = expression.indexOf('(')
        return {
            message: ValidationError.OpenBracketError,
            errorPlace: [{ from: bracketIndex, to: bracketIndex }]
        }
    }
}