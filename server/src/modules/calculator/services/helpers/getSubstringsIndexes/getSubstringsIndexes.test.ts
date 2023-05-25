import { getSubstringsIndexes } from "./getSubstringsIndexes"

describe('Test getSubstringsIndexes function', () => {
    test('Standard script, substring indexes in a row', () => {
        const string = 'hello world'
        const result = getSubstringsIndexes(['hello', 'wor'], string)

        expect(result).toEqual([{ from: 0, to: 4 }, { from: 6, to: 8 }])
    })

    test('Test when one substring not exist in string', () => {
        const string = 'hello world'
        const result = getSubstringsIndexes(['hello', '44'], string)

        expect(result).toEqual([{ from: 0, to: 4 }])
    })

    test('Test when substrings not exist in string', () => {
        const string = 'hello world'
        const result = getSubstringsIndexes(['minecraft', '44'], string)

        expect(result).not.toBeNull()
        expect(result).toEqual([])
    })
})