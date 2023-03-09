import { Reg } from './../Reg';
import { calculatorConfig } from "../../config/calculator-config"
import { getAllowedSymbolsReg } from "../../helpers/reg"
import { Error } from "../error"


export function unknownActionsvalidator(expression: string) {
    const unknown = expression.match(getAllowedSymbolsReg())
    if (unknown) return {
        message: Error.UnknownSymbolError,
        where: unknown.index
    }
    const expressionFunctions = expression.match(Reg.AllWords)

    if (!expressionFunctions) return
    for (let i = 0; i < expressionFunctions.length; i++) {
        const actionName = expressionFunctions[i]
        if (!Object.keys(calculatorConfig).includes(actionName)) return {
            message: Error.IncorrectFunctinNameError,
            where: expression.indexOf(actionName)
        }


    }
}