import { Priority } from './priority';
import { ICalculatorConfig } from "@components/Calculator/types/ICalculator";
import { Constant, MathFuction, Operation } from "./Operation";
import { getFunctionRegWithParam, getNumberBetweenRegWithSymbol, numbersLeftToSymbol } from "../helpers/reg";
import { factorial } from '@utilities/factorial';


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
    '!': new Operation({
        operation: '!',
        priority: Priority.Hight,
        reg: numbersLeftToSymbol('!'),
        calculate: factorial
    }),
    'sqrt': new MathFuction({
        name: 'sqrt',
        func: Math.sqrt
    }),
    'sin': new MathFuction({
        name: 'sin',
        func: Math.sin
    }),
    'cos': new MathFuction({
        name: 'cos',
        func: Math.cos
    }),
    'tg': new MathFuction({
        name: 'tg',
        func: Math.tan
    }),
    'ctg': new MathFuction({
        name: 'ctg',
        func: (a: number) => 1 / Math.tan(a)
    }),
    'pi': new Constant('pi', Math.PI),
    'e': new Constant('e', Math.E),
}


export const allowedActions = Object.keys(calculatorConfig)
export const searchAllowedOperationsRegStr = allowedActions.map(action => action.length === 1 ? `\\${action}` : action).join('|')

