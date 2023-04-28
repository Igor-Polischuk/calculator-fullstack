export function unwrapBracketInExpression(expression: string): string {
    return expression.replace(/\(|\)/g, '')
}