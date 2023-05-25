import { getOperationsFromExpression } from "./getOperationsFromExpression"

describe('Test getOperationsFromExpression function:', () => {
    test('Expression without allowed operations', () => {
        const expression = '5~abs123'
        const res = getOperationsFromExpression(expression)

        expect(res).toEqual([])
    })

    test('Simple expression operations', () => {
        const expression = '5+3-5*4'
        const res = getOperationsFromExpression(expression)

        expect(res).toEqual(['+', '-', '*'])
    })

    test('Expression with number with minus', () => {
        const expression = '-2*4+5!'
        const res = getOperationsFromExpression(expression)

        expect(res).toEqual(['*', '+', '!'])
    })

    test('Function in expression', () => {
        const expression = 'sqrt9+sin5'
        const res = getOperationsFromExpression(expression)

        expect(res).toEqual(['sqrt', '+', 'sin'])
    })

    test('Constant in expression', () => {
        const expression = 'pi+sin5*e'
        const res = getOperationsFromExpression(expression)

        expect(res).toEqual(['pi', '+', 'sin', '*', 'e'])
    })

    test('Brackets in expression', () => {
        const expression = '2*(2+2)'
        const res = getOperationsFromExpression(expression)

        expect(res).toEqual(['*', '+'])
    })
})

