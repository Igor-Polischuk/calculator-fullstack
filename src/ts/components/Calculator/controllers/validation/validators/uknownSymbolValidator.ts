import { IValidationError } from "@components/Calculator/interfaces/ICalculator"
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";
import { Error } from "../error"
import { searchAllowedOperationsRegStr } from "../../config/calculator-config";
import { incorrectFunctionNameValidator } from "./incorrectFunctionNameValidator";

export function unknownSymbolValidator(expression: string): IValidationError | undefined {
    const unknownSymbolReg = new RegExp(`[^0-9${searchAllowedOperationsRegStr}().]`, "g")
    const unknownSymbols = expression.match(unknownSymbolReg)

    if (unknownSymbols) {
        return {
            message: Error.UnknownSymbol,
            errorPlace: getSubstringsIndexes(unknownSymbols, expression)
        }
    }
    return incorrectFunctionNameValidator(expression)
}