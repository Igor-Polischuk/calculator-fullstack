import { Error } from "../error";

export function bracketsValidator(expression: string, setFail: (name: string, message: string, where?: number) => void) {
    const stack = [];
    
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char === "(") {
            stack.push(i);
        } else if (char === ")") {
            if (stack.length === 0) {
                
                setFail('bracketsValidation', Error.UnexpectedClosingBracketError, i)
                
            }
            stack.pop();
        }
    }
    
    if (stack.length !== 0) {
        setFail('bracketsValidation', Error.UnclosedBracketError, expression.lastIndexOf('('))
    }
}