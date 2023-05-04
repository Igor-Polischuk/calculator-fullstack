import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorModelEvent } from "../calculator-model-event";
import { IAppError } from "errors/AppError";
import { IHistoryFormat, IOperationsData } from "api/CalculatorAPI";
import { IButtonData } from "../models/buttonsData/generate-buttons-data";

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number
    [CalculatorModelEvent.ExpressionChanged]: string
    [CalculatorModelEvent.ErrorChanged]: IAppError
    [CalculatorModelEvent.FetchedResult]: boolean
    [CalculatorModelEvent.LoadingData]: boolean
    [CalculatorModelEvent.HistoryChanged]: IHistoryFormat[]
    [CalculatorModelEvent.ButtonsDataGenerated]: IButtonData[]
};

export interface ICalculatorModel extends IObserver<ModelAllowedEvents> {
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
