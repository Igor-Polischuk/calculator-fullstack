import { ValidationError } from "../validation-error"
import { getSubstringsIndexes } from "../../helpers/getSubstringsIndexes"
import { incorrectFunctionNameValidator } from "./incorrectFunctionNameValidator"
import { searchAllowedOperationsRegStr } from "../../calculator-config"
import { IExpressionValidationError } from "@utils/AppErrors/ExpressionValidationError"

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