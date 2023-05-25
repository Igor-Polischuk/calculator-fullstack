import { ModelAllowedEvents, ICalculatorModel, ILoadingData } from '../interfaces/ICalculator';
import { CalculatorModelEvent } from "../calculator-model-event";
import { Observer } from "@utilities/Observer/Observer";
import { IAppError } from 'common/AppError/AppError';
import { IHistoryFormat, IHistoryItem, IOperation, IOperationsData } from '../interfaces/ICalculatorAPI';

export class CalculatorModel extends Observer<ModelAllowedEvents> implements ICalculatorModel {
    private result: number | null = null
    private expression: string | null = null
    private error: IAppError | null = null
    private loadingData: ILoadingData = { loading: false, loadingEvent: '' }
    private history: IHistoryItem[] = []
    private buttons: IOperation[] = []

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

    setLoadingData(loading: ILoadingData): void {
        this.loadingData = loading
        this.notifyAll(CalculatorModelEvent.LoadingData, loading)
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