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

    this.fetchDataAndSetModel()
  }

  private async fetchDataAndSetModel() {
    this.model.setLoadingData(true)
    const history = await calculatorAPI.getHistory()
    const operations = await calculatorAPI.getOperations()

    this.model.setHistory(history)
    this.model.setOperations(operations)
    this.model.setLoadingData(false)
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
