import { getMostNestedBrackets } from "./getMostNestedBrackets"
import { unwrapBracketInExpression } from "./unwrapExpressionTerms"

describe('Test bracket`s function:', () => {
    test('Get most nested bracket`s expression in expression', () => {
        const expression = '((((5))+3))-6*(2+(5-3))'
        const res = getMostNestedBrackets(expression)

        expect(res).toEqual(['(5)', '(5-3)'])
    })

    test('Get most nested bracket`s expression in expression without brackets', () => {
        const expression = '2+2'
        const res = getMostNestedBrackets(expression)

        expect(res).toEqual([])
    })

    test('Get most nested bracket`s expression in expression with incorrect brackets', () => {
        const expression = ')2+2('
        const res = getMostNestedBrackets(expression)

        expect(res).toEqual([])
    })

    test('Unwrap expression from brackets', () => {
        const expression = '(5+3)'
        const res = unwrapBracketInExpression(expression)

        expect(res).toBe('5+3')
    })

})
