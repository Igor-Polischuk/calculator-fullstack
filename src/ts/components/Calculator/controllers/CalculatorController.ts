import { removeSpaces } from '@utilities/removeSpaces';
import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorConfig } from "./config/calculator-config";
import { getActionsReg } from "./helpers/reg";
import { getExpressionsFromBrackets } from "./helpers/checkBrackets";
import { validate } from "./validation/validate";

export class CalculatorController implements ICalculatorController {
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this))
    }

    private calculateExpression(inputExpression: string): void {
        const validationResult = validate(inputExpression)
        if (validationResult.length > 0) {
            this.model.setError(validationResult)
        } else {
            const result = this.calculate(inputExpression);
            console.log(`${inputExpression} = ${result}`);
            this.model.setResult(result)
        }
    }

    private calculate(processedExpression: string): number {
        const expression = removeSpaces(processedExpression)
        const bracketedExpressions = getExpressionsFromBrackets(expression)

        if (bracketedExpressions.length === 0) {
            return this.evaluateExpression(expression)
        }

        const currentBracketedExpression = bracketedExpressions[0]
        const evaluatedCurrentBracketedExpression = this.calculate(currentBracketedExpression).toString()
        const currentBracketedExpressionInParens = this.wrapExpressionInBrackets(currentBracketedExpression)
        const expressionWithoutBracketedTerms = expression.replace(currentBracketedExpressionInParens, evaluatedCurrentBracketedExpression)
        return this.calculate(expressionWithoutBracketedTerms)
    }

    private evaluateExpression(expression: string): number {
        const operationQueueByPrecedence = this.getQueueByPrecedence(expression)
        if (operationQueueByPrecedence.length === 0) {
            return Number(expression)
        }
        const result = this.calculateByPriority(expression, operationQueueByPrecedence)
        return Number(result)
    }

    private calculateByPriority(expression: string, operationQueueByPrecedence: string[][]): string {
        const currentOperations = operationQueueByPrecedence[operationQueueByPrecedence.length - 1]
        const calculatedCurrentOperations = this.calculateCurrentOperations(expression, currentOperations)

        if (operationQueueByPrecedence.length === 1) {
            return calculatedCurrentOperations
        }
        const newQueueByPrecedence = operationQueueByPrecedence.slice(0, operationQueueByPrecedence.length - 1)
        return this.calculateByPriority(calculatedCurrentOperations, newQueueByPrecedence)
    }

    private calculateCurrentOperations(expression: string, operations: string[]): string {
        return operations.reduce<string>((res: string, operation: string) => {
            const { evaluatedExpression, result } = calculatorConfig[operation].calculateOperation(res)
            return res.replace(evaluatedExpression, result)
        }, expression)
    }

    private getQueueByPrecedence(expression: string): string[][] {
        const actionsQueue = this.getActionsQueue(expression)

        const operationQueueByPrecedence = actionsQueue.reduce<string[][]>((operationQueueByPriority, operation) => {
            const currentPriority = calculatorConfig[operation].priority
            const currentOperationList = operationQueueByPriority[currentPriority] || []
            const updatedOperationList = [...currentOperationList, operation]
            const beforeCurrentPriority = operationQueueByPriority.slice(0, currentPriority)
            const afterCurrentPriority = operationQueueByPriority.slice(currentPriority + 1)
            const updatedQueueByPriority = [...beforeCurrentPriority, updatedOperationList, ...afterCurrentPriority]
            return updatedQueueByPriority
        }, [])

        return operationQueueByPrecedence
    }

    private getActionsQueue(expression: string): string[] {
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
