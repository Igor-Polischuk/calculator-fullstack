import { calculatorConfig } from "../../config/calculator-config";

const getNumberBetweenRegWithSymbol = (symbol: string) => new RegExp(`(?<!\\d)-?\\d+(\\.\\d+)?[\\${symbol}][-]?\\d+(\\.\\d+)?`);
const getFunctionRegWithParam = (func: string) => new RegExp(`${func}[-]?\\d+(\\.\\d+)?`);
const getNumberReg = () => /(?<!\d)-?\d+(\.\d+)?/g
const numbersLeftToSymbol = (symbol: string) => new RegExp(`[-]?\\d+(\\.\\d+)?${symbol}`)

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

export { getFunctionRegWithParam, getNumberReg, getNumberBetweenRegWithSymbol, numbersLeftToSymbol }