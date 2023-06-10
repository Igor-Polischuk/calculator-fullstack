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
    const getHistory = this.handleRequestWithLoading(calculatorAPI.getHistory.bind(calculatorAPI))
    const getOperations = this.handleRequestWithLoading(calculatorAPI.getOperations.bind(calculatorAPI))

    const historyResponse = await getHistory()
    const operationsResponse = await getOperations()

    if (historyResponse && operationsResponse) {
      this.model.setHistory(historyResponse.data.items)
      this.model.setOperations(operationsResponse.data.items)
    }
  }

  private async calculateExpression(expression: string): Promise<void> {
    const calculateExpression = this.handleRequestWithLoading(calculatorAPI.calculateExpression.bind(calculatorAPI))
    const resultResponse = await calculateExpression(expression)

    if (resultResponse) {
      this.model.setResult(resultResponse.data.result)
    }
  }


  private handleRequestWithLoading<T extends (...args: any[]) => any>(apiFunction: T) {
    return async (...args: Parameters<T>) => {
      try {
        this.model.setLoading(true)
        const result = await apiFunction(...args)

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
}