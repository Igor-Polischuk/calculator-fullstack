import { calculatorConfig } from "../../config/calculator-config";

const getNumberBetweenRegWithSymbol = (symbol: string) => new RegExp(`(?<!\\d)-?\\d+(\\.\\d+)?(e[+-]?\\d+)?[\\${symbol}][-]?\\d+(\\.\\d+)?(e[+-]?\\d+)?`);
const getFunctionRegWithParam = (func: string) => new RegExp(`${func}[-]?\\d+(\\.\\d+)?(e[+-]?\\d+)?`);
const getNumberReg = () => /(?<!\d)-?\d+(\.\d+)?(e[+-]?\d+)?/g
const getMinusNumberReg = () => /(?<!\d)-/g
const numbersLeftToSymbol = (symbol: string) => new RegExp(`[-]?\\d+(\\.\\d+)?${symbol}`)
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