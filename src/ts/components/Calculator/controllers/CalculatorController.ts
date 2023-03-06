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
            if (!validate(expression).isValid) {
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

    private calculate(exp: string) {
        let expression = exp.replace(/\s/g, '')
        const expressionsInBrackets = getExpressionsFromBrackets(expression)
        expressionsInBrackets.forEach(bracketExpression => {
            const resOfExpresiionInBrackets = this.calculate(bracketExpression)
            expression = expression.replace(`(${bracketExpression})`, resOfExpresiionInBrackets.toString())
        })

        const result = this.evaluateExpression(expression)
        return result
    }

    private evaluateExpression(expression: string): number {
        const queueByPrecedence = this.getQueueByPrecedence(expression)

        let res = expression
        if (queueByPrecedence) {
            Object.keys(Priority)
                .sort((a, b) => Priority[b] - Priority[a])
                .forEach((priority) => {
                    queueByPrecedence[Priority[priority]]?.forEach((action) => {
                        const {evaluatedExpression, result} = this.calculatorCongig[action].doAction(res);
                        res = res.replace(evaluatedExpression, result.toString())
                    });
                });
        }

        return +res
    }

    private getQueueByPrecedence(expression: string) {
        const actionsExp = getActionsReg()
        const actionsQueue = expression.match(actionsExp)

        return actionsQueue?.reduce<{ [precedence: number]: string[] }>((obj, action) => {
            const currentPriority = this.calculatorCongig[action].priority
            obj[currentPriority] ? obj[currentPriority].push(action) : obj[currentPriority] = [action]
            return obj
        }, {})
    }
}