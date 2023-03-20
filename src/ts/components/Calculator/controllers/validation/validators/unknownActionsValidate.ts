import { Reg } from '../validation_reg-exp';
import { calculatorConfig } from "../../config/calculator-config"
import { getAllowedSymbolsReg } from "../../services/regularExp/regExpressions"
import { Error } from "../error"


export function unknownActionsvalidator(expression: string) {
    const unknown = expression.match(getAllowedSymbolsReg())
    if (unknown) return {
        message: Error.UnknownSymbolError,
        meta: {
            errorIndex: unknown.index,
            description: `unknown symbol ${unknown[0]}`
        }
    }
    const expressionFunctions = expression.match(Reg.AllWords)

    if (!expressionFunctions) return
    for (let i = 0; i < expressionFunctions.length; i++) {
        const actionName = expressionFunctions[i]
        if (!Object.keys(calculatorConfig).includes(actionName)) return {
            message: Error.IncorrectFunctinNameError,
            meta: {
                errorIndex: expression.indexOf(actionName),
                description: `the function is not written correctly ${actionName}`
            }
        }


    }
}