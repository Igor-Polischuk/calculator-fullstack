import { ICalculatorController, ICalculatorModel, ISetAsyncDataParams, ModelAllowedEvents } from '@modules/Calculator/interfaces/ICalculator';
import { CalculatorModelEvent } from '../calculator-model-event';
import { calculatorAPI } from '@modules/Calculator/api/CalculatorAPI';
import { AppError } from 'common/AppError/AppError';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel
  private eventSetterMap

  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))

    this.setAsyncData({
      [CalculatorModelEvent.HistoryChanged]: async () => (await calculatorAPI.getHistory()).data.items,
      [CalculatorModelEvent.ButtonsDataChanged]: async () => (await calculatorAPI.getOperations()).data.items
    })

    this.eventSetterMap = {
      [CalculatorModelEvent.ExpressionChanged]: this.model.setExpression,
      [CalculatorModelEvent.ResultChanged]: this.model.setResult,
      [CalculatorModelEvent.ErrorChanged]: this.model.setError,
      [CalculatorModelEvent.LoadingData]: this.model.setLoadingData,
      [CalculatorModelEvent.ButtonsDataChanged]: this.model.setOperations,
      [CalculatorModelEvent.HistoryChanged]: this.model.setHistory,
    };
  }

  private async calculateExpression(expression: string): Promise<void> {
    this.setAsyncData({
      [CalculatorModelEvent.ResultChanged]: async () => (await calculatorAPI.calculateExpression(expression)).data.result
    })
  }

  async setAsyncData(params: Partial<ISetAsyncDataParams<ModelAllowedEvents>>): Promise<void> {
    const loadingEvents = (Object.keys(params) as (CalculatorModelEvent)[])
    this.model.setLoadingData({
      loading: true,
      loadingEvents
    })

    for (const [event, fetchCallback] of Object.entries(params) as
      [CalculatorModelEvent, () => Promise<ModelAllowedEvents[CalculatorModelEvent]>][]) {
      try {
        const data = await fetchCallback();
        const setterMethod = this.eventSetterMap[event]

        setterMethod.call(this.model, data as never)

      } catch (error: any) {
        const appError = AppError.getErrorFrom(error)
        this.model.setError(appError as AppError)
      }
    }
    this.model.setLoadingData({
      loading: false,
      loadingEvents
    })
  }
}
