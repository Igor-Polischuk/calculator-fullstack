import { AppError } from '@utils/AppErrors/AppError'
import { validateExpression } from './validateExpression'

describe('Test expression validation', () => {
    test('Correct expression', () => {
        expect(validateExpression('2+3')).toBe(true)
    })

    test('Incorrect brackets', () => {
        expect(() => validateExpression('(((2+3))')).toThrow(AppError)
    })

    test('Incorrect decimal', () => {
        expect(() => validateExpression('2.2.2+3')).toThrow(AppError)
        expect(() => validateExpression('2.2+.3')).toThrow(AppError)
    })

    test('Incorrect start and end of expression', () => {
        expect(() => validateExpression('*2+3')).toThrow(AppError)
        expect(() => validateExpression('2*3-')).toThrow(AppError)
    })

    test('Incorrect function name', () => {
        expect(() => validateExpression('sqr9')).toThrow(AppError)
    })

    test('Unknown symbols', () => {
        expect(() => validateExpression('2~3')).toThrow(AppError)
    })
})