import { ICalculatorController, ICalculatorModel, IError } from '@components/Calculator/interfaces/ICalculator';
import { formatDecimal } from '@utilities/formatDecimal';
import { CalculatorModelEvent } from '../calculator-model-event';
import { calculatorConfig } from './config/calculator-config';
import { formatExpression, getNumbersFromExpression, processExpression } from './services';
import { validate } from './validation/validate';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel
  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this));
  }

  private calculateExpression(inputExpression: string): void {
    const expression = formatExpression(inputExpression);

    try {
      validate(expression);
      const resultString = this.calculate(expression)
      const result = Number(resultString)
      const roundedResult = formatDecimal(result, 5)
      this.model.setResult(roundedResult);
    } catch (error) {
      console.log(error);
      this.model.setError(error as IError[]);
    }
  }

  private calculate =  processExpression(this.calculateUnbracketedExpression)

  private calculateUnbracketedExpression(calculationResultAccumulator: string, operation: string): string {
    const currentOperationObj = calculatorConfig[operation];
    const matchedExpressionWithOperation = calculationResultAccumulator.match(currentOperationObj.reg)
    if (!matchedExpressionWithOperation) {
      return calculationResultAccumulator
    }
    const [expressionWithCurrentOperation] = matchedExpressionWithOperation
    const numbersOperand = getNumbersFromExpression(expressionWithCurrentOperation)

    currentOperationObj.checkException(numbersOperand, expressionWithCurrentOperation);
    const calculationResult = currentOperationObj.calculate(...numbersOperand).toString()

    return calculationResultAccumulator.replace(expressionWithCurrentOperation, calculationResult)
  }
}
