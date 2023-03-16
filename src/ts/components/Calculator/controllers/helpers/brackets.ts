export function getMostNestedParentheses(expression: string): string[]{
    const reg = /\(([^()]+)\)/g
    return expression.match(reg) ?? []
}

export function hasBrackets(expression: string){
    return expression.includes('(') || expression.includes(')')
}