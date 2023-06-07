import winston from "winston";
import { getLoggerConfig } from "./configs/logger-config";

export const logger = winston.createLogger(getLoggerConfig('server'))

