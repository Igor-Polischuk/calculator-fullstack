import { IError } from "@components/Calculator/interfaces/ICalculator";
import { findSubstringIndexes } from "@utilities/substring/findSubstringIndexes";
import { regexPatterns } from "../../regex"
import { Error } from "../error"
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";

export function pointValidator(expression: string): IError | undefined {
    const numberWithSeveralPoints = expression.match(regexPatterns.DOUBLE_POINTS_IN_NUMBER)
    console.log(numberWithSeveralPoints);
    
    if (numberWithSeveralPoints) return {
        message: Error.NumberPointError,
        errorPlace: getSubstringsIndexes(numberWithSeveralPoints, expression)
    }
}