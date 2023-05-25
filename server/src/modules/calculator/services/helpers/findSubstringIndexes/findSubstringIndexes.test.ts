import { findSubstringIndexes } from "./findSubstringIndexes"

describe('Test findSubstringIndexes function', () => {
    test('Standard script, substring indexes in a row', () => {
        const string = 'hello world'

        expect(findSubstringIndexes(string, 'hello')).not.toBeNull()
        expect(findSubstringIndexes(string, 'hello')).toEqual({ from: 0, to: 4 })
    })

    test('Find substring from index 1', () => {
        const string = 'hello world'

        expect(findSubstringIndexes(string, 'hello', 1)).toBeNull()
    })

    test('Аind a substring that is not in the string', () => {
        const string = 'hello world'

        expect(findSubstringIndexes(string, 'test')).toBeNull()
    })
})