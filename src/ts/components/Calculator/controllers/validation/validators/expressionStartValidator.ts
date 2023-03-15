import { Reg } from './../Reg';
import { Error } from "../error";

export function expressionStartValidator(expression: string) {
    const correctStart = expression.match(Reg.CorrectLineStart)
    if (!correctStart) return {
        message: Error.LineStartError,
        meta: {
            errorIndex: 0,
            description: `an expression cannot start with ${expression[0]}`
        }
    }
}