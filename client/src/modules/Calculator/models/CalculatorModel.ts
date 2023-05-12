import { ModelAllowedEvents, ICalculatorModel, } from '../interfaces/ICalculator';
import { CalculatorModelEvent } from "../calculator-model-event";
import { Observer } from "@utilities/Observer/Observer";
import { IAppError } from 'errors/AppError';
import { IHistoryFormat, IOperationsData } from 'api/CalculatorAPI';

type ISetAsyncDataParams = Record<CalculatorModelEvent, () => Promise<ModelAllowedEvents[CalculatorModelEvent]>>

export class CalculatorModel extends Observer<ModelAllowedEvents> implements ICalculatorModel {
    private result: number | null = null
    private expression: string | null = null
    private error: IAppError | null = null
    private isFetchingResult: boolean = false
    private loadingData: boolean = true
    private history: IHistoryFormat[] = []
    private buttons: IOperationsData[] = []

    private eventSetterMap = {
        [CalculatorModelEvent.ExpressionChanged]: this.setExpression,
        [CalculatorModelEvent.ResultChanged]: this.setResult,
        [CalculatorModelEvent.ErrorChanged]: this.setError,
        [CalculatorModelEvent.FetchedResult]: this.setFetchingResult,
        [CalculatorModelEvent.LoadingData]: this.setLoadingData,
        [CalculatorModelEvent.ButtonsDataChanged]: this.setOperations,
        [CalculatorModelEvent.HistoryChanged]: this.setHistory,
    };

    async setAsyncData(params: Partial<ISetAsyncDataParams>): Promise<void> {
        this.setLoadingData(true)
        for (const [event, fetchCallback] of Object.entries(params) as [CalculatorModelEvent, () => Promise<ModelAllowedEvents[CalculatorModelEvent]>][]) {
            const data = await fetchCallback();
            const setterMethod = this.eventSetterMap[event];

            if (setterMethod) {
                setterMethod.call(this, data as never)
            }
        }
        this.setLoadingData(false)
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

    setFetchingResult(loading: boolean): void {
        this.isFetchingResult = loading
        this.notifyAll(CalculatorModelEvent.FetchedResult, loading)
    }

    setLoadingData(loading: boolean): void {
        this.loadingData = loading
        this.notifyAll(CalculatorModelEvent.LoadingData, loading)
    }

    setOperations(operations: IOperationsData[]): void {
        this.buttons = operations
        this.notifyAll(CalculatorModelEvent.ButtonsDataChanged, operations)
    }

    setHistory(history: IHistoryFormat[]): void {
        this.history = history
        this.notifyAll(CalculatorModelEvent.HistoryChanged, history)
    }
}