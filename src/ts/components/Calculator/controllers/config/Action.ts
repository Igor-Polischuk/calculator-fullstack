import { IAction } from "@components/Calculator/types/ICalculator";
import { getNumberReg } from "../helpers/reg";

export class Action implements IAction {
    private action: string
    private reg: RegExp
    private calculate: (...args: number[]) => number
    readonly priority: number

    constructor(config: {
        action: string
        reg: RegExp
        priority: number
        calculate: (...args: number[]) => number
    }) {
        this.action = config.action
        this.reg = config.reg
        this.calculate = config.calculate
        this.priority = config.priority
    }

    public doAction(expression: string) {
        const matches = expression.match(this.reg)
        if (!matches) return {
            evaluatedExpression: expression,
            result: +expression
        }
        const result = this.action.length === 1 ? this.binaryActionCalculate(matches[0]) : this.functionValueCalculate(matches[0])
        return {
            evaluatedExpression: matches[0],
            result
        }
    }

    functionValueCalculate(expression: string): number {
        const matchNumber = expression.match(getNumberReg())
        if (!matchNumber) return +expression
        const number = +matchNumber[0]
        return this.calculate(number)
    }

    binaryActionCalculate(expression: string): number {
        const firstNumber = parseFloat(expression)
        const secondNumber = +expression.replace(firstNumber.toString(), '').split('').slice(1).join('')
        return this.calculate(firstNumber, secondNumber)
    }
}
