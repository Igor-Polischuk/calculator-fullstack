import { calculatorCongig } from "../config/calculator-config"
import { getActionsReg, getAllowedSymbolsReg } from "../helpers/reg"
import { Error } from "./error"
import { bracketsValidator } from "./validators/bracketsValidator"

interface IValidationResult {
    isValid: boolean
    failedValidation: {
        [validationName: string]: {
            message: string
            where?: number
        }
    }
}

class Validator {
    private result: IValidationResult = {
        isValid: true,
        failedValidation: {}
    };
    constructor(private expression: string) { }

    bracketsValidate() {
        bracketsValidator(this.expression, this.setValidationFail.bind(this))
        return this
    }

    zeroDivisionValidate() {
        const match = this.expression.match(/\/0/)
        match && this.setValidationFail('zeroDivision', Error.ZeroDivisionError, match?.index)
        return this
    }

    unknownActions() {
        const unknown = this.expression.match(getAllowedSymbolsReg())
        if (unknown) this.setValidationFail('unknownSymbols', Error.UnknownSymbolError, unknown.index)
        const expressionFunctions = this.expression.match(/[a-zA-Z]+/g)
        expressionFunctions?.forEach(funcName => {
            if (!Object.keys(calculatorCongig).includes(funcName)) {
                this.setValidationFail('incorrectFunctionName', Error.IncorrectFunctinNameError, this.expression.indexOf(funcName))
            }
        })

        return this
    }

    actio0nQueue() {
        const actionsInRow = this.expression.match(/[+\-/*]{2,}(?!--)/)
        if (actionsInRow) {
            this.setValidationFail('actionQueue', Error.IncorectActionQueueError, actionsInRow?.index)
        }

        return this
    }

    expressionStartValidate(){
        const correctStart = this.expression.match(/^[\d\w+\-(]+/)
        if (!correctStart) this.setValidationFail('wrongStart', Error.lineStartError, 0)
        return this
    }

    expressionEndValidate(){
        if (!/[\d)]$/.test(this.expression)) this.setValidationFail('wrongEnd', Error.lineEndtError, this.expression.length - 1)
        return this
    }

    pointValidate(){
        const incorectPoint = this.expression.match(/(?<!\d)\.(?!\d)/g)
        if(incorectPoint) this.setValidationFail('pointError', Error.UnexpectedClosingBracketError, incorectPoint.index)
        
        return this
    }

    validationResult() {
        return this.result
    }

    private setValidationFail(name: string, message: string, where?: number) {
        this.result.isValid = false
        this.result.failedValidation[name] = {
            message,
            where
        }

    }
}

export function validate(exp: string) {
    let expression = exp.replace(/\s/g, '')
    const validator = new Validator(expression)
    const result = validator
        .expressionStartValidate()
        .expressionEndValidate()
        .bracketsValidate()
        .unknownActions()
        .actio0nQueue()
        .zeroDivisionValidate()
        .pointValidate()
        .validationResult()
    console.log(result);
    return result
}