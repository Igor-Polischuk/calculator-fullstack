import { cacheRequest } from "@utilities/decorators/cacheRequest";
import { RestAPI } from "@utilities/api/RestAPI";
import { logger } from "@common/Logger/Logger";

import {
    ICalculationData,
    ICalculatorResponse,
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
        logger.log('info', `Send request for calculate: ${expression}`)

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
        logger.log('info', `Send request for getting operation`)

        const response = await this.makeRequest({
            endpoint: 'operations',
            method: 'GET'
        }) as ICalculatorResponse<IOperationsData>

        return response
    }
}

export const calculatorAPI = new CalculatorAPI()
