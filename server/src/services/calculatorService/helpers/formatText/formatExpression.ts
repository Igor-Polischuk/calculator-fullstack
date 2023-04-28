import { formatText } from './formatText';
import { removeSpaces } from './removeSpaces';

export function formatExpression(expression: string): string {
  const formattedExpression = formatText(expression, {
    removeSpaces,
  });

  return formattedExpression
}

