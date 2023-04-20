import { Priority } from './priority';
import { calculatorConfig } from './calculator-config';
import { Constant, MathFunction } from './operation/Operation';

export { calculatorConfig, Priority }

export const allowedActions = Object.keys(calculatorConfig)

export const searchAllowedOperationsRegStr = allowedActions
    .map(action => action.length === 1 ? `\\${action}` : action)
    .join('|')

export const constantReg = allowedActions
    .flatMap(operation => calculatorConfig[operation] instanceof Constant ? operation : [])
    .join('.')

export const functionReg = allowedActions
    .flatMap(operation => calculatorConfig[operation] instanceof MathFunction ? operation : [])
    .join('|')