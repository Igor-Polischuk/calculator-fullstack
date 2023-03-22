import { searchAllowedOperationsRegStr } from '../../config/calculator-config';
import { regexPatterns } from '../../regex';

export function getOperationsFromExpression(expression: string): string[] {
  const operations = expression
    .replace(regexPatterns.MINUS_IN_NUMBER_REG, '')
    .match(RegExp(searchAllowedOperationsRegStr, 'g'))
  return operations || []
}

