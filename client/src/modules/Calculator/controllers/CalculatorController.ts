import { ICalculatorController, ICalculatorModel } from '@modules/Calculator/interfaces/ICalculator';
import { calculatorAPI } from '@modules/Calculator/api/CalculatorAPI';
import { LoadingRequestHandler } from '@utilities/LoadingRequestHandler';

import { CalculatorModelEvent } from '../models/calculator-model-event';

export class CalculatorController extends LoadingRequestHandler implements ICalculatorController {
  private model: ICalculatorModel

  constructor(model: ICalculatorModel) {
    super({
      loadingSetter: model.setLoading.bind(model),
      errorHandler: model.setError.bind(model)
    })

    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))
    this.loadData()
  }

  private async loadData() {
    const getHistory = this.getLoadingHandledFunction(calculatorAPI.getHistory.bind(calculatorAPI))
    const getOperations = this.getLoadingHandledFunction(calculatorAPI.getOperations.bind(calculatorAPI))

    const historyResponse = await getHistory()
    const operationsResponse = await getOperations()

    if (historyResponse && operationsResponse) {
      this.model.setHistory(historyResponse.data.items)
      this.model.setOperations(operationsResponse.data.items)
    }
  }

  private async calculateExpression(expression: string): Promise<void> {
    const calculateExpression = this.getLoadingHandledFunction(calculatorAPI.calculateExpression.bind(calculatorAPI))
    const resultResponse = await calculateExpression(expression)

    if (resultResponse) {
      this.model.setResult(resultResponse.data.result)
    }
  }
}