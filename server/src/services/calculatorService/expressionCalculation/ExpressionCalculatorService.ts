import { getMostNestedBrackets } from "../helpers/brackets/getMostNestedBrackets";
import { hasBrackets } from "../helpers/brackets/hasBrackets";
import { unwrapBracketInExpression } from "../helpers/brackets/unwrapExpressionTerms";
import { getNumbersFromExpression } from "../helpers/expressionDataParsers/getNumbersFromExpression";
import { getOperationsFromExpression } from "../helpers/expressionDataParsers/getOperationsFromExpression";
import { formatDecimal } from "../helpers/formatDecimal";
import { formatExpression } from "../helpers/formatText/formatExpression";
import { calculatorConfig } from "./calculator-config";

export function calculateExpression(expression: string): number {
    const formattedExpression = formatExpression(expression)
    const result = +processBracketedExpression(formattedExpression)
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