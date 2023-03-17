export interface exceptionObj {
    checkException: (...args: number[]) => boolean,
    exceptionText: string
}
type exceptionsType = Record<string, exceptionObj>

export const exceptions: exceptionsType = {
    zeroDivision: {
        checkException: (a: number, b: number) => b === 0,
        exceptionText: 'Zero division'
    },
    negativeNumber: {
        checkException: (a: number) => a < 0,
        exceptionText: 'Negative number'
    },
    notInteger: {
        checkException: (a: number) => !Number.isInteger(a),
        exceptionText: 'number isn\'t integers'
    },
}

