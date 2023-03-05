import { ICalculatorCongig } from "@components/Calculator/types/ICalculator";
import { HightPriorityAction, MediumPriorityAction, LowPriorityAction, Action } from "./Action";
import { Priority } from "./priority";
import { getFunctionRegWithParam, getNumberBetweenRegWithSymbol } from "./reg";


export const calculatorCongig: ICalculatorCongig = {
    '+': new LowPriorityAction({
        action: '+',
        reg: getNumberBetweenRegWithSymbol('+'),
        calculate: (a: number, b: number) => a + b
    }),
    '-': new LowPriorityAction({
        action: '-',
        reg: getNumberBetweenRegWithSymbol('-'),
        calculate: (a: number, b: number) => a - b
    }),
    '*': new MediumPriorityAction({
        action: '*',
        reg: getNumberBetweenRegWithSymbol('*'),
        calculate: (a: number, b: number) => a * b
    }),
    '/': new MediumPriorityAction({
        action: '/',
        reg: getNumberBetweenRegWithSymbol('/'),
        calculate: (a: number, b: number) => {
            if (b === 0) throw new Error('division by zero error')
            return a / b
        }
    }),
    '^': new HightPriorityAction({
        action: '^',
        reg: getNumberBetweenRegWithSymbol('^'),
        calculate: (a: number, b: number) => Math.pow(a, b)
    }),
    'sqrt': new HightPriorityAction({
        action: 'sqrt',
        reg: getFunctionRegWithParam('sqrt'),
        calculate: (a: number) => Math.sqrt(a)
    }),
}