import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorConfig } from "./config/calculator-config";
import { getExpressionsFromBrackets, formatExpression, isBrackets } from "./helpers";
import { validate } from "./validation/validate";


export class CalculatorController implements ICalculatorController {
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this))
    }

    private calculateExpression(inputExpression: string): void {
        const expression = formatExpression(inputExpression)
        const validationResult = validate(expression)
        if (validationResult.length > 0) {
            this.model.setError(validationResult)
        } else {
            const result = this.calculate(expression);

            console.log(`${inputExpression} = ${result}`);
            this.model.setResult(result)
        }
    }

    private calculate(expression: string): number {
        if (!isBrackets(expression)) {
            return this.evaluateExpression(expression)
        }

        const bracketedExpressions = getExpressionsFromBrackets(expression)
        const currentBracketedExpression = bracketedExpressions[0]

        const evaluatedCurrentBracketedExpression = this.evaluateExpressionBasedOnBrackets(currentBracketedExpression)

        const evaluatedCurrentBracketedExpressionAsStr = evaluatedCurrentBracketedExpression.toString()
        const currentBracketedExpressionInParens = this.wrapExpressionInBrackets(currentBracketedExpression)
        const expressionWithoutBracketedTerms = expression.replace(currentBracketedExpressionInParens, evaluatedCurrentBracketedExpressionAsStr)

        return this.evaluateExpressionBasedOnBrackets(expressionWithoutBracketedTerms)
    }

    private evaluateExpressionBasedOnBrackets(expression: string) {
        return isBrackets(expression) ?
            this.calculate(expression) :
            this.evaluateExpression(expression)
    }

    private evaluateExpression(expression: string): number {
        const operationQueue = this.getOperationQueue(expression)
        const result = operationQueue.reduce<string>((resultAcc: string, operation: string) => {
            const { evaluatedExpression, result } = calculatorConfig[operation].calculateOperation(resultAcc)
            return resultAcc.replace(evaluatedExpression, result)
        }, expression)
        return Number(result)
    }

    private getOperationQueue(expression: string): string[] {
        const operationsInExpression = this.getOperationArray(expression)

        const sorted = [...operationsInExpression];
        for (let i = 0; i < sorted.length - 1; i++) {
            for (let j = 0; j < sorted.length - i - 1; j++) {
                const current = sorted[j]
                const next = sorted[j + 1]
                if (calculatorConfig[current].priority < calculatorConfig[next].priority) {
                    sorted[j] = next
                    sorted[j + 1] = current
                }
            }
        }

        return sorted
    }

    private getOperationArray(expression: string): string[] {
        const actionsExp = RegExp(
            Object.keys(calculatorConfig)
                .map(i => i.length === 1 ? `\\d\\${i}` : i)
                .join('|'), 'g')


        const actionsArray = expression.match(actionsExp)
        return actionsArray ? actionsArray.map(operation => operation.replace(/\d+/g, '')) : []
    }

    private wrapExpressionInBrackets(bracketsExpression: string) {
        return `(${bracketsExpression})`
    }
}
