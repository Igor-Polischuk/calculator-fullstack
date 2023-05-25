import { formatDecimal } from "./formatDecimal"

describe('Test format decimal function', () => {
    test('the function returns a value with a certain number of decimal places', () => {
        expect(formatDecimal(5.1236)).toBe(5.12)
        expect(formatDecimal(5.123456789, 5)).toBe(5.12346)
        expect(formatDecimal(5, 5)).toBe(5)
    })
})