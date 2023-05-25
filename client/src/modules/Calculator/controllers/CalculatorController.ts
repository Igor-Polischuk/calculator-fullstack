import { ICalculatorController, ICalculatorModel } from '@modules/Calculator/interfaces/ICalculator';
import { CalculatorModelEvent } from '../calculator-model-event';
import { calculatorAPI } from '@modules/Calculator/api/CalculatorAPI';
import { DataLoadingService } from '@utilities/DataLoadingService';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel
  private dataLoadingService: DataLoadingService

  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))

    this.dataLoadingService = new DataLoadingService({
      changeErrorStateFunction: model.setError.bind(model),
      loadingStateFunction: model.setLoadingData.bind(model),
      defaultLoadingEvent: 'loadingData'
    })

    this.dataLoadingService.setAsyncData({
      callbacks: [this.loadHistory.bind(this), this.loadOperation.bind(this)]
    })
  }

  private async loadHistory() {
    const response = await calculatorAPI.getHistory()
    const historyList = response.data.items

    this.model.setHistory(historyList)
  }

  private async loadOperation() {
    const response = await calculatorAPI.getOperations()
    const operationList = response.data.items

    this.model.setOperations(operationList)
  }

  private async calculateExpression(expression: string): Promise<void> {
    this.dataLoadingService.setAsyncData({
      callbacks: [async () => {
        const resultResponse = await calculatorAPI.calculateExpression(expression)
        const result = resultResponse.data.result

        this.model.setResult(result)
      }],
      loadingEvent: 'resultLoading'
    })
  }
}
