import { calculatorConfig } from "../../config/calculator-config";
import { getMostNestedParentheses } from "../brackets/getMostNestedParentheses";
import { hasBrackets } from "../brackets/hasBrackets";
import { getOperationsFromExpression } from "../expressionDataParsers/getOperationsFromExpression";
import { unwrapBracketInExpression } from "../formatting/unwrapExpressionTerms";


type unbracketedExpressionProcessor = (resultAcc: string, operation: string) => string

export function processExpression(processingCallback: unbracketedExpressionProcessor) {
    function processBracketedExpression(expression: string): string {
        const bracketsExpressions = getMostNestedParentheses(expression);
        const replacedMostNestedBrackets = bracketsExpressions.reduce<string>(
            (expressionAcc, currentBracketExpression) => {
                const unbracketedExpression = unwrapBracketInExpression(currentBracketExpression);
                const currentBracketExpressionResult = processUnbracketedExpression(unbracketedExpression)
                return expressionAcc.replace(currentBracketExpression, currentBracketExpressionResult);
            }, expression);
        return hasBrackets(replacedMostNestedBrackets)
            ? processBracketedExpression(replacedMostNestedBrackets)
            : processUnbracketedExpression(replacedMostNestedBrackets)
    }

    function processUnbracketedExpression(expression: string) {
        const expressionOperators = getOperationsFromExpression(expression)
        const orderedOperations = expressionOperators.sort(
            (a, b) => calculatorConfig[b].priority - calculatorConfig[a].priority,
        );
        const result = orderedOperations.reduce<string>((expressionAcc, operation) => {
            return processingCallback(expressionAcc, operation)
        }, expression)

        return result
    }

    return processBracketedExpression
}

