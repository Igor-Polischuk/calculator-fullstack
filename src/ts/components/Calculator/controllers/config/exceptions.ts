export interface exceptionObj {
    checkException: (...args: number[]) => boolean,
    exceptionText: string
}
type exceptionsType = Record<string, exceptionObj>

export const exceptions: exceptionsType = {
    'zeroDivision': {
        checkException: (a: number, b: number) => b === 0,
        exceptionText: 'Zero division'
    },
    'sqrtIncorrectParam': {
        checkException: (a: number) => a < 0,
        exceptionText: 'Negative number under sqrt'
    },
    'factorial': {
        checkException: (a: number) => a < 0 || !Number.isInteger(a),
        exceptionText: 'the factorial can be calculated only for positive integers'
    },
}