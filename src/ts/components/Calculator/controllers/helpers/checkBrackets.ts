export function checkBrackets(expression: string): boolean {
    let bracketsCount = 0
    for (let char of expression) {
        char === '(' ? bracketsCount++ : char === ')' ? bracketsCount-- : null;
    }
    return !bracketsCount
}
