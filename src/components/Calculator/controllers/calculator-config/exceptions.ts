export interface IExceptionObj {
    checkException: (...args: number[]) => boolean,
    exceptionMessage: string
}
type ExceptionsType = Record<string, IExceptionObj>

export const exceptions: ExceptionsType = {
    zeroDivision: {
        checkException: (a: number, b: number) => b === 0,
        exceptionMessage: 'Zero division'
    },
    negativeNumber: {
        checkException: (a: number) => a < 0,
        exceptionMessage: 'Negative number'
    },
    notInteger: {
        checkException: (a: number) => !Number.isInteger(a),
        exceptionMessage: 'number isn\'t integer'
    },
}

