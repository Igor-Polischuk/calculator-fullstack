import { AppError } from "errors/AppError"
import { RestAPI } from "./RestAPI";

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

class CalculatorAPI extends RestAPI<ApiEndpoint> {
    private static instance: CalculatorAPI;

    constructor() {
        super({
            baseURL: 'http://localhost:3000/api/calculator/'
        })
    }

    static getInstance(): CalculatorAPI {
        if (!CalculatorAPI.instance) {
            CalculatorAPI.instance = new CalculatorAPI();
        }

        return CalculatorAPI.instance;
    }

    async calculateExpression(expression: string): Promise<number> {
        const response = await this.post<ICalculatorResponse<ICalculationData>>({
            endpoint: ApiEndpoint.Calculate,
            body: JSON.stringify({ expression })
        })

        if (!response.success) {
            throw response.error
        }

        return response.data.result
    }

    async getOperations(): Promise<IOperationsData[]> {
        const response = await this.get<ICalculatorResponse<IOperationsData[]>>({
            endpoint: ApiEndpoint.Operations
        })

        return response.data
    }

    async getHistory(): Promise<IHistoryFormat[]> {
        const response = await this.get<ICalculatorResponse<{ history: IHistoryFormat[] }>>({
            endpoint: ApiEndpoint.History
        })

        return response.data.history
    }
}

export const calculatorAPI = CalculatorAPI.getInstance()
