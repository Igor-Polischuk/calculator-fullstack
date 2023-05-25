import { ValidationError } from "../validation-error"
import { getSubstringsIndexes } from "../../helpers/getSubstringsIndexes/getSubstringsIndexes"
import { incorrectFunctionNameValidator } from "./incorrectFunctionNameValidator"
import { IExpressionValidationError } from "../ExpressionValidationError"
import { searchAllowedOperationsRegStr } from "../../expressionCalculation/calculator-config"

export function unknownSymbolValidator(expression: string): IExpressionValidationError | undefined {
    const unknownSymbolReg = new RegExp(`[^0-9${searchAllowedOperationsRegStr}().]`, "g")
    const unknownSymbols = expression.match(unknownSymbolReg)

    if (unknownSymbols) {
        return {
            message: ValidationError.UnknownSymbolError,
            errorPlace: getSubstringsIndexes(unknownSymbols, expression)
        }
    }
    return incorrectFunctionNameValidator(expression)
}