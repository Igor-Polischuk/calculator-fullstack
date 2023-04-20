import { IError } from "exceptions/IErrors"
import { regexPatterns } from "../../regex"
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";
import { Error } from "../error"

export function operationsInRow(expression: string): IError | undefined {
    const actionsInRow = expression.match(regexPatterns.OPERATIONS_IN_ROW)

    if (actionsInRow) {
        return {
            message: Error.OperationsInRowError,
            payload: {
                errorPlace: getSubstringsIndexes(actionsInRow, expression)
            }
        }
    }
}