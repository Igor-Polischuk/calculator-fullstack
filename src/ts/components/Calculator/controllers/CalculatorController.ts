import { ICalculatorController, ICalculatorModel } from '@components/Calculator/interfaces/ICalculator';
import { CalculatorModelEvent } from '../calculator-model-event';
import { formatExpression } from './services';
import { validate } from './validation/validate';
import expressionCalculatorService from './services/calculation/ExpressionCalculatorService';
import { ICalculationErrors } from '../interfaces/IErrors';
import { ErrorType } from '../interfaces/error-type';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel
  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this));
  }

  private calculateExpression(expression: string): void {
    const formattedExpression = formatExpression(expression);

    try {
      validate(formattedExpression);
      const result = expressionCalculatorService.calculate(formattedExpression)
      this.model.setResult(result);
    } catch (error: any) {
      //
      if (!('type' in error)) {
        error = {
          type: ErrorType.UnexpectedError,
          errors: [{ message: 'An unexpected error occurred while evaluating the expression' }]
        }
      }

      this.model.setError(error as ICalculationErrors);
    }
  }
}
