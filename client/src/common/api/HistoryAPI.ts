import { ICalculatorResponse } from "@modules/Calculator/interfaces/ICalculatorAPI";
import { QueryParams } from "@utilities/QueryParams/QueryParams";
import { RestAPI } from "@utilities/api/RestAPI";
import { logger } from "@common/Logger/Logger";

import { IHistoryFormat } from "./IHistoryAPI";

class HistoryAPI extends RestAPI {
    constructor() {
        super({
            baseURL: process.env.HISTORY_API_URL!,
            defaultHeaders: {
                'Content-Type': 'application/json'
            }
        })

    }

    async getCalculationHistory(): Promise<ICalculatorResponse<IHistoryFormat>> {
        logger.log('info', `Send request for History operation`)

        const response = await this.makeRequest({
            endpoint: 'calculation',
            method: 'GET',
            queryParams: new QueryParams({ limit: 5 })
        }) as ICalculatorResponse<IHistoryFormat>

        return response
    }
}

export const historyAPI = new HistoryAPI()
