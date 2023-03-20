import { formatText, removeSpaces } from '@utilities/formatText';

export function formatExpression(expression: string) {
  const formatedExpression = formatText(expression, {
    removeSpaces,
    addMultiplicationOperator,
  });

  return formatedExpression;
}

function addMultiplicationOperator(expression: string) {
  const pattern = /(\d+|\))([A-Za-z(])/g;
  return expression.replace(pattern, '$1*$2');
}
