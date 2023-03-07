import { Error } from "../error";

export function bracketsValidator(expression: string) {
    const stack = [];
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char === "(") {
            stack.push(i);
        } else if (char === ")") {
            if (stack.length === 0) {
                return {
                    message: Error.UnexpectedClosingBracketError,
                    where: i
                }
            }
            stack.pop();
        }
    }
    
    if (stack.length !== 0) {
        return {
            message: Error.UnclosedBracketError,
            where: expression.lastIndexOf('(')
        }
    }
}