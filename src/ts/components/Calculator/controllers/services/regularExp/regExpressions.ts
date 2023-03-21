import { calculatorConfig } from "../../config/calculator-config";

const numberInReg= '(?<!\\d)-?\\d+(\\.\\d+)?(e[+-]?\\d+)?'

const getNumberBetweenRegWithSymbol = (symbol: string) => new RegExp(`${numberInReg}[\\${symbol}]${numberInReg}`);
const getFunctionRegWithParam = (func: string) => new RegExp(`${func}${numberInReg}`);
const getNumberReg = () => new RegExp(numberInReg, 'g')
const getMinusNumberReg = () => /^-/g
const numbersLeftToSymbol = (symbol: string) => new RegExp(`${numberInReg}${symbol}`)
const eReg = () => /(?<![0-9eE.+-])e(?![0-9eE.+-])/

export function getActionsReg() {
    return new RegExp(
        Object.keys(calculatorConfig)
            .map(i => i.length === 1 ? `\\d\\${i}` : i)
            .join('|'), 'g')
}

export function getAllowedSymbolsReg() {
    const calculatorKeys = Object.keys(calculatorConfig).map(key => {
        if (key.length > 1) {
          return key;
        } else {
          return '\\' + key;
        }
      });
      
      return new RegExp(`[^${calculatorKeys.join('|')}|\\d+|\\.|\(|)]`,);
}

export { getFunctionRegWithParam, getNumberReg, getNumberBetweenRegWithSymbol, numbersLeftToSymbol, getMinusNumberReg, eReg }