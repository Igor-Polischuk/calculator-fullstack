import { AppError } from "errors/AppError"
import { RestAPI } from "./RestAPI";
import { cacheRequest } from "api/decorators/cacheRequest";

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
            baseURL: 'http://localhost:3000/api/calculator/',
            defaultHeaders: {
                'Content-Type': 'application/json'
            }
        })
    }

    static getInstance(): CalculatorAPI {
        if (!CalculatorAPI.instance) {
            CalculatorAPI.instance = new CalculatorAPI();
        }

        return CalculatorAPI.instance;
    }

    @cacheRequest({
        ttl: 1000 * 60 * 60 * 60 * 72
    })
    async calculateExpression(expression: string): Promise<number> {
        const response = await this.makeRequest<ICalculatorResponse<ICalculationData>>({
            endpoint: ApiEndpoint.Calculate,
            requestOptions: {
                method: 'POST',
                body: { expression }
            }
        })

        if (!response.success) {
            throw response.error
        }

        return response.data.result
    }

    @cacheRequest({
        ttl: 1000 * 60 * 60 * 60 * 72
    })
    async getOperations(): Promise<IOperationsData[]> {
        const response = await this.makeRequest<ICalculatorResponse<IOperationsData[]>>({
            endpoint: ApiEndpoint.Operations,
        })

        return response.data
    }

    async getHistory(): Promise<IHistoryFormat[]> {
        const response = await this.makeRequest<ICalculatorResponse<{ history: IHistoryFormat[] }>>({
            endpoint: ApiEndpoint.History
        })

        return response.data.history
    }
}

export const calculatorAPI = CalculatorAPI.getInstance()
