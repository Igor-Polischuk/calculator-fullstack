import { AppError } from "@utils/AppErrors/AppError"
import { CalculatorService } from "."

describe('Test calculation module', () => {
    test('Simple expression test', () => {
        const expression = '2+2'

        expect(CalculatorService.calculateExpression(expression)).toBe(4)
    })

    test('Simple expression with operation with different priority', () => {
        const expression = '2+2*3-5'

        expect(CalculatorService.calculateExpression(expression)).toBe(3)
    })

    test('Expression with function', () => {
        const expression = '1+sqrt9'

        expect(CalculatorService.calculateExpression(expression)).toBe(4)
    })

    test('Expression with brackets', () => {
        const expression = '2*(2+2)'

        expect(CalculatorService.calculateExpression(expression)).toBe(8)
    })

    test('Expression with several brackets', () => {
        const expression = '2*(2*(4+2)+2)+sqrt16/(1+1)'

        expect(CalculatorService.calculateExpression(expression)).toBe(30)
    })

    test('Expression with float numbers', () => {
        const expression = '0.2 + 0.1'

        expect(CalculatorService.calculateExpression(expression)).toBe(0.3)
    })

    test('Expression with negative numbers', () => {
        const expression1 = '-2+4'
        const expression2 = '-5+(-5)'
        const expression3 = '(2-4)*2'
        const expression4 = '-7-2'

        expect(CalculatorService.calculateExpression(expression1)).toBe(2)
        expect(CalculatorService.calculateExpression(expression2)).toBe(-10)
        expect(CalculatorService.calculateExpression(expression3)).toBe(-4)
        expect(CalculatorService.calculateExpression(expression4)).toBe(-9)
    })

    test('Big expression', () => {
        const expression = 'sqrt(1/2+3/4)+sin(cos(pi+e))-1/2sqrt(1/2+3/4)+sin(cos(pi+e))-1/2sqrt(1/2+3/4)+sin(cos(pi+e))-1/2sqrt(1/2+3/4)+sin(cos(pi+e))-1/2sqrt(1/2+3/4)+sin(cos(pi+e))-1/2sqrt(1/2+3/4)+sin(cos(pi+e))-1/2sqrt(1/2+3/4)+sin(cos(pi+e))-1/2sqrt(1/2+3/4)+sin(cos(pi+e))-1/2sqrt(18/2)'

        expect(CalculatorService.calculateExpression(expression)).toBe(7.0676194)
    })

    test('Invalid expression', () => {
        const expression = '2*3/(5-5)'

        expect(() => CalculatorService.calculateExpression(expression)).toThrow(AppError)
    })
})