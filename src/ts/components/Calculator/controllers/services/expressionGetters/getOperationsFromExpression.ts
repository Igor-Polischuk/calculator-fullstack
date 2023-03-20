import { getMinusNumberReg, getNumberReg } from '../regularExp/regExpressions';

export function getOperationsFromExpression(expression: string): string[] {
  return expression
    .replace(getMinusNumberReg(), '') //remove minuses related to numbers
    .replace(getNumberReg(), ' ')     //replace all numbers with spaces
    .split(' ')                       // get operations arr
    .filter(symbol => !!symbol)       //delete all empty lines
}

