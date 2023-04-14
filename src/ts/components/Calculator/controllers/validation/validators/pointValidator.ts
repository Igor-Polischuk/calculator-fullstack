import { IValidationError } from "@components/Calculator/interfaces/ICalculator";
import { regexPatterns } from "../../regex"
import { Error } from "../error"
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";

export function pointValidator(expression: string): IValidationError | undefined {
    const numberWithSeveralPoints = expression.match(regexPatterns.DOUBLE_POINTS_IN_NUMBER)

    if (numberWithSeveralPoints) {
        return {
            message: Error.NumberPointError,
            errorPlace: getSubstringsIndexes(numberWithSeveralPoints, expression)
        }
    }
}