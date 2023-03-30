const NUMBER_REG_STRING = '(?<!\\d)-?\\d+(\\.\\d+)?(e[+-]?\\d+)?'

export const regexPatterns = {
    NUMBERS: new RegExp(NUMBER_REG_STRING, 'g'),
    MINUS_IN_NUMBER: /^-/g,
    E_CONST: /(?<![0-9eE.+-])e(?![0-9eE.+-])/,
    ZERO_DIVISION: /\/0+(?!\.\d)/,
    OPEN_BRACKETS_ADJACENT_SYMBOLS: /[\d]\(|\([\+\*\/\^]/,
    CLOSED_BRACKETS_ADJACENT_SYMBOLS: /[^\d\)\w\!]\)|\)[\d\w]/,
    DOUBLE_POINTS_IN_NUMBER: /\d+(\.\d+){2,}/,
    MOST_NESTED_BRACKET: /\(([^()]+)\)/g
};

export const regularWithParam = {
    getNumberBetweenRegWithSymbol: (symbol: string) => new RegExp(`${NUMBER_REG_STRING}[\\${symbol}]${NUMBER_REG_STRING}`),
    getFunctionRegWithParam: (func: string) => new RegExp(`${func}${NUMBER_REG_STRING}`),
    getNumbersLeftToSymbolReg: (symbol: string) => new RegExp(`${NUMBER_REG_STRING}${symbol}`),
    getConstantReg: (constantName: string) => new RegExp(`(?<![A-Za-z0-9])${constantName}`)
}