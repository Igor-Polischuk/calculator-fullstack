import { formatDecimal } from "@utilities/formatText/formatDecimal";
import { calculatorConfig } from "../../config/calculator-config";
import { getMostNestedBrackets } from "../brackets/getMostNestedBrackets";
import { hasBrackets } from "../brackets/hasBrackets";
import { getNumbersFromExpression } from "../expressionDataParsers/getNumbersFromExpression";
import { getOperationsFromExpression } from "../expressionDataParsers/getOperationsFromExpression";
import { unwrapBracketInExpression } from "../formatting/unwrapExpressionTerms";

//
class ExpressionCalculatorService {
    calculate(expression: string): number {
        const result = +this.processBracketedExpression(expression)
        return formatDecimal(result, 7)
    }

    private processBracketedExpression(expression: string): string {
        const bracketsExpressions = getMostNestedBrackets(expression);
        const replacedMostNestedBrackets = bracketsExpressions.reduce<string>(
            (expressionAcc, currentBracketExpression) => {
                const unbracketedExpression = unwrapBracketInExpression(currentBracketExpression);
                const currentBracketExpressionResult = this.calculateUnbracketedExpression(unbracketedExpression)
                return expressionAcc.replace(currentBracketExpression, currentBracketExpressionResult);
            }, expression);
        return hasBrackets(replacedMostNestedBrackets)
            ? this.processBracketedExpression(replacedMostNestedBrackets)
            : this.calculateUnbracketedExpression(replacedMostNestedBrackets)
    }

    private calculateUnbracketedExpression(expression: string): string {
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

            currentOperationObj.checkException(numbersOperand, expressionWithCurrentOperation);
            const calculationResult = currentOperationObj.calculate(...numbersOperand).toString()

            return expressionAcc.replace(expressionWithCurrentOperation, calculationResult)
        }, expression)

        return result
    }
}

export default new ExpressionCalculatorService()