import { callCalculatorApi } from 'api/callCalculatorApi';
import { ICalculatorController, ICalculatorModel } from '@modules/Calculator/interfaces/ICalculator';
import { CalculatorModelEvent } from '../calculator-model-event';
import { AppError } from 'errors/AppError';
import { formatExpression } from '@utilities/formatText/formatExpression';
import { QueryParams } from '@utilities/QueryParams/QueryParams';
import { ApiEndpoint } from 'api/api-endpoint';

interface ICalculationData {
  result: number
  expression: string
}

export class CalculatorController implements ICalculatorController {
  private model: ICalculatorModel
  constructor(model: ICalculatorModel) {
    this.model = model
    this.model.subscribe(CalculatorModelEvent.ExpressionChanged, this.calculateExpression.bind(this))
  }

  private async calculateExpression(expression: string): Promise<void> {
    const formattedExpression = formatExpression(expression)
    this.model.setLoading(true)

    try {
      const response = await callCalculatorApi<ICalculationData>({
        endpoint: ApiEndpoint.ResultOf,
        searchParams: new QueryParams({
          expression: formattedExpression
        })
      })

      const result = response.data.result
      this.model.setResult(result)

    } catch (error: any) {
      const appError = AppError.getErrorFrom(error)
      this.model.setError(appError as AppError)
    }

    this.model.setLoading(false)
  }
}
