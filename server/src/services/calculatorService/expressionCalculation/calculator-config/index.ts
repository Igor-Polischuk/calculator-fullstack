import { Priority } from './priority';
import { calculatorConfig } from './calculator-config';
import { OperationType } from './operation/IOperations';

export { calculatorConfig, Priority }

export const allowedActions = Object.keys(calculatorConfig)

export const searchAllowedOperationsRegStr = allowedActions
    .map(action => action.length === 1 ? `\\${action}` : action)
    .join('|')

export const constantReg = allowedActions
    .flatMap(operation => calculatorConfig[operation].type === OperationType.Constant ? operation : [])
    .join('.')

export const functionReg = allowedActions
    .flatMap(operation => calculatorConfig[operation].type === OperationType.MathFunction ? operation : [])
    .join('|')