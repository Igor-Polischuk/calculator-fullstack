import { ModelAllowedEvents, ICalculatorModel, } from '../interfaces/ICalculator';
import { CalculatorModelEvent } from "../calculator-model-event";
import { Observer } from "@utilities/Observer/Observer";
import { IAppError } from 'errors/AppError';


export class CalculatorModel extends Observer<ModelAllowedEvents> implements ICalculatorModel {
    private result: number | null = null
    private expression: string | null = null
    private error: IAppError | null = null

    setResult(res: number): void {
        this.result = res
        this.error = null
        this.notifyAll(CalculatorModelEvent.ResultChanged, res)
    }

    setExpression(expression: string): void {
        this.expression = expression
        this.error = null
        this.notifyAll(CalculatorModelEvent.ExpressionChanged, expression)
    }

    setError(errors: IAppError): void {
        this.error = errors
        this.result = null
        this.notifyAll(CalculatorModelEvent.ErrorChanged, errors)
    }
}