import { getMostNestedBrackets } from "../helpers/brackets/getMostNestedBrackets";
import { hasBrackets } from "../helpers/brackets/hasBrackets";
import { unwrapBracketInExpression } from "../helpers/brackets/unwrapExpressionTerms";
import { getNumbersFromExpression } from "../helpers/getNumberFromExpression";
import { getOperationsFromExpression } from "../helpers/getOperationsFromExpression";
import { formatDecimal } from "../helpers/formatDecimal";
import { allowedActions, calculatorConfig } from "../calculator-config";
import { IOperationsList } from "../interfaces/IOperationList";
import { formatExpression } from "../helpers/text-formatting/formatExpression";

export class CalculatorService {
    static calculateExpression(expression: string): number {
        const formattedExpression = formatExpression(expression)
        const result = this.processBracketedExpression(formattedExpression)
        const precision = process.env.PRECISION || 7

        return formatDecimal(Number(result), Number(precision))
    }

    static processBracketedExpression(expression: string): string {
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

    static calculateUnbracketedExpression(expression: string): string {
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

    static getOperations() {
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