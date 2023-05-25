import { factorial } from "./factorial"

describe('Factorial function test', () => {
    test('Calculate natural number', () => {
        expect(factorial(5)).toBe(120)
    })

    test('Calculate negative number', () => {
        expect(() => factorial(-1)).toThrowError()
    })

    test('Calculate float number', () => {
        expect(() => factorial(5.2)).toThrowError()
    })
})