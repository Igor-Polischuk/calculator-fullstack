/**
 * 
 * @param expression with brackets
 * @returns index of incorrect brackets or -1 if all is good 
 */
export function bracketsOrder(expression: string) {
    const stack = [];
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char === "(") {
            stack.push(i);
        } else if (char === ")") {
            if (stack.length === 0) {
                return i
            }
            stack.pop();
        }
    }

    if (stack.length !== 0) {
        return expression.lastIndexOf('(')
    }
    
    return -1
}