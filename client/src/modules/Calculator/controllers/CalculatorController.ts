import { ICalculatorController, ICalculatorModel } from '@modules/Calculator/interfaces/ICalculator';
import { CalculatorModelEvent } from '../calculator-model-event';
import { AppError } from 'errors/AppError';
import { formatExpression } from '@utilities/formatText/formatExpression';
import { calculatorAPI } from 'api/CalculatorAPI';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel
  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))

    this.model.setAsyncData({
      [CalculatorModelEvent.HistoryChanged]: () => calculatorAPI.getHistory(),
      [CalculatorModelEvent.ButtonsDataChanged]: () => calculatorAPI.getOperations()
    })
  }

  private async calculateExpression(expression: string): Promise<void> {
    this.model.setFetchingResult(true)
    const formattedExpression = formatExpression(expression)

    try {
      const result = await calculatorAPI.calculateExpression(formattedExpression)
      this.model.setResult(result)

    } catch (error: any) {
      const appError = AppError.getErrorFrom(error)
      this.model.setError(appError as AppError)
    }

    this.model.setFetchingResult(false)
  }
}
