import { cacheRequest } from "@utilities/decorators/cacheRequest";
import { RestAPI } from "@utilities/api/RestAPI";
import { QueryParams } from "@utilities/QueryParams/QueryParams";

import { ICalculationData, ICalculatorResponse, IHistoryFormat, IOperationsData } from "../interfaces/ICalculatorAPI";

class CalculatorAPI extends RestAPI {
    private static instance: CalculatorAPI;

    constructor() {
        super({
            baseURL: process.env.CALCULATOR_API_URL!,
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

    // @cacheRequest({
    //     ttl: 1000 * 60 * 60 * 60 * 72
    // })
    async calculateExpression(expression: string): Promise<ICalculatorResponse<ICalculationData>> {
        const response = await this.makeRequest({
            endpoint: 'calculate',
            method: 'POST',
            body: { expression }
        }) as ICalculatorResponse<ICalculationData>

        if (!response.success) {
            throw response.error
        }

        return response
    }

    @cacheRequest({
        ttl: 1000 * 60 * 60 * 60 * 72
    })
    async getOperations(): Promise<ICalculatorResponse<IOperationsData>> {
        const response = await this.makeRequest({
            endpoint: 'operations',
            method: 'GET'
        }) as ICalculatorResponse<IOperationsData>

        return response
    }

    async getHistory(): Promise<ICalculatorResponse<IHistoryFormat>> {
        const response = await this.makeRequest({
            endpoint: 'history',
            method: 'GET',
            queryParams: new QueryParams({ limit: 5 })
        }) as ICalculatorResponse<IHistoryFormat>

        return response
    }
}

export const calculatorAPI = CalculatorAPI.getInstance()
