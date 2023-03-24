export function getMostNestedBrackets(expression: string): string[]{
    const reg = /\(([^()]+)\)/g
    return expression.match(reg) ?? []
}
