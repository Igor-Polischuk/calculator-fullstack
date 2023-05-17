import { cacheRequest } from "@utilities/decorators/cacheRequest";
import { RestAPI } from "@utilities/api/RestAPI";
import { ApiEndpoint, ICalculationData, ICalculatorResponse, IHistoryFormat, IOperationsData } from "../interfaces/ICalculatorAPI";

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
            method: 'POST',
            body: { expression }
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
            method: 'GET'
        })

        return response.data
    }

    async getHistory(): Promise<IHistoryFormat[]> {
        const response = await this.makeRequest<ICalculatorResponse<{ history: IHistoryFormat[] }>>({
            endpoint: ApiEndpoint.History,
            method: 'GET'
        })

        return response.data.history
    }
}

export const calculatorAPI = CalculatorAPI.getInstance()
