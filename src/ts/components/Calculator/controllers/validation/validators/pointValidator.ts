import { regexPatterns } from "../../regex"
import { Error } from "../error"

export function pointValidator(expression: string) {
    const numberWithSeveralPoints = expression.match(regexPatterns.DOUBLE_POINTS_IN_NUMBER)
    console.log(numberWithSeveralPoints);
    
    if (numberWithSeveralPoints) return {
        message: Error.NumberPointError,
        meta: {
            invalidExpressionPart: [numberWithSeveralPoints[0]]
        }
    }
}