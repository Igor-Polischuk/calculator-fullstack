export function checkBrackets(expression: string): boolean {
    let bracketsCount = 0
    for (let char of expression) {
        if (bracketsCount === 0 && char === ')') return false
        char === '(' ? bracketsCount++ : char === ')' ? bracketsCount-- : null;
    }
    return !bracketsCount
}

export function getExpressionsFromBrackets(expression: string): string[] {
    const res: string[] = []
    let bracketsCount = 0
    let openBracketIndex = -1
    expression.split('').forEach((char, i) => {
        char === '(' ? bracketsCount++ : char === ')' ? bracketsCount-- : null;
        if (char === '(' && bracketsCount === 1){
            openBracketIndex = i
        }else if(char === ')'  && bracketsCount === 0){
            res.push(expression.slice(openBracketIndex + 1, i))
        }
    })
    return res
}