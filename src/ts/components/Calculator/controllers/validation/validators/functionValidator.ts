import { IError } from "exceptions/IErrors";
import { ValidationError } from "../validation-error"
import { functionReg } from "../../calculator-config";
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";

export function functionValidator(expression: string): IError | undefined {
    const incorrectFunctionReg = new RegExp(`(${functionReg})(?![\\d(])`, 'g')
    const incorrectFunctions = expression.match(incorrectFunctionReg)

    if (incorrectFunctions) {
        return {
            message: ValidationError.IncorrectFunctionArgumentError,
            payload: {
                errorPlace: getSubstringsIndexes(incorrectFunctions, expression)
            }
        }
    }
}