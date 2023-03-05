import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorCongig } from "./config/calculator-config";
import { Priority } from "./config/priority";
import { checkBrackets, getExpressionsFromBrackets } from "./helpers/checkBrackets";

export class CalculatorController implements ICalculatorController {
    private calculatorCongig = calculatorCongig
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, this.updateResutl.bind(this))
    }

    private updateResutl(expression: string) {
        try {
            const result = this.calculate(expression);
            console.log(`${expression} = ${result}`);
            this.model.setResult(result)
        } catch (error) {
            if (error instanceof Error && typeof error.message === 'string') {
                console.log(error.message);
            } else {
                console.log('An error occurred:', error);
            }

        }
    }

    private calculate(exp: string) {
        let expression = exp.replace(/\s/g, '')
        expression = this.calculateExpressionInBrackets(expression)
        
        const result = +this.getResult(expression)
        
        if (isNaN(+this.getResult(expression))) throw new Error('expression format is incorrect')
        return result
    }

    private getResult(expression: string): number {
        const queueByPrecedence = this.getQueueByPrecedence(expression)
        
        let res = expression
        if (queueByPrecedence) {
            Object.keys(Priority)
                .sort((a, b) => Priority[b] - Priority[a])
                .forEach((priority) => {
                    queueByPrecedence[Priority[priority]]?.forEach((action) => {
                        res = this.calculatorCongig[action].doAction(res);
                    });
                });
        }

        return +res
    }

    private getQueueByPrecedence(expression: string) {
        const actionsExp = new RegExp(
            Object.keys(calculatorCongig)
            .map(i => i.length === 1 ? `\\${i}` : i)
            .join('|'), 'g')
        const actionsQueue = expression.match(actionsExp)
        
        return actionsQueue?.reduce<{ [precedence: number]: string[] }>((obj, action) => {
            const currentPriority = this.calculatorCongig[action].priority
            obj[currentPriority] ? obj[currentPriority].push(action) : obj[currentPriority] = [action]
            return obj
        }, {})
    }

    private calculateExpressionInBrackets(exp: string) {
        let expression = exp
        
        if (expression.includes('(')) {
            if (!checkBrackets(expression)) throw new Error('incorrect order of brackets')
            const expressionsInBrackets = getExpressionsFromBrackets(expression)
            expressionsInBrackets.forEach(bracketExpression => {
                const resOfExpresiionInBrackets = this.calculate(bracketExpression)
                expression = expression.replace(`(${bracketExpression})`, resOfExpresiionInBrackets.toString())
            })
        }
        return expression
    }

}