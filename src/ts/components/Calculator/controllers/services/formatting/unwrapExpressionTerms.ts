export function unwrapBracketInExpression(expression: string) {
    return expression.replace(/\(|\)/g, '')
}