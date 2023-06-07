import { AppError } from "@common/AppError/AppError"
import { logApi } from "./LogApi"

type LogLevel = 'info' | 'warn' | 'error'

interface ILogger {
    addLog: (level: LogLevel, message: string, meta?: any) => void
}

class Logger implements ILogger {
    private logs: string[]
    private maxLogCount = 10
    private logSendingTome = 1000 * 120

    constructor() {
        this.logs = this.getLogs()
        this.sendByTime()
    }

    addLog(level: LogLevel, message: string, meta?: any): void {
        const timestamp = new Date().toISOString();
        const log = `[${timestamp}] ${level} => ${message} ${meta ? JSON.stringify(meta) : ''}`

        this.logs = [...this.logs, log]

        localStorage.setItem('logs', JSON.stringify(this.logs))

        if (this.logs.length >= this.maxLogCount || level === 'error') {
            this.sendLogs()
        }
    }

    private getLogs(): string[] {
        return JSON.parse(localStorage.getItem("logs") || "[]")
    }

    private sendLogs() {
        const logs = this.logs.join('\n')

        logApi.sendLogs(logs)

        localStorage.setItem('logs', JSON.stringify([]))
        this.logs = this.getLogs()
    }

    private sendByTime() {
        setInterval(() => {
            if (this.logs.length === 0) {
                return
            }

            this.sendLogs()
        }, this.logSendingTome)
    }

}

export const logger = new Logger()