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
        const payload = {
            message: message
        };

        await this.makeRequest({
            method: 'POST',
            body: payload
        })
    }
}

export const logApi = new LogApi()