import {
    getMostNestedBrackets,
    hasBrackets,
    unwrapBracketInExpression,
    getNumbersFromExpression,
    getOperationsFromExpression,
    formatDecimal,
    formatExpression
} from '../helpers'

import { allowedActions, calculatorConfig } from "../calculator-config";
import { IOperationsList } from "../interfaces/IOperationList";

class CalculatorService {
    calculateExpression(expression: string): number {
        const formattedExpression = formatExpression(expression)
        const result = this.processBracketedExpression(formattedExpression)
        const precision = process.env.PRECISION || 7

        return formatDecimal(Number(result), Number(precision))
    }

    processBracketedExpression(expression: string): string {
        const bracketsExpressions = getMostNestedBrackets(expression)

        const replacedMostNestedBrackets = bracketsExpressions.reduce<string>(
            (expressionAcc, currentBracketExpression) => {
                const unbracketedExpression = unwrapBracketInExpression(currentBracketExpression)
                const currentBracketExpressionResult = this.calculateUnbracketedExpression(unbracketedExpression)
                return expressionAcc.replace(currentBracketExpression, currentBracketExpressionResult)
            }, expression)

        return hasBrackets(replacedMostNestedBrackets)
            ? this.processBracketedExpression(replacedMostNestedBrackets)
            : this.calculateUnbracketedExpression(replacedMostNestedBrackets)
    }

    calculateUnbracketedExpression(expression: string): string {
        const expressionOperators = getOperationsFromExpression(expression)
        const orderedOperations = expressionOperators.sort(
            (a, b) => calculatorConfig[b].priority - calculatorConfig[a].priority,
        );

        const result = orderedOperations.reduce<string>((expressionAcc, operation) => {
            const currentOperationObj = calculatorConfig[operation];
            const matchedExpressionWithOperation = expressionAcc.match(currentOperationObj.reg)

            if (!matchedExpressionWithOperation) {
                return expression
            }

            const [expressionWithCurrentOperation] = matchedExpressionWithOperation
            const numbersOperand = getNumbersFromExpression(expressionWithCurrentOperation)

            currentOperationObj.checkException(numbersOperand, expressionWithCurrentOperation)
            const calculationResult = currentOperationObj.calculate(...numbersOperand).toString()

            return expressionAcc.replace(expressionWithCurrentOperation, calculationResult)
        }, expression)

        return result
    }

    getOperations() {
        return allowedActions.reduce<IOperationsList[]>((operationsDataAcc, currentOperation) => {
            const operationData = calculatorConfig[currentOperation]
            const buttonText = {
                operationSymbol: operationData.text || currentOperation,
                operation: currentOperation
            }
            return [...operationsDataAcc, buttonText]
        }, [])
    }
}

export const calculatorService = new CalculatorService()