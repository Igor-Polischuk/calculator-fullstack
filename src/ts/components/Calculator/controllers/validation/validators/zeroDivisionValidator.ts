
import { IError } from "@components/Calculator/interfaces/ICalculator"
import { regexPatterns } from "../../regex"
import { Error } from "../error"

export function zeroDivisionValidator(expression: string): IError | undefined{
    const zeroDivisionMatch = expression.match(regexPatterns.ZERO_DIVISION)
    if(zeroDivisionMatch) return {
        message: Error.ZeroDivisionError,
        errorRange: [[zeroDivisionMatch.index!, zeroDivisionMatch.index!]]
    }
    return
}