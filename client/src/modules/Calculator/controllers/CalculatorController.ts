import { historyAPI } from '@common/api/HistoryAPI';
import { ICalculatorController, ICalculatorModel } from '@modules/Calculator/interfaces/ICalculator';
import { calculatorAPI } from '@modules/Calculator/api/CalculatorAPI';

import { CalculatorModelEvent } from '../models/calculator-model-event';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel

  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))
    this.loadData()
  }

  private async loadData() {
    const getHistory = this.model.getLoadingHandledFunction(historyAPI.getCalculationHistory.bind(historyAPI), CalculatorModelEvent.BaseDataLoadingChanged)
    const getOperations = this.model.getLoadingHandledFunction(calculatorAPI.getOperations.bind(calculatorAPI), CalculatorModelEvent.BaseDataLoadingChanged)

    const historyResponse = await getHistory()
    const operationsResponse = await getOperations()

    if (historyResponse && operationsResponse) {
      this.model.setHistory([])
      this.model.setOperations(operationsResponse.data.items)
    }
  }

  private async calculateExpression(expression: string): Promise<void> {
    const calculateExpression = this.model.getLoadingHandledFunction(calculatorAPI.calculateExpression.bind(calculatorAPI), CalculatorModelEvent.ResultLoadingChanged)
    const resultResponse = await calculateExpression(expression)

    if (resultResponse) {
      this.model.setResult(resultResponse.data.result)
    }
  }
}