import { ICalculatorController, ICalculatorModel } from '@modules/Calculator/interfaces/ICalculator';
import { calculatorAPI } from '@modules/Calculator/api/CalculatorAPI';
import { AppError } from '@common/AppError/AppError';

import { CalculatorModelEvent } from '../models/calculator-model-event';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel

  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))
    this.loadData()
  }

  private async loadData() {
    const historyResponse = await this.handleApiRequest(calculatorAPI.getHistory.bind(calculatorAPI))
    const operationsResponse = await this.handleApiRequest(calculatorAPI.getOperations.bind(calculatorAPI))

    if (historyResponse && operationsResponse) {
      this.model.setHistory(historyResponse.data.items)
      this.model.setOperations(operationsResponse.data.items)
    }
  }

  private async calculateExpression(expression: string): Promise<void> {
    const resultResponse = await this.handleApiRequest(() => calculatorAPI.calculateExpression(expression))

    resultResponse && this.model.setResult(resultResponse.data.result)
  }


  private async handleApiRequest<T extends (...args: any[]) => any>(apiFunction: T): Promise<ReturnType<T> | undefined> {
    try {
      this.model.setLoading(true)
      const result = await apiFunction()

      return result as ReturnType<T>

    } catch (err) {
      const error = AppError.getErrorFrom(err)
      this.model.setError(error)

    } finally {
      this.model.setLoading(false)
    }
  }

}
