
import { regexPatterns } from "../../regex"
import { Error } from "../error"

export function zeroDivisionValidator(expression: string){
    const zeroDivisionMatch = expression.match(regexPatterns.ZERO_DIVISION)
    if(zeroDivisionMatch) return {
        message: Error.ZeroDivisionError,
        meta: {
            errorIndex: zeroDivisionMatch?.index,
            description: `cannot ${zeroDivisionMatch[0]}`
        }
    }
    return
}