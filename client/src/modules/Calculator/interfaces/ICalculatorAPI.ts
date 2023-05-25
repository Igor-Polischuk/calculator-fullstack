import { AppError } from "common/AppError/AppError";

export type ICalculatorResponse<DataType> = {
    success: boolean;
    status: number;
    error: AppError;
    data: DataType;
};

export type ICalculationData = {
    result: number;
    expression: string;
};

export interface IOperation {
    operation: string;
    operationSymbol: string;
}

export type IOperationsData = {
    items: IOperation[]
    total: number
};

export type IHistoryItem = {
    expression: string;
    result: number;
}

export type IHistoryFormat = {
    items: IHistoryItem[],
    total: number
};