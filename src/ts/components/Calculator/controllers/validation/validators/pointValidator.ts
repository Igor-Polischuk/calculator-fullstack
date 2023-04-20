import { IError } from "exceptions/IErrors";
import { regexPatterns } from "../../regex"
import { Error } from "../error"
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";

export function pointValidator(expression: string): IError | undefined {
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]
        if (char === '.' && (isNaN(+expression[i - 1]) || isNaN(+expression[i + 1]))) {
            return {
                message: Error.PointError,
                payload: {
                    errorPlace: [{ from: i, to: i }]
                }
            }
        }
    }

    const numberWithSeveralPoints = expression.match(regexPatterns.DOUBLE_POINTS_IN_NUMBER)

    if (numberWithSeveralPoints) {
        return {
            message: Error.NumberPointError,
            payload: {
                errorPlace: getSubstringsIndexes(numberWithSeveralPoints, expression)
            }
        }
    }
}