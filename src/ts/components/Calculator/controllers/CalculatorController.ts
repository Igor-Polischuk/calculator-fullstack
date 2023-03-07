import { removeSpaces } from '@utilities/removeSpaces';
import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorConfig } from "./config/calculator-config";
import { Priority } from "./config/priority";
import { getActionsReg } from "./helpers/reg";
import { getExpressionsFromBrackets } from "./helpers/checkBrackets";
import { validate } from "./validation/validate";

export class CalculatorController implements ICalculatorController {
    private calculatorCongig = calculatorConfig
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this))
    }

    private calculateExpression(expression: string) {
        try {
            if (validate(expression).length > 0) {
                throw new Error()
            }
            const result = this.calculate(expression);
            console.log(`${expression} = ${result}`);
            this.model.setResult(result)
        } catch (error) {
            if (error instanceof Error && typeof error.message === 'string') {
                console.error(`${error.message}: ${expression}`);
            } else {
                console.log('An error occurred:', error);
            }

        }
    }

    private calculate(exp: string): number {
        const expression = removeSpaces(exp)
        const expressionsInBrackets = getExpressionsFromBrackets(expression)

        if (expressionsInBrackets.length === 0) return this.evaluateExpression(expression)

        const bracketsExpression = expressionsInBrackets[0]
        const ValueOfExpressionInBrackets = this.calculate(bracketsExpression)
        const expressionWithoutBracket = expression.replace(`(${bracketsExpression})`, ValueOfExpressionInBrackets.toString())
        return this.calculate(expressionWithoutBracket)
    }

    private evaluateExpression(expression: string): number {
        const queueByPrecedence = this.getQueueByPrecedence(expression)
        if (!queueByPrecedence) return Number.parseFloat(expression)
        const priorityValues = Object.keys(Priority).sort((a, b) => Priority[b] - Priority[a])

        const result = priorityValues.reduce<string>((acc, priorityIndex) => {
            const currentActions = queueByPrecedence[Priority[priorityIndex]]
            if (!currentActions) return acc

            return currentActions.reduce<string>((res: string, action: string) => {
                const { evaluatedExpression, result } = this.calculatorCongig[action].doAction(res)
                return res.replace(evaluatedExpression, result.toString())
            }, acc)
        }, expression)

        return +result
    }

    private getQueueByPrecedence(expression: string) {
        const actionsExp = getActionsReg()
        const actionsQueue = expression.match(actionsExp)

        const queueByPrecedence = actionsQueue?.reduce<{ [precedence: number]: string[] }>((obj, action) => {
            const currentPriority = this.calculatorCongig[action].priority
            obj[currentPriority] ? obj[currentPriority].push(action) : obj[currentPriority] = [action]
            return obj
        }, {})

        return queueByPrecedence
    }
}
