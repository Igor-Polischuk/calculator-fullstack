import { Reg } from '../validation_reg-exp';
import { Error } from "../error"

export function zeroDivisionValidator(expression: string){
    const zeroDivisionMatch = expression.match(Reg.ZeroDivision)
    if(zeroDivisionMatch) return {
        message: Error.ZeroDivisionError,
        meta: {
            errorIndex: zeroDivisionMatch?.index,
            description: `cannot ${zeroDivisionMatch[0]}`
        }
    }
    return
}