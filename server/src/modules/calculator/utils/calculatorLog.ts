import { createLogger } from '@utils/createLogger';

export const calculatorLog = createLogger({
    loggerLevels: ['info', 'warn'],
    loggerName: 'calculator'
})