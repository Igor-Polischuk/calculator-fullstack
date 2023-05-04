import { AppError } from "errors/AppError"
import { makeRequest } from "./makeRequest"

export enum ApiEndpoint {
    Calculate = 'calculate',
    Operations = 'operations',
    History = 'history'
}


type ICalculatorResponse<DataType> = {
    success: boolean;
    status: number;
    error: AppError;
    data: DataType;
};

type ICalculationData = {
    result: number;
    expression: string;
};

export type IOperationsData = {
    operation: string;
    operationSymbol: string;
};

export type IHistoryFormat = {
    expression: string;
    result: number;
};

class CalculatorAPI {
    private static instance: CalculatorAPI;
    private baseURL = 'http://localhost:3000/api/calculator/'

    static getInstance(): CalculatorAPI {
        if (!CalculatorAPI.instance) {
            CalculatorAPI.instance = new CalculatorAPI();
        }

        return CalculatorAPI.instance;
    }

    async calculateExpression(expression: string): Promise<number> {
        const url = `${this.baseURL}${ApiEndpoint.Calculate}`
        const response = await makeRequest<ICalculatorResponse<ICalculationData>>(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression })
        })

        if (!response.success) {
            throw response.error
        }

        return response.data.result
    }

    async getOperations(): Promise<IOperationsData[]> {
        const url = `${this.baseURL}${ApiEndpoint.Operations}`
        const response = await makeRequest<ICalculatorResponse<IOperationsData[]>>(url)

        return response.data
    }

    async getHistory(): Promise<IHistoryFormat[]> {
        const url = `${this.baseURL}${ApiEndpoint.History}`
        const response = await makeRequest<ICalculatorResponse<{ history: IHistoryFormat[] }>>(url)

        return response.data.history
    }
}

export const calculatorAPI = CalculatorAPI.getInstance()
