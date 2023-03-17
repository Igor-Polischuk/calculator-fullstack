import { ICalculatorController, ICalculatorModel, IError } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorConfig, searchAllowedOperationsRegStr } from "./config/calculator-config";
import { formatExpression, hasBrackets, getMostNestedParentheses, getNumbersFromString } from "./services";
import { validate } from "./validation/validate";

export class CalculatorController implements ICalculatorController {
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this))
    }


    private calculateExpression(inputExpression: string): void {
        const expression = formatExpression(inputExpression)
        try {
            validate(expression)
            const result = this.calculate(expression);
            console.log(`${inputExpression} = ${result}`);
            this.model.setResult(result)
        } catch (error) {
            this.model.setError(error as IError[])
        }
    }

    private calculate(expression: string): number {
        const bracketsExpressions = getMostNestedParentheses(expression)
        const calculatedMostNestedBrackets = bracketsExpressions.reduce<string>((expressionAcc, currentBracketExpression) => {
            const unbracketExpression = this.unwrapExpressionTerms(currentBracketExpression)
            const currentBracketExpressionResult = this.calculateUnbracketedExpression(unbracketExpression).toString()
            return expressionAcc.replace(currentBracketExpression, currentBracketExpressionResult)
        }, expression)

        return hasBrackets(calculatedMostNestedBrackets)
            ? this.calculate(calculatedMostNestedBrackets)
            : this.calculateUnbracketedExpression(calculatedMostNestedBrackets)
    }

    private calculateUnbracketedExpression(expression: string): number {
        const orderedOperations = this.getOrderedOperations(expression)
        const result = orderedOperations.reduce<string>((resultAcc: string, operation: string) => {
            const currentOperationObj = calculatorConfig[operation]
            const matchedExpressionWithOperation = resultAcc.match(currentOperationObj.reg)
            if (!matchedExpressionWithOperation) return resultAcc
            const [expressionWithCurrentOperation] = matchedExpressionWithOperation
            const numbersOperand = getNumbersFromString(expressionWithCurrentOperation)

            currentOperationObj.checkException(numbersOperand)
            const calculationResult = currentOperationObj.calculate(...numbersOperand).toString()
            return resultAcc.replace(expressionWithCurrentOperation, calculationResult)
        }, expression)
        return Number(result)
    }
    private getOrderedOperations(expression: string): string[] {
        const operationsInExpression = this.getOperationsFromExpression(expression)
        const orderedOperations = [...operationsInExpression];
        return orderedOperations.sort((a, b) => calculatorConfig[b].priority - calculatorConfig[a].priority)
    }

    private getOperationsFromExpression(expression: string): string[] {
        const actionsExp = RegExp(searchAllowedOperationsRegStr, 'g')
        const operationsList = expression[0] === '-' ? expression.slice(1).match(actionsExp) : expression.match(actionsExp)
        return operationsList ?? []
    }

    private unwrapExpressionTerms(expression: string) {
        return expression.slice(1, expression.length - 1)
    }
}
