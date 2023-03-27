import { formatText, removeSpaces } from '@utilities/formatText';

export function formatExpression(expression: string) {
  const formattedExpression = formatText(expression, {
    removeSpaces,
    addMultiplicationOperator,
  });

  return formattedExpression;
}

function addMultiplicationOperator(expression: string) {
  const pattern = /(\d+|\))([A-Za-z(])/g;
  return expression.replace(pattern, '$1*$2');
}
