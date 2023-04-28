import { getSubstringsIndexes } from "../../helpers/getSubstringsIndexes"
import { IExpressionValidationError } from "../ExpressionValidationError"
import { ValidationError } from "../validation-error"


export function functionValidator(expression: string): IExpressionValidationError | undefined {
    // const incorrectFunctionReg = new RegExp(`(${functionReg})(?![\\d(])`, 'g')
    // const incorrectFunctions = expression.match(incorrectFunctionReg)

    // if (incorrectFunctions) {
    //     return {
    //         message: ValidationError.IncorrectFunctionArgumentError,
    //         payload: {
    //             errorPlace: getSubstringsIndexes(incorrectFunctions, expression)
    //         }
    //     }
    // }

    return
}