import { Reg } from '../validation_reg-exp';
import { Error } from "../error"

export function pointValidate(expression: string) {
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i]
        if (char === '.' && (isNaN(+expression[i - 1]) || isNaN(+expression[i + 1]))) {
            return {
                message: Error.PointError,
                meta: {
                    errorIndex: i,
                    description: `a point can not be in this place ${expression[i - 1]}${expression[i]}${expression[i + 1]}}`
                }
            }
        }
    }
    const numberWithSeveralPoints = expression.match(Reg.DoublePointInNumber)
    if (numberWithSeveralPoints) return {
        message: Error.NumberPointError,
        meta: {
            errorIndex: numberWithSeveralPoints.index,
            description: `number cannot includes several points ${numberWithSeveralPoints[0]}`
        }
    }
}