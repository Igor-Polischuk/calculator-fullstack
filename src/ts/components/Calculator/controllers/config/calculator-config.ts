import { Priority } from './priority';
import { ICalculatorConfig } from "@components/Calculator/interfaces/ICalculator";
import { Constant, MathFuction, Operation } from "./Operation";
import { getNumberBetweenRegWithSymbol, numbersLeftToSymbol, factorial } from "../services";
import { exceptions } from './exceptions';


export const calculatorConfig: ICalculatorConfig = {
    '+': new Operation({
        priority: Priority.Low,
        reg: getNumberBetweenRegWithSymbol('+'),
        calculate: (a: number, b: number) => a + b
    }),
    '-': new Operation({
        priority: Priority.Low,
        reg: getNumberBetweenRegWithSymbol('-'),
        calculate: (a: number, b: number) => a - b
    }),
    '*': new Operation({
        priority: Priority.Medium,
        reg: getNumberBetweenRegWithSymbol('*'),
        calculate: (a: number, b: number) => a * b
    }),
    '/': new Operation({
        priority: Priority.Medium,
        reg: getNumberBetweenRegWithSymbol('/'),
        calculate: (a: number, b: number) => {
            return a / b
        },
        exceptionHandler: [exceptions.zeroDivision]
    }),
    '^': new Operation({
        priority: Priority.Hight,
        reg: getNumberBetweenRegWithSymbol('^'),
        calculate: (a: number, b: number) => Math.pow(a, b)
    }),
    '%': new Operation({
        priority: Priority.Low,
        reg: getNumberBetweenRegWithSymbol('%'),
        calculate: (percent: number, value: number) => value * (1 + percent / 100)
    }),
    '!': new Operation({
        priority: Priority.Hight,
        reg: numbersLeftToSymbol('!'),
        calculate: factorial,
        exceptionHandler: [exceptions.negativeNumber, exceptions.notInteger]
    }),
    'sqrt': new MathFuction({
        name: 'sqrt',
        func: Math.sqrt,
        exceptionHandler: [exceptions.negativeNumber]
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

