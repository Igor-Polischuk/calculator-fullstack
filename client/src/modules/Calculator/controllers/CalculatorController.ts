import { ICalculatorController, ICalculatorModel, ISetAsyncDataParams, ModelAllowedEvents } from '@modules/Calculator/interfaces/ICalculator';
import { CalculatorModelEvent } from '../calculator-model-event';
import { calculatorAPI } from 'api/CalculatorAPI';
import { AppError } from 'errors/AppError';

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel

  private eventSetterMap

  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))

    this.setAsyncData({
      [CalculatorModelEvent.HistoryChanged]: () => calculatorAPI.getHistory(),
      [CalculatorModelEvent.ButtonsDataChanged]: () => calculatorAPI.getOperations()
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
      [CalculatorModelEvent.ResultChanged]: () => calculatorAPI.calculateExpression(expression)
    })
  }

  async setAsyncData(params: Partial<ISetAsyncDataParams<ModelAllowedEvents>>): Promise<void> {
    const loadingEvents = (Object.keys(params) as (CalculatorModelEvent)[])
    this.model.setLoadingData({
      loading: true,
      loadingEvents
    })

    for (const [event, fetchCallback] of Object.entries(params) as [CalculatorModelEvent, () => Promise<ModelAllowedEvents[CalculatorModelEvent]>][]) {
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
