import { formatDecimal } from "@utilities/formatText/formatDecimal";
import { calculatorConfig } from "../../calculator-config";
import { getMostNestedBrackets } from "../brackets/getMostNestedBrackets";
import { hasBrackets } from "../brackets/hasBrackets";
import { getNumbersFromExpression } from "../expressionDataParsers/getNumbersFromExpression";
import { getOperationsFromExpression } from "../expressionDataParsers/getOperationsFromExpression";
import { unwrapBracketInExpression } from "../formatting/unwrapExpressionTerms";

export function calculate(expression: string): number {
    const result = +processBracketedExpression(expression)
    const precision = process.env.PRECISION || 7

    return formatDecimal(result, +precision)
}

function processBracketedExpression(expression: string): string {
    const bracketsExpressions = getMostNestedBrackets(expression)

    const replacedMostNestedBrackets = bracketsExpressions.reduce<string>(
        (expressionAcc, currentBracketExpression) => {
            const unbracketedExpression = unwrapBracketInExpression(currentBracketExpression)
            const currentBracketExpressionResult = calculateUnbracketedExpression(unbracketedExpression)
            return expressionAcc.replace(currentBracketExpression, currentBracketExpressionResult)
        }, expression)

    return hasBrackets(replacedMostNestedBrackets)
        ? processBracketedExpression(replacedMostNestedBrackets)
        : calculateUnbracketedExpression(replacedMostNestedBrackets)
}

function calculateUnbracketedExpression(expression: string): string {
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