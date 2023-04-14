import { IValidationError } from "@components/Calculator/interfaces/ICalculator"
import { regexPatterns } from "../../regex"
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";
import { Error } from "../error"

export function operationsInRow(expression: string): IValidationError | undefined {
    const actionsInRow = expression.match(regexPatterns.OPERATIONS_IN_ROW)
    console.log(actionsInRow);

    if (actionsInRow) {
        return {
            message: Error.OperationsInRowError,
            errorPlace: getSubstringsIndexes(actionsInRow, expression)
        }
    }
}