import { ICalculatorController, ICalculatorModel } from '@modules/Calculator/interfaces/ICalculator';
import { calculatorAPI } from '@modules/Calculator/api/CalculatorAPI';
import { AppError } from '@common/AppError/AppError';
import { logger } from '@common/Logger/Logger';

import { CalculatorModelEvent } from '../models/calculator-model-event';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel

  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))
    this.loadData()
  }

  private async loadData() {
    const historyResponse = await this.handleLoadingWhileRequest(calculatorAPI.getHistory.bind(calculatorAPI))
    const operationsResponse = await this.handleLoadingWhileRequest(calculatorAPI.getOperations.bind(calculatorAPI))

    if (historyResponse && operationsResponse) {
      this.model.setHistory(historyResponse.data.items)
      this.model.setOperations(operationsResponse.data.items)
    }
  }

  private async calculateExpression(expression: string): Promise<void> {
    const resultResponse = await this.handleLoadingWhileRequest(() => calculatorAPI.calculateExpression(expression))

    if (resultResponse) {
      this.model.setResult(resultResponse.data.result)
    }
  }


  private async handleLoadingWhileRequest<T extends (...args: any[]) => any>(apiFunction: T): Promise<ReturnType<T> | undefined> {
    try {
      this.model.setLoading(true)
      const result = await apiFunction()

      return result as ReturnType<T>

    } catch (err) {
      logger.addLog('warn', `Catched error in calculator controller: ${apiFunction.name}`, err)

      const error = AppError.getErrorFrom(err)
      this.model.setError(error)

    } finally {
      this.model.setLoading(false)
    }
  }

}
