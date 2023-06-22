import { IAppError } from '@common/AppError/IAppError';

import { CalculatorModelEvent } from "./calculator-model-event";
import { IHistoryItem, IOperation } from '../interfaces/ICalculatorAPI';
import { ModelAllowedEvents, ICalculatorModel } from '../interfaces/ICalculator';
import { AsyncModel } from '@utilities/AsyncModel';

export class CalculatorModel extends AsyncModel<ModelAllowedEvents> implements ICalculatorModel {
    private result: number | null = null
    private expression: string | null = null
    private history: IHistoryItem[] = []
    private buttons: IOperation[] = []

    constructor() {
        super([CalculatorModelEvent.ResultLoadingChanged, CalculatorModelEvent.BaseDataLoadingChanged])
    }

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

    setOperations(operations: IOperation[]): void {
        this.buttons = operations
        this.notifyAll(CalculatorModelEvent.ButtonsDataChanged, operations)
    }

    setHistory(history: IHistoryItem[]): void {
        this.history = history
        this.notifyAll(CalculatorModelEvent.HistoryChanged, history)
    }
}