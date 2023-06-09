import { AppError } from "@utils/AppErrors/AppError";
import { CalculatorService } from "../CalculatorService";
import { validateExpression } from "../expressionValidation/validateExpression";

function calculate(expression: string): number {
    validateExpression(expression)
    return CalculatorService.calculateExpression(expression)
}

describe('Test expression validation', () => {
    test('Correct expression', () => {
        const expression = '2*(2+2*(15/3))'
        expect(calculate(expression)).toBe(24)
    })

    test('Expression with negative numbers and decimal', () => {
        const expression = '8/(3.2-5)'
        expect(calculate(expression)).toBe(-4.4444444)
    })

    test('Missing bracket', () => {
        const expression = '8/(3.2-5'
        expect(() => calculate(expression)).toThrow(AppError)
    })

    test('Incorrect expression', () => {
        expect(() => calculate('-3**2+5')).toThrow(AppError)
        expect(() => calculate('5+3.2.2')).toThrow(AppError)
        expect(() => calculate('sqr9+5')).toThrow(AppError)
    })
})