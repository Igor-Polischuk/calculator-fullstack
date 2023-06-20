import { AppError } from "@common/AppError/AppError"
import { logApi } from "./LogApi"

type LogLevel = 'info' | 'warn' | 'error'

interface ILogger {
    log: (level: LogLevel, message: string, meta?: any) => void
}

class Logger implements ILogger {
    private logs: string[]
    private maxLogCount = Number(process.env.MAX_SAVING_LOG)
    private logSendingTime = Number(process.env.TIME_TO_SEND_LOG)

    constructor() {
        this.logs = this.getLogs()
        this.sendByTime()
    }

    log(level: LogLevel, message: string, meta?: any): void {
        const log = this.createLogText(level, message, meta)

        this.saveLog(log)

        if (this.shouldSendLogs(level)) {
            this.sendLogs()
        }
    }

    private createLogText(level: LogLevel, message: string, meta?: any): string {
        const timestamp = new Date().toISOString();
        const log = `[${timestamp}] ${level} => ${message} ${meta ? JSON.stringify(meta) : ''}`

        return log
    }

    private getLogs(): string[] {
        return JSON.parse(localStorage.getItem("logs") || "[]")
    }

    private saveLog(log: string): void {
        this.logs = [...this.logs, log];
        localStorage.setItem('logs', JSON.stringify(this.logs));
    }

    private shouldSendLogs(level: LogLevel): boolean {
        return this.logs.length >= this.maxLogCount || level === 'error';
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
        }, this.logSendingTime)
    }

}

export const logger = new Logger()