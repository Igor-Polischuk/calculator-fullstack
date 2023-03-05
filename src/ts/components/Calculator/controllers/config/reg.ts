const getNumberBetweenRegWithSymbol = (symbol: string) => new RegExp(`[-]?\\d+(\\.\\d+)?[\\${symbol}][-]?\\d+(\\.\\d+)?`);
const getFunctionRegWithParam = (func: string) => new RegExp(`${func}\\d+(\\.\\d+)?`);
const getNumberReg = () => /\d+(\.\d+)?/g

export { getFunctionRegWithParam, getNumberReg, getNumberBetweenRegWithSymbol }