import { AppError } from "errors/AppError";

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

export type IOperationsData = {
    operation: string;
    operationSymbol: string;
};

export type IHistoryItem = {
    expression: string;
    result: number;
}

export type IHistoryFormat = {
    items: IHistoryItem[],
    total: number
};