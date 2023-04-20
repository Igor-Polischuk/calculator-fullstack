import { Priority } from './priority';
import { Constant, MathFunction, Operation } from "./operation/Operation";
import { factorial } from "../services";
import { exceptions } from './exceptions';
import { regularWithParam } from '../regex';
import { IOperation } from './operation/IOperations';


export const calculatorConfig: Record<string, IOperation> = {
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
        calculate: Math.sqrt,
        exceptionHandler: [exceptions.negativeNumber],
        text: '√'
    }),
    'sin': new MathFunction({
        name: 'sin',
        calculate: Math.sin
    }),
    'cos': new MathFunction({
        name: 'cos',
        calculate: Math.cos
    }),
    'tg': new MathFunction({
        name: 'tg',
        calculate: Math.tan
    }),
    'ctg': new MathFunction({
        name: 'ctg',
        calculate: (a: number) => 1 / Math.tan(a)
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