import { Reg } from './../Reg';
import { Error } from "../error"

export function zeroDivisionValidator(expression: string){
    const zeroDivisionMatch = expression.match(Reg.ZeroDivision)
    if(zeroDivisionMatch) return {
        message: Error.ZeroDivisionError,
        where: zeroDivisionMatch?.index
    }
    return
}