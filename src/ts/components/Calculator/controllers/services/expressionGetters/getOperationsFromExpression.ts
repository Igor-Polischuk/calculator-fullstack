import { searchAllowedOperationsRegStr } from '../../config/calculator-config';
import { getMinusNumberReg, getNumberReg } from '../regularExp/regExpressions';

export function getOperationsFromExpression(expression: string): string[] {
  return expression
    .replace(getMinusNumberReg(), '')                                              //remove minuses related to numbers
    .replace(RegExp(searchAllowedOperationsRegStr, 'g'), (match) => ` ${match} `)  //add spacing beetwen operations
    .replace(getNumberReg(), '')                                                   //replace all numbers with empty string
    .split(' ')                                                                    // get operations arr
    .filter(symbol => !!symbol)                                                    //delete all empty lines
}

