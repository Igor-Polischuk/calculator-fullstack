import { getNumbersFromExpression } from "."

describe('Test getNumbersFromExpression function:', () => {
    test('String without numbers', () => {
        const expression = 'qwe*-+qwe'
        const res = getNumbersFromExpression(expression)

        expect(res).toEqual([])
    })

    test('String with random numbers', () => {
        const expression = '1fef2fewf4'
        const res = getNumbersFromExpression(expression)

        expect(res).toEqual([1, 2, 4])
    })

    test('Expression with numbers', () => {
        const expression = 'pi+5^3+(sqrt9/5!)'
        const res = getNumbersFromExpression(expression)

        expect(res).toEqual([5, 3, 9, 5])
    })

    test('Expression with complex numbers', () => {
        const expression = '-5.35 + 0.855 * 1.2e+3'
        const res = getNumbersFromExpression(expression)

        expect(res).toEqual([-5.35, 0.855, 1.2e+3])
    })
})

