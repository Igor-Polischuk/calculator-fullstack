import { removeSpaces } from '@utilities/removeSpaces';
import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorConfig } from "./config/calculator-config";
import { Priority, weightOfPriority } from "./config/priority";
import { getActionsReg } from "./helpers/reg";
import { getExpressionsFromBrackets } from "./helpers/checkBrackets";
import { validate } from "./validation/validate";

export class CalculatorController implements ICalculatorController {
    private calculatorCongig = calculatorConfig
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this))
    }

    private calculateExpression(expression: string) {
        const validationResult = validate(expression)
        if (validationResult.length > 0) {
            this.model.setError(validationResult)
        } else {
            const result = this.calculate(expression);
            console.log(`${expression} = ${result}`);
            this.model.setResult(result)
        }
    }

    private calculate(exp: string): number {
        const expression = removeSpaces(exp)
        const expressionsInBrackets = getExpressionsFromBrackets(expression)

        if (expressionsInBrackets.length === 0) return this.evaluateExpression(expression)

        const bracketsExpression = expressionsInBrackets[0]

        const resultOfBracketExpression = this.calculate(bracketsExpression)
        const expressionWithoutBracket = expression.replace(`(${bracketsExpression})`, resultOfBracketExpression.toString())
        return this.calculate(expressionWithoutBracket)
    }

    private evaluateExpression(expression: string): number {
        const queueByPrecedence = this.getQueueByPrecedence(expression)
        if (!queueByPrecedence) {
            return +expression
        }
        
        const result = weightOfPriority.reduce<string>((expressionAccumulator, priorityWeight) => {
            const priority = Priority[priorityWeight]
            const currentActions = queueByPrecedence[priority]
            if (!currentActions) return expressionAccumulator

            return currentActions.reduce<string>((res: string, action: string) => {
                const { evaluatedExpression, result } = this.calculatorCongig[action].doAction(res)
                return res.replace(evaluatedExpression, result.toString())
            }, expressionAccumulator)
        }, expression)

        return +result
    }

    private getQueueByPrecedence(expression: string) {
        const actionsExp = getActionsReg()
        const actionsQueue = expression.match(actionsExp)?.map(i => i.replace(/\d+/g, ''))

        const queueByPrecedence = actionsQueue?.reduce<{ [precedence: number]: string[] }>((obj, action) => {
            const currentPriority = this.calculatorCongig[action].priority
            const currentActionsArray = obj[currentPriority] || []
            obj[currentPriority] = [...currentActionsArray, action]
            return obj
        }, {})

        return queueByPrecedence
    }
}
