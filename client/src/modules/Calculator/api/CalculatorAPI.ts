import { cacheRequest } from "@utilities/decorators/cacheRequest";
import { RestAPI } from "@utilities/api/RestAPI";
import { QueryParams } from "@utilities/QueryParams/QueryParams";
import { logger } from "@common/Logger/Logger";

import {
    ICalculationData,
    ICalculatorResponse,
    IHistoryFormat,
    IOperationsData
} from "../interfaces/ICalculatorAPI";

class CalculatorAPI extends RestAPI {
    constructor() {
        super({
            baseURL: process.env.CALCULATOR_API_URL!,
            defaultHeaders: {
                'Content-Type': 'application/json'
            }
        })
    }

    @cacheRequest({
        ttl: 1000 * 60 * 60 * 60 * 72
    })
    async calculateExpression(expression: string): Promise<ICalculatorResponse<ICalculationData>> {
        logger.addLog('info', `Send request for calculate: ${expression}`)

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
        logger.addLog('info', `Send request for getting operation`)

        const response = await this.makeRequest({
            endpoint: 'operations',
            method: 'GET'
        }) as ICalculatorResponse<IOperationsData>

        return response
    }

    async getHistory(): Promise<ICalculatorResponse<IHistoryFormat>> {
        logger.addLog('info', `Send request for History operation`)

        const response = await this.makeRequest({
            endpoint: 'history',
            method: 'GET',
            queryParams: new QueryParams({ limit: 5 })
        }) as ICalculatorResponse<IHistoryFormat>

        return response
    }
}

export const calculatorAPI = new CalculatorAPI()
