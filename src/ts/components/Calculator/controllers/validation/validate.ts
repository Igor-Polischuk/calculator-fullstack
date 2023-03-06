import { calculatorConfig } from "../config/calculator-config"
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
        const checkOpen = this.expression.match(/[\*\+\/\-\^]\)[\d+|\w+]/);
        const checkClosen = this.expression.match(/[\d+|\w+]\([\*\+\/\-\^]/);
        console.log(checkOpen);
        
        if (checkClosen) this.setValidationFail('bracketsValidate', Error.BracketError, checkClosen.index)
        if (checkOpen) this.setValidationFail('bracketsValidate', Error.BracketError, checkOpen.index)
        return this
    }

    zeroDivisionValidate() {
        const match = this.expression.match(/\/0+(?!\.\d)/)  
        match && this.setValidationFail('zeroDivision', Error.ZeroDivisionError, match?.index)
        return this
    }

    unknownActions() {
        const unknown = this.expression.match(getAllowedSymbolsReg())
        if (unknown) this.setValidationFail('unknownSymbols', Error.UnknownSymbolError, unknown.index)
        const expressionFunctions = this.expression.match(/[a-zA-Z]+/g)
        expressionFunctions?.forEach(funcName => {
            if (!Object.keys(calculatorConfig).includes(funcName)) {
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
        if (!correctStart) this.setValidationFail('wrongStart', Error.LineStartError, 0)
        return this
    }

    expressionEndValidate(){
        if (!/[\d)]$/.test(this.expression)) this.setValidationFail('wrongEnd', Error.LineEndtError, this.expression.length - 1)
        return this
    }

    pointValidate(){
        this.expression.split('').forEach((char, i) => {
            if(char === '.' && (isNaN(+this.expression[i-1]) || isNaN(+this.expression[i+1]))){
                this.setValidationFail('pointError', Error.PointError, i)
            }
        })
        const numberWithSeveralPoints = this.expression.match(/\d+(\.\d+){2,}/)
        if(numberWithSeveralPoints) this.setValidationFail('numberPointError', Error.NumberPointError, numberWithSeveralPoints.index)
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