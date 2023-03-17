import { ICalculatorController, ICalculatorModel, IError } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorConfig, searchAllowedOperationsRegStr } from "./config/calculator-config";
import { formatExpression, hasBrackets, getMostNestedParentheses } from "./services";
import { validate } from "./validation/validate";

export class CalculatorController implements ICalculatorController {
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this))
    }


    private calculateExpression(inputExpression: string): void {
        const expression = formatExpression(inputExpression)
        const validationErrors = validate(expression)

        if (validationErrors.length > 0) {
            console.log(validationErrors);
            this.model.setError(validationErrors)
            return
        }
        try {
            const result = this.calculate(expression);

            console.log(`${inputExpression} = ${result}`);
            this.model.setResult(result)
        } catch (error) {
            this.model.setError([error as IError])
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
            const { evaluatedExpression, result } = calculatorConfig[operation].calculateOperation(resultAcc)
            const resultString = result.toString()

            return resultAcc.replace(evaluatedExpression, resultString)
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
