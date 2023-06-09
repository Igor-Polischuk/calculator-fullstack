import { RestAPI } from "@utilities/api/RestAPI";

class LogApi extends RestAPI {
    constructor() {
        super({
            baseURL: process.env.LOG_API_URL!,
            defaultHeaders: {
                'Content-Type': 'application/json'
            }
        })
    }

    async sendLogs(message: string) {
        await this.makeRequest({
            method: 'POST',
            body: { message }
        })
    }
}

export const logApi = new LogApi()