/**
 * 
 * @param expression with brackets
 * @returns index of incorrect brackets or -1 if all is good 
 */
export function bracketsOrder(expression: string) {
    let bracketCount = 0
    expression.split('').forEach((char, i) => {
        if (char === "(") {
            bracketCount++
        } else if (char === ")") {
            if (bracketCount === 0) {
                return i
            }
            bracketCount--
        }
    })

    if (bracketCount !== 0) {
        return expression.lastIndexOf('(')
    }

    return -1
}