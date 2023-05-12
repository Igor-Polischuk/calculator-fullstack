import { ModelAllowedEvents, ICalculatorModel, ILoadingData, ISetAsyncDataParams, } from '../interfaces/ICalculator';
import { CalculatorModelEvent } from "../calculator-model-event";
import { Observer } from "@utilities/Observer/Observer";
import { AppError, IAppError } from 'errors/AppError';
import { IHistoryFormat, IOperationsData } from 'api/CalculatorAPI';

export class CalculatorModel extends Observer<ModelAllowedEvents> implements ICalculatorModel {
    private result: number | null = null
    private expression: string | null = null
    private error: IAppError | null = null
    private loadingData: ILoadingData = { loading: false, loadingEvents: [] }
    private history: IHistoryFormat[] = []
    private buttons: IOperationsData[] = []

    private eventSetterMap = {
        [CalculatorModelEvent.ExpressionChanged]: this.setExpression,
        [CalculatorModelEvent.ResultChanged]: this.setResult,
        [CalculatorModelEvent.ErrorChanged]: this.setError,
        [CalculatorModelEvent.LoadingData]: this.setLoadingData,
        [CalculatorModelEvent.ButtonsDataChanged]: this.setOperations,
        [CalculatorModelEvent.HistoryChanged]: this.setHistory,
    };

    async setAsyncData(params: Partial<ISetAsyncDataParams<ModelAllowedEvents>>): Promise<void> {
        const loadingEvents = (Object.keys(params) as (CalculatorModelEvent)[])
        this.setLoadingData({
            loading: true,
            loadingEvents
        })

        for (const [event, fetchCallback] of Object.entries(params) as [CalculatorModelEvent, () => Promise<ModelAllowedEvents[CalculatorModelEvent]>][]) {
            try {
                const data = await fetchCallback();
                const setterMethod = this.eventSetterMap[event]
                setterMethod.call(this, data as never)

            } catch (error: any) {
                const appError = AppError.getErrorFrom(error)
                this.setError(appError as AppError)
            }

            const a = {
                loading: true,
                events: Object.keys(params)
            }
        }
        this.setLoadingData({
            loading: false,
            loadingEvents
        })
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

    setLoadingData(loading: ILoadingData): void {
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