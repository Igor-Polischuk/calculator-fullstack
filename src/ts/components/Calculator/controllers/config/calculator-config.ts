import { Priority } from './priority';
import { ICalculatorConfig } from "@components/Calculator/types/ICalculator";
import { Operation } from "./Operation";
import { getFunctionRegWithParam, getNumberBetweenRegWithSymbol } from "../helpers/reg";


export const calculatorConfig: ICalculatorConfig = {
    '+': new Operation({
        operation: '+',
        priority: Priority.Low,
        reg: getNumberBetweenRegWithSymbol('+'),
        calculate: (a: number, b: number) => a + b
    }),
    '-': new Operation({
        operation: '-',
        priority: Priority.Low,
        reg: getNumberBetweenRegWithSymbol('-'),
        calculate: (a: number, b: number) => a - b
    }),
    '*': new Operation({
        operation: '*',
        priority: Priority.Medium,
        reg: getNumberBetweenRegWithSymbol('*'),
        calculate: (a: number, b: number) => a * b
    }),
    '/': new Operation({
        operation: '/',
        priority: Priority.Medium,
        reg: getNumberBetweenRegWithSymbol('/'),
        calculate: (a: number, b: number) => {
            return a / b
        }
    }),
    '^': new Operation({
        operation: '^',
        priority: Priority.Hight,
        reg: getNumberBetweenRegWithSymbol('^'),
        calculate: (a: number, b: number) => Math.pow(a, b)
    }),
    'sqrt': new Operation({
        operation: 'sqrt',
        priority: Priority.Hight,
        reg: getFunctionRegWithParam('sqrt'),
        calculate: (a: number) => {
            return Math.sqrt(a)
        }
    })
}


export const allowedActions = Object.keys(calculatorConfig)
export const searchAllowedOperationsRegStr = allowedActions.map(action => action.length === 1 ? `\\${action}` : action).join('|')