import { ModelAllowedEvents, ICalculatorModel, } from '../interfaces/ICalculator';
import { CalculatorModelEvent } from "../calculator-model-event";
import { Observer } from "@utilities/Observer/Observer";
import { IAppError } from 'errors/AppError';
import { IHistoryFormat, IOperationsData } from 'api/CalculatorAPI';


export class CalculatorModel extends Observer<ModelAllowedEvents> implements ICalculatorModel {
    private result: number | null = null
    private expression: string | null = null
    private error: IAppError | null = null
    private isFetchingResult: boolean = false
    private loadingData: boolean = true
    private history: IHistoryFormat[] = []
    private operations: IOperationsData[] = []

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

    setFetchingResult(loading: boolean): void {
        this.isFetchingResult = loading
        this.notifyAll(CalculatorModelEvent.FetchedResult, loading)
    }

    setLoadingData(loading: boolean): void {
        this.loadingData = loading
        this.notifyAll(CalculatorModelEvent.LoadingData, loading)
    }

    setOperations(operations: IOperationsData[]): void {
        this.operations = operations
        this.notifyAll(CalculatorModelEvent.OperationsChanged, operations)
    }

    setHistory(history: IHistoryFormat[]): void {
        this.history = history
        this.notifyAll(CalculatorModelEvent.HistoryChanged, history)
    }
}