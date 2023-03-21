import { searchAllowedOperationsRegStr } from '../../config/calculator-config';
import { getMinusNumberReg, getNumberReg } from '../regularExp/regExpressions';

export function getOperationsFromExpression(expression: string): string[] {
  const operations = expression
    .replace(getMinusNumberReg(), '')
    .match(RegExp(searchAllowedOperationsRegStr, 'g'))
  return operations ?? []
}

