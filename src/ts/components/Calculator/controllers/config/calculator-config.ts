import { Priority } from './priority';
import { ICalculatorConfig } from "@components/Calculator/interfaces/ICalculator";
import { Constant, MathFunction, Operation } from "./Operation";
import { factorial } from "../services";
import { exceptions } from './exceptions';
import { regularWithParam } from '../regex';


export const calculatorConfig: ICalculatorConfig = {
    '+': new Operation({
        priority: Priority.Low,
        reg: regularWithParam.getNumberBetweenRegWithSymbol('+'),
        calculate: (a: number, b: number) => a + b
    }),
    '-': new Operation({
        priority: Priority.Low,
        reg: regularWithParam.getNumberBetweenRegWithSymbol('-'),
        calculate: (a: number, b: number) => a - b
    }),
    '*': new Operation({
        priority: Priority.Medium,
        reg: regularWithParam.getNumberBetweenRegWithSymbol('*'),
        calculate: (a: number, b: number) => a * b,
        text: '×'
    }),
    '/': new Operation({
        priority: Priority.Medium,
        reg: regularWithParam.getNumberBetweenRegWithSymbol('/'),
        calculate: (a: number, b: number) => {
            return a / b
        },
        exceptionHandler: [exceptions.zeroDivision],
        text: '÷'
    }),
    '^': new Operation({
        priority: Priority.Hight,
        reg: regularWithParam.getNumberBetweenRegWithSymbol('^'),
        calculate: (a: number, b: number) => Math.pow(a, b),
        text: '<span>x<sup>y</sup></span>'
    }),
    '%': new Operation({
        priority: Priority.Low,
        reg: regularWithParam.getNumberBetweenRegWithSymbol('%'),
        calculate: (percent: number, value: number) => value * (1 + percent / 100) - value
    }),
    '!': new Operation({
        priority: Priority.Hight,
        reg: regularWithParam.getNumbersLeftToSymbolReg('!'),
        calculate: factorial,
        exceptionHandler: [exceptions.negativeNumber, exceptions.notInteger]
    }),
    'sqrt': new MathFunction({
        name: 'sqrt',
        func: Math.sqrt,
        exceptionHandler: [exceptions.negativeNumber],
        text: '√'
    }),
    'sin': new MathFunction({
        name: 'sin',
        func: Math.sin
    }),
    'cos': new MathFunction({
        name: 'cos',
        func: Math.cos
    }),
    'tg': new MathFunction({
        name: 'tg',
        func: Math.tan
    }),
    'ctg': new MathFunction({
        name: 'ctg',
        func: (a: number) => 1 / Math.tan(a)
    }),
    'pi': new Constant({
        name: 'pi',
        value: Math.PI,
        text: 'π'
    }),
    'e': new Constant({
        name: 'e',
        value: Math.E,
    }),
}


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