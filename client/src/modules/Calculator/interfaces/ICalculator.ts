import { CalculatorModelEvent } from "../models/calculator-model-event";
import { IAppError } from "common/AppError/IAppError";
import { IHistoryItem, IOperation, IOperationsData } from "./ICalculatorAPI";
import { IAsyncModel } from "@utilities/AsyncModel/IAsyncModel";

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number
    [CalculatorModelEvent.ExpressionChanged]: string
    [CalculatorModelEvent.HistoryChanged]: IHistoryItem[]
    [CalculatorModelEvent.ButtonsDataChanged]: IOperationsData['items']
};

export interface ICalculatorModel extends IAsyncModel<ModelAllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setOperations: (operations: IOperation[]) => void
    setHistory: (history: IHistoryItem[]) => void
}

export interface ICalculatorView { }

export interface ICalculatorController { }
