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
            if (b === 0) throw new Error(`division by zero error: ${a}/${b}`)
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
            if (a < 0) throw new Error(`negative number under the root: ${a}`)
            return Math.sqrt(a)
        }
    })
}
