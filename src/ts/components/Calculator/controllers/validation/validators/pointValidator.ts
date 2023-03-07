import { Reg } from './../Reg';
import { Error } from "../error"

export function pointValidate(expression: string) {
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]
        if (char === '.' && (isNaN(+expression[i - 1]) || isNaN(+expression[i + 1]))) {
            return {
                message: Error.PointError,
                where: i
            }
        }
    }
    const numberWithSeveralPoints = expression.match(Reg.DoublePointInNumber)
    if (numberWithSeveralPoints) return {
        message: Error.NumberPointError,
        where: numberWithSeveralPoints.index
    }
}