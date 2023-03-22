const NUMBER_IN_REG = '(?<!\\d)-?\\d+(\\.\\d+)?(e[+-]?\\d+)?'

export const regexPatterns = {
    NUMBERS_REG: new RegExp(NUMBER_IN_REG, 'g'),
    MINUS_IN_NUMBER_REG: /^-/g,
    E_CONST_REG: /(?<![0-9eE.+-])e(?![0-9eE.+-])/,
    ZERO_DIVISION: /\/0+(?!\.\d)/,
    OPEN_BRACKETS_ADJACENT_SYMBOLS: /[\d]\(|\([\+\*\/\^]/,
    CLOSED_BRACKETS_ADJACENT_SYMBOLS: /[^\d\)\w\!]\)|\)[\d\w]/
};

export const regularWithParam = {
    getNumberBetweenRegWithSymbol: (symbol: string) => new RegExp(`${NUMBER_IN_REG}[\\${symbol}]${NUMBER_IN_REG}`),
    getFunctionRegWithParam: (func: string) => new RegExp(`${func}${NUMBER_IN_REG}`),
    numbersLeftToSymbol: (symbol: string) => new RegExp(`${NUMBER_IN_REG}${symbol}`),
}