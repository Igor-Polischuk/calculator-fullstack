import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorModelEvent } from "../calculator-model-event";
import { IAppError } from "errors/AppError";
import { IHistoryFormat, IOperationsData } from "api/CalculatorAPI";

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number
    [CalculatorModelEvent.ExpressionChanged]: string
    [CalculatorModelEvent.ErrorChanged]: IAppError
    [CalculatorModelEvent.FetchedResult]: boolean
    [CalculatorModelEvent.LoadingData]: boolean
    [CalculatorModelEvent.HistoryChanged]: IHistoryFormat[]
    [CalculatorModelEvent.ButtonsDataGenerated]: IOperationsData[]
};

type ISetAsyncDataParams = Record<CalculatorModelEvent, () => Promise<ModelAllowedEvents[CalculatorModelEvent]>>

export interface ICalculatorModel extends IObserver<ModelAllowedEvents> {
    setAsyncData(params: Partial<ISetAsyncDataParams>): void
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setError: (errors: IAppError) => void
    setFetchingResult: (loading: boolean) => void
    setLoadingData: (loading: boolean) => void
    setOperations: (operations: IOperationsData[]) => void
    setHistory: (history: IHistoryFormat[]) => void
}

export interface ICalculatorView { }

export interface ICalculatorController { }
