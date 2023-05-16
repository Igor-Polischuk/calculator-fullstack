import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorModelEvent } from "../calculator-model-event";
import { IAppError } from "errors/AppError";
import { IHistoryFormat, IOperationsData } from "./ICalculatorAPI";

export interface ILoadingData {
    loading: boolean
    loadingEvents: (CalculatorModelEvent)[]
}

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number
    [CalculatorModelEvent.ExpressionChanged]: string
    [CalculatorModelEvent.ErrorChanged]: IAppError
    [CalculatorModelEvent.LoadingData]: ILoadingData
    [CalculatorModelEvent.HistoryChanged]: IHistoryFormat[]
    [CalculatorModelEvent.ButtonsDataChanged]: IOperationsData[]
};

export type ISetAsyncDataParams<T extends ModelAllowedEvents> = {
    [K in keyof T]?: () => Promise<T[K]>
}

export interface ICalculatorModel extends IObserver<ModelAllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setError: (errors: IAppError) => void
    setLoadingData: (loading: ILoadingData) => void
    setOperations: (operations: IOperationsData[]) => void
    setHistory: (history: IHistoryFormat[]) => void
}

export interface ICalculatorView { }

export interface ICalculatorController { }
