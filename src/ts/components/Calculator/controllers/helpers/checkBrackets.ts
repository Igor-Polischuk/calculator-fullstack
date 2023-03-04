export function checkBrackets(expression: string): boolean {
    let bracketsCount = 0
    for (let char of expression) {
        if (bracketsCount === 0 && char === ')') return false
        char === '(' ? bracketsCount++ : char === ')' ? bracketsCount-- : null;
    }
    return !bracketsCount
}

export function getExpressionsFromBrackets(expression: string): string[] {
    let bracketsCount = 0
    let openBracketIndex = -1
    let closenBracketIndex = -1
    const res: string[] = []
    for (let i = 0; i <= expression.length; i++) {
        const char = expression[i]
        char === '(' ? bracketsCount++ : char === ')' ? bracketsCount-- : null;
        if (char === '(' && bracketsCount === 1) {
            openBracketIndex = i
        } else if (char === ')' && bracketsCount === 0) {
            closenBracketIndex = i
            res.push(expression.slice(openBracketIndex + 1, closenBracketIndex))
        }
    }
    return res
}