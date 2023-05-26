import { Priority } from './priority';
import { Operation } from "./operation/Operation";
import { IOperation, OperationType } from './operation/IOperations';
import { exceptions } from './exceptions';
import { regularWithParam } from '../helpers/regex';
import { factorial } from '../math/factorial';


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
    'sqrt': new Operation({
        priority: Priority.Hight,
        calculate: Math.sqrt,
        exceptionHandler: [exceptions.negativeNumber],
        reg: regularWithParam.getFunctionRegWithParam('sqrt'),
        type: OperationType.MathFunction,
        text: '√',
    }),
    'sin': new Operation({
        priority: Priority.Hight,
        calculate: Math.sin,
        reg: regularWithParam.getFunctionRegWithParam('sin'),
        type: OperationType.MathFunction,
    }),
    'cos': new Operation({
        priority: Priority.Hight,
        calculate: Math.cos,
        reg: regularWithParam.getFunctionRegWithParam('cos'),
        type: OperationType.MathFunction,
    }),
    'tg': new Operation({
        priority: Priority.Hight,
        calculate: Math.sin,
        reg: regularWithParam.getFunctionRegWithParam('tg'),
        type: OperationType.MathFunction,
    }),
    'ctg': new Operation({
        priority: Priority.Hight,
        calculate: (a: number) => 1 / Math.tan(a),
        reg: regularWithParam.getFunctionRegWithParam('ctg'),
        type: OperationType.MathFunction,
    }),
    'pi': new Operation({
        priority: Priority.Constant,
        calculate: () => Math.PI,
        reg: regularWithParam.getConstantReg('pi'),
        type: OperationType.Constant
    }),
    'e': new Operation({
        priority: Priority.Constant,
        calculate: () => Math.E,
        reg: regularWithParam.getConstantReg('e'),
        type: OperationType.Constant
    }),
}