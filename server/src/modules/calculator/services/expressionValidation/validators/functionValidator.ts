import { IExpressionValidationError } from "@utils/AppErrors/ExpressionValidationError"
import { functionReg } from "../../calculator-config"
import { getSubstringsIndexes } from "../../helpers/getSubstringsIndexes"
import { ValidationError } from "../validation-error"


export function functionValidator(expression: string): IExpressionValidationError | undefined {
    const incorrectFunctionReg = new RegExp(`(${functionReg})(?![\\d(])`, 'g')
    const incorrectFunctions = expression.match(incorrectFunctionReg)

    if (incorrectFunctions) {
        return {
            message: ValidationError.IncorrectFunctionArgumentError,
            errorPlace: getSubstringsIndexes(incorrectFunctions, expression)
        }
    }
}