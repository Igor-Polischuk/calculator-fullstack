import { ICalculatorController, ICalculatorModel, IError } from '@components/Calculator/interfaces/ICalculator';
import { formatDecimal } from '@utilities/formatText/formatDecimal';
import { CalculatorModelEvent } from '../calculator-model-event';
import { formatExpression } from './services';
import { validate } from './validation/validate';
import expressionCalculator from './services/calculation/calculate';

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
      const result = expressionCalculator.calculate(expression)
      this.model.setResult(result);
    } catch (error) {
      console.log(error);
      this.model.setError(error as IError[]);
    }
  }
}
