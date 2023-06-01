import { ICalculatorController, ICalculatorModel } from '@modules/Calculator/interfaces/ICalculator';
import { CalculatorModelEvent } from '../calculator-model-event';
import { calculatorAPI } from '@modules/Calculator/api/CalculatorAPI';
import { AppError } from 'common/AppError/AppError';

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

    this.model.setHistory(historyResponse.data.items)
    this.model.setOperations(operationsResponse.data.items)
  }

  private async calculateExpression(expression: string): Promise<void> {
    const resultResponse = await this.handleApiRequest(() => calculatorAPI.calculateExpression(expression), 'resultLoading')

    this.model.setResult(resultResponse.data.result)
  }


  private async handleApiRequest<T extends (...args: any[]) => any>
    (apiFunction: T, loadingEvent = 'loadingData'): Promise<ReturnType<T>> {

    this.model.setLoadingData({
      loading: true,
      loadingEvent: loadingEvent
    })

    let result: ReturnType<T> | undefined

    try {
      result = await apiFunction()
    } catch (err) {
      const error = AppError.getErrorFrom(err)
      this.model.setError(error)
    }

    this.model.setLoadingData({
      loading: false,
      loadingEvent: loadingEvent
    })

    return result as ReturnType<T>
  }

}
