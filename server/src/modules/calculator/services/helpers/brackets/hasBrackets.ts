export function hasBrackets(expression: string): boolean {
    return expression.includes('(') || expression.includes(')')
}