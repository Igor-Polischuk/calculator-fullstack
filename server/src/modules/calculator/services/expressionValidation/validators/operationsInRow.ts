import { regexPatterns } from "../../helpers/regex"
import { ValidationError } from "../validation-error"
import { getSubstringsIndexes } from "../../helpers/getSubstringsIndexes"
import { IExpressionValidationError } from "@utils/AppErrors/ExpressionValidationError"


export function operationsInRow(expression: string): IExpressionValidationError | undefined {
    const actionsInRow = expression.match(regexPatterns.OPERATIONS_IN_ROW)

    if (actionsInRow) {
        return {
            message: ValidationError.OperationsInRowError,
            errorPlace: getSubstringsIndexes(actionsInRow, expression)
        }
    }
}