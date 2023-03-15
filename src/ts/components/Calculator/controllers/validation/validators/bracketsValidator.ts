import { Reg } from './../Reg';
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
                    meta: {
                        errorIndex: i
                    }
                }
            }
            stack.pop();
        }
    }
    
    if (stack.length !== 0) {
        return {
            message: Error.UnclosedBracketError,
            meta: {
                errorIndex: expression.lastIndexOf('(')
            }
        }
    }

    const wrongOpenBracketSiblings = expression.match(Reg.OpenBracketsAdjacentSymbols)
    const wrongClosedracketSiblings = expression.match(Reg.ClosenBracketsAdjacentSymbols)
    
    if (wrongOpenBracketSiblings) return {
        message: Error.BracketAdjacentCharactersError,
        meta: {
            errorIndex: wrongOpenBracketSiblings.index
        }
    }

    if (wrongClosedracketSiblings) return {
        message: Error.BracketAdjacentCharactersError,
        meta: {
            errorIndex: wrongClosedracketSiblings.index
        }
    }
}