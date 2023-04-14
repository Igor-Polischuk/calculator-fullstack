import { IValidationError, ModelAllowedEvents, ICalculatorModel, IRuntimeError, IUnexpectedError, errorsType } from '../interfaces/ICalculator';
import { CalculatorModelEvent } from "../calculator-model-event";
import { Observer } from "@utilities/Observer/Observer";


export class CalculatorModel extends Observer<ModelAllowedEvents> implements ICalculatorModel {
    private result: number | null = null;
    private expression: string | null = null;
    private error: errorsType = [];

    setResult(res: number) {
        this.result = res
        this.error = []
        this.notifyAll(CalculatorModelEvent.ResultChanged, res)
    }

    setExpression(expression: string) {
        this.expression = expression
        this.error = []
        this.notifyAll(CalculatorModelEvent.ExpressionChanged, expression)
    }

    setError(errors: errorsType) {
        this.error = errors
        this.result = null
        this.notifyAll(CalculatorModelEvent.ErrorChanged, errors)
    }

    getExpression() {
        return this.expression
    }
}