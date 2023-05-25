import { ValidationError } from "../validation-error"
import { regexPatterns } from "../../helpers/regex"
import { getSubstringsIndexes } from "../../helpers/getSubstringsIndexes/getSubstringsIndexes"
import { IExpressionValidationError } from "../ExpressionValidationError"


export function pointValidator(expression: string): IExpressionValidationError | undefined
    | undefined {
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]
        if (char === '.' && (isNaN(+expression[i - 1]) || isNaN(+expression[i + 1]))) {
            return {
                message: ValidationError.PointError,
                errorPlace: [{ from: i, to: i }]
            }
        }
    }

    const numberWithSeveralPoints = expression.match(regexPatterns.DOUBLE_POINTS_IN_NUMBER)

    if (numberWithSeveralPoints) {
        return {
            message: ValidationError.NumberPointError,
            errorPlace: getSubstringsIndexes(numberWithSeveralPoints, expression)
        }
    }
}