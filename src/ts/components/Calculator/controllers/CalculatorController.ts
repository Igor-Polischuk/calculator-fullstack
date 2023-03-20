import { ICalculatorController, ICalculatorModel, IError } from '@components/Calculator/interfaces/ICalculator';
import { formatDecimal } from '@utilities/formatDecimal';
import { CalculatorObserverEvent } from '../calculator-event';
import { calculatorConfig } from './config/calculator-config';
import {
  formatExpression, hasBrackets, getMostNestedParentheses,
  getNumbersFromString, unwrapBracketInExpression, getOperationsFromExpression,
} from './services';
import { validate } from './validation/validate';

export class CalculatorController implements ICalculatorController {
  constructor(public model: ICalculatorModel) {
    this.model.subscribe(CalculatorObserverEvent.Expression, this.calculateExpression.bind(this));
  }

  private calculateExpression(inputExpression: string): void {
    const expression = formatExpression(inputExpression);

    try {
      validate(expression);
      const result = this.calculateExpressionWithBrackets(expression);
      console.log(`${inputExpression} = ${result}`);
      this.model.setResult(result);
    } catch (error) {
      console.log(error);
      
      this.model.setError(error as IError[]);
    }
  }

  private calculateExpressionWithBrackets(expression: string): number {
    const bracketsExpressions = getMostNestedParentheses(expression);
    const calculatedMostNestedBrackets = bracketsExpressions.reduce<string>(
      (expressionAcc, currentBracketExpression) => {
        const unbracketExpression = unwrapBracketInExpression(currentBracketExpression);
        const currentBracketExpressionResult = this.calculateUnbracketedExpression(unbracketExpression).toString();
        return expressionAcc.replace(currentBracketExpression, currentBracketExpressionResult);
      }, expression);

    return hasBrackets(calculatedMostNestedBrackets)
      ? this.calculateExpressionWithBrackets(calculatedMostNestedBrackets)
      : this.calculateUnbracketedExpression(calculatedMostNestedBrackets);
  }

  private calculateUnbracketedExpression(expression: string): number {
    const expressionOperators = getOperationsFromExpression(expression);
    //todo
    const orderedOperations = expressionOperators.sort(
      (a, b) => calculatorConfig[b].priority - calculatorConfig[a].priority,
    );
    const result = orderedOperations.reduce<string>((resultAcc: string, operation: string) => {
      const currentOperationObj = calculatorConfig[operation];
      const matchedExpressionWithOperation = resultAcc.match(currentOperationObj.reg)
      if (!matchedExpressionWithOperation) {
        return resultAcc
      }
      const [expressionWithCurrentOperation] = matchedExpressionWithOperation
      const numbersOperand = getNumbersFromString(expressionWithCurrentOperation)

      currentOperationObj.checkException(numbersOperand);
      const calculationResult = currentOperationObj.calculate(...numbersOperand).toString()
      return resultAcc.replace(expressionWithCurrentOperation, calculationResult)
    }, expression)

    const formatedResult = formatDecimal(+result, 10)

    return formatedResult
  }
}
