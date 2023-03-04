export function checkBrackets(expression: string): boolean {
    let bracketsCount = 0
    for (let char of expression) {
        if (bracketsCount === 0 && char === ')') return false
        char === '(' ? bracketsCount++ : char === ')' ? bracketsCount-- : null;
    }
    return !bracketsCount
}
