import { Priority } from './priority';
import { ICalculatorCongig } from "@components/Calculator/types/ICalculator";
import { Action } from "./Action";
import { getFunctionRegWithParam, getNumberBetweenRegWithSymbol } from "../helpers/reg";


export const calculatorCongig: ICalculatorCongig = {
    '+': new Action({
        action: '+',
        priority: Priority.Low,
        reg: getNumberBetweenRegWithSymbol('+'),
        calculate: (a: number, b: number) => a + b
    }),
    '-': new Action({
        action: '-',
        priority: Priority.Low,
        reg: getNumberBetweenRegWithSymbol('-'),
        calculate: (a: number, b: number) => a - b
    }),
    '*': new Action({
        action: '*',
        priority: Priority.Medium,
        reg: getNumberBetweenRegWithSymbol('*'),
        calculate: (a: number, b: number) => a * b
    }),
    '/': new Action({
        action: '/',
        priority: Priority.Medium,
        reg: getNumberBetweenRegWithSymbol('/'),
        calculate: (a: number, b: number) => {
            if (b === 0) throw new Error('division by zero error')
            return a / b
        }
    }),
    '^': new Action({
        action: '^',
        priority: Priority.Hight,
        reg: getNumberBetweenRegWithSymbol('^'),
        calculate: (a: number, b: number) => Math.pow(a, b)
    }),
    'sqrt': new Action({
        action: 'sqrt',
        priority: Priority.Hight,
        reg: getFunctionRegWithParam('sqrt'),
        calculate: (a: number) => Math.sqrt(a)
    }),
}
