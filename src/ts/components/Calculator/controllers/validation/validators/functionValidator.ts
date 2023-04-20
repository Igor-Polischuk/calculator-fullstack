import { IError } from "exceptions/IErrors";
import { Error } from "../error"
import { functionReg } from "../../calculator-config";
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";

export function functionValidator(expression: string): IError | undefined {
    const incorrectFunctionReg = new RegExp(`(${functionReg})(?![\\d(])`, 'g')
    const incorrectFunctions = expression.match(incorrectFunctionReg)

    if (incorrectFunctions) {
        return {
            message: Error.IncorrectFunctionArgumentError,
            payload: {
                errorPlace: getSubstringsIndexes(incorrectFunctions, expression)
            }
        }
    }
}