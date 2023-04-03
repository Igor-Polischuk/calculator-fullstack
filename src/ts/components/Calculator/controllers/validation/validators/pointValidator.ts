import { IError } from "@components/Calculator/interfaces/ICalculator";
import { findSubstringIndexes } from "@utilities/substring/findSubstringIndexes";
import { regexPatterns } from "../../regex"
import { Error } from "../error"

export function pointValidator(expression: string): IError | undefined {
    const numberWithSeveralPoints = expression.match(regexPatterns.DOUBLE_POINTS_IN_NUMBER)
    
    if (numberWithSeveralPoints) return {
        message: Error.NumberPointError,
        errorPlace: findSubstringIndexes(expression, numberWithSeveralPoints[0])
    }
}