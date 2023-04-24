import { IError } from "exceptions/IErrors"
import { regexPatterns } from "../../regex"
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";
import { ValidationError } from "../validation-error"

export function operationsInRow(expression: string): IError | undefined {
    const actionsInRow = expression.match(regexPatterns.OPERATIONS_IN_ROW)

    if (actionsInRow) {
        return {
            message: ValidationError.OperationsInRowError,
            payload: {
                errorPlace: getSubstringsIndexes(actionsInRow, expression)
            }
        }
    }
}