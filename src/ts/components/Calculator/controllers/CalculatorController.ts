import { ICalculatorController, ICalculatorModel, IError } from '@components/Calculator/interfaces/ICalculator';
import { CalculatorModelEvent } from '../calculator-model-event';
import { formatExpression } from './services';
import { validate } from './validation/validate';
import expressionCalculatorService from './services/calculation/ExpressionCalculatorService';

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
    } catch (error) {
      console.log(error);
      this.model.setError(error as IError | IError[]);
    }
  }
}
