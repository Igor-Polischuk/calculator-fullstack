import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorModelEvent } from "../models/calculator-model-event";
import { IAppError } from "common/AppError/IAppError";
import { IHistoryFormat, IHistoryItem, IOperation, IOperationsData } from "./ICalculatorAPI";

export interface ILoadingData {
    loading: boolean
    loadingEvent: string
}

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number
    [CalculatorModelEvent.ExpressionChanged]: string
    [CalculatorModelEvent.ErrorChanged]: IAppError
    [CalculatorModelEvent.LoadingData]: boolean
    [CalculatorModelEvent.HistoryChanged]: IHistoryItem[]
    [CalculatorModelEvent.ButtonsDataChanged]: IOperationsData['items']
};

export interface ICalculatorModel extends IObserver<ModelAllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setError: (errors: IAppError) => void
    setLoading: (loading: boolean) => void
    setOperations: (operations: IOperation[]) => void
    setHistory: (history: IHistoryItem[]) => void
}

export interface ICalculatorView { }

export interface ICalculatorController { }
