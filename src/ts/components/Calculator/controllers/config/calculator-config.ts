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
    '!': new Operation({
        operation: '!',
        priority: Priority.Hight,
        reg: /\d+\!/,
        calculate: factorial
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

function factorial(n: number): number {
    let answer = 1;
    if (n == 0 || n == 1) {
        return answer;
    }
    else if (n > 1) {
        for (var i = n; i >= 1; i--) {
            answer = answer * i;
        }
        return answer;
    }

    return -1
}
